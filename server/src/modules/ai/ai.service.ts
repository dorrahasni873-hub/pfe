import db from "../../database/client";
import { sql, eq, desc, like, count, gte, lte, and, or } from "drizzle-orm";
import * as schema from "../../database/schema";

const SCHEMA_CONTEXT = `
Database schema (Drizzle ORM):

1. vehicules (vehicles)
   - matricule (PK, varchar)
   - marque (varchar): brand
   - dateCirculation (date)
   - dateVisite (date)
   - dateTaxe (date)
   - etat (varchar): disponible/en_service/en_panne

2. chauffeur (drivers)
   - id_chauffeur (PK, uuid)
   - nom (varchar)
   - prenom (varchar)
   - cin (varchar, unique)
   - tel (varchar, unique)
   - numeroPermis (varchar, unique)
   - motdepasse (varchar): hashed password
   - email (varchar, unique)

3. utilisateur (users)
   - id_utilisateur (PK, uuid)
   - nom (varchar)
   - prenom (varchar)
   - email (varchar, unique)
   - motDePasse (varchar)
   - tel (varchar, unique)
   - role (varchar): admin/maintenance

4. maintenance
   - id_maintenance (PK, uuid)
   - id_utilisateur (FK -> utilisateur)
   - matricule (FK -> vehicules)
   - description (varchar)
   - dateMaintenance (date)
   - cout (decimal)
   - kilometrage (integer)
   - prochainEntretien (date)

5. panne (breakdowns)
   - id_panne (PK, uuid)
   - typePanne (varchar): MECANIQUE/ELECTRIQUE/HYDRAULIQUE/CARROSSERIE/PNEU/FREIN/MOTEUR
   - dateDeclaration (date)
   - chauffeurId (FK -> chauffeur)
   - matricule (FK -> vehicules)
   - maintenanceId (FK -> maintenance, optional)

6. affectation (assignments)
   - id_affectation (PK, uuid)
   - dateAffectation (date)
   - dateDebut (date)
   - typeAffectation (varchar): permanente/temporaire/remplacement/occasionnelle
   - etat (varchar): active/terminee
   - id_chauffeur (FK -> chauffeur)
   - matricule (FK -> vehicules)

7. entretien (interventions)
   - id_entretien (PK, uuid)
   - dateEntretien (date)
   - typeIntervention (varchar): corrective/préventive
   - descriptionIntervention (varchar)
   - etat (varchar): en_attente/en_cours/terminé
   - matricule (FK -> vehicules)
   - maintenanceId (FK -> maintenance)
   - panneId (FK -> panne)

8. carnet_de_bord (logbooks)
   - id_carnet (PK, uuid)
   - dateDeDebut (date)
   - dateDeFin (date)
   - km_depart (integer)
   - km_arrive (integer)
   - id_chauffeur (FK -> chauffeur)
   - matricule (FK -> vehicules)
`;

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function tryGroq(query: string): Promise<string | null> {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a Drizzle ORM query generator. Given a database schema and a natural language question, generate ONLY the JavaScript code that uses Drizzle ORM to query the database and answer the question.

Rules:
- Use the imported 'db', 'schema', and Drizzle operators
- Import is already done: import db from "../../database/client"; import { sql, eq, desc, like, count, gte, lte, and, or } from "drizzle-orm"; import * as schema from "../../database/schema";
- Return ONLY the code inside a code block, no explanations
- Use db.select({...}).from(schema.TABLE) pattern
- DO NOT chain .all() or .execute()
- USE .innerJoin() when you need data from multiple tables. Example: .innerJoin(schema.vehicules, eq(schema.maintenance.matricule, schema.vehicules.matricule))
- Always limit results to 20 max
- For aggregate queries use sql template

${SCHEMA_CONTEXT}

Examples:

User: "Which car has the most kilometrage?"
Code:
\`\`\`js
const result = await db.select({ matricule: schema.vehicules.matricule, marque: schema.vehicules.marque, kilometrage: schema.maintenance.kilometrage }).from(schema.maintenance).innerJoin(schema.vehicules, eq(schema.maintenance.matricule, schema.vehicules.matricule)).orderBy(desc(schema.maintenance.kilometrage)).limit(1);
\`\`\`

User: "List all vehicles"
Code:
\`\`\`js
const result = await db.select().from(schema.vehicules).limit(20);
\`\`\``,
        },
        { role: "user", content: query },
      ],
    });
    return response.choices[0]?.message?.content ?? null;
  } catch (err) {
    console.error("Groq API error:", err);
    return null;
  }
}

async function analyzeResults(
  query: string,
  results: Record<string, unknown>[],
  code: string,
): Promise<string> {
  try {
    const json = JSON.stringify(results.slice(0, 20), null, 2);
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a data analyst. Given a user's question, the Drizzle ORM code used, and the query results, " +
            "write a clear, concise paragraph in French that answers the question using the data. " +
            "Do not mention SQL, Drizzle, or the code. Just answer naturally like you're talking to a colleague.",
        },
        {
          role: "user",
          content: `Question: ${query}\n\nCode used:\n\`\`\`js\n${code}\n\`\`\`\n\nResults:\n${json}`,
        },
      ],
    });
    return response.choices[0]?.message?.content ?? "Aucune réponse générée.";
  } catch (err) {
    console.error("Groq analysis error:", err);
    const count = results.length;
    return `${count} résultat(s) trouvé(s).`;
  }
}

export async function executeQuery(query: string) {
  const trimmed = query.trim();

  const aiResponse = await tryGroq(trimmed);
  if (!aiResponse) {
    return {
      error:
        "Impossible de contacter Groq. Vérifiez votre clé API dans le fichier .env.",
    };
  }

  const match = aiResponse.match(/```(?:js|javascript)?\s*([\s\S]*?)```/);
  if (!match) {
    return { error: "L'IA n'a pas pu générer une requête valide. Essayez de reformuler votre question." };
  }

  const code = match[1].trim();
  const usedAI = true;
  const explanation = "Generated by Llama 3.3 70B (Groq) based on your question.";

  const safeCode = code
    .replace(/\.all\(\)|\.execute\(\)/g, "")
    .replace(/^const\s+\w+\s*=\s*/m, "return ");

  try {
    const asyncFunc = AsyncFunction("db", "schema", "eq", "desc", "like", "count", "gte", "lte", "and", "or", "sql", safeCode);
    let results;
    try {
      results = await asyncFunc(db, schema, eq, desc, like, count, gte, lte, and, or, sql);
    } catch (innerErr) {
      console.error("Query execution error:", innerErr);
      throw innerErr;
    }
    const resultArray = Array.isArray(results) ? results : (results ? [results] : []);

    const answer = await analyzeResults(trimmed, resultArray, safeCode);

    return { results: resultArray, code, explanation, usedAI, answer };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { error: `Erreur lors de l'exécution de la requête: ${message}`, code };
  }
}

function AsyncFunction(...args: string[]): (...args: unknown[]) => Promise<unknown> {
  const AsyncFunctionConstructor = Object.getPrototypeOf(async () => {}).constructor;
  return new AsyncFunctionConstructor(...args);
}
