import bcrypt from "bcrypt";
import db from "../client";
import {
  utilisateur,
  chauffeur,
  vehicules,
  maintenance,
  affectation,
  panne,
  entretien,
  carnetDeBord,
} from "../schema";
import { eq, sql } from "drizzle-orm";

const SALT_ROUNDS = 10;
const COUNT = 150;

async function hash(pwd: string) {
  return bcrypt.hash(pwd, SALT_ROUNDS);
}

function randDate(start: Date, end: Date) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split("T")[0];
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pad(n: number, w: number) {
  return String(n).padStart(w, "0");
}

// ── Tunisian data pools ──────────────────────────────────────────
const noms = [
  "Ben Ali", "Trabelsi", "Jamoussi", "Mansouri", "Khemiri", "Jarraya",
  "Gharbi", "Mbarek", "Masmoudi", "Sassi", "Bouaziz", "Hadj Taieb",
  "Fekih", "Ben Salem", "Chaabane", "Zoghlami", "Ben Youssef", "Karoui",
  "Chebbi", "Belaid", "Boussetta", "Hmida", "Cherni", "Ben Ammar",
  "Laabidi", "Aouini", "Dhaouadi", "Mzoughi", "Ben Slimane", "Fourati",
];

const prenoms = [
  "Wael", "Marwa", "Ahmed", "Sarra", "Oussema", "Nour", "Youssef",
  "Imen", "Khaled", "Amira", "Mohamed", "Asma", "Houssem", "Fatma",
  "Skander", "Rania", "Sofien", "Nadia", "Achref", "Siwar", "Bilel",
  "Wiem", "Montassar", "Donia", "Haythem", "Mariem", "Seif", "Sabrine",
  "Fedi", "Rihab", "Aziz", "Khawla", "Malek", "Hanen", "Dhia", "Nesrine",
  "Rami", "Manel", "Ala", "Khaoula", "Ghayth", "Bochra", "Adnen", "Douha",
  "Mootez", "Yosra", "Taha", "Hajer",
];

const marques = [
  "Toyota Hilux", "Renault Kangoo", "Peugeot Partner", "Fiat Doblo",
  "Mercedes Sprinter", "Volkswagen Transporter", "Hyundai Staria",
  "Ford Transit", "Citroen Berlingo", "Opel Vivaro", "Kia Carnival",
  "Nissan Navara", "Mitsubishi L200", "Isuzu D-Max", "Iveco Daily",
];

const typesPanne = ["MECANIQUE", "ELECTRIQUE", "HYDRAULIQUE", "CARROSSERIE", "PNEU", "FREIN", "MOTEUR"];
const typesAffectation = ["permanente", "temporaire", "remplacement", "occasionnelle"];
const etatsAffectation = ["active", "terminee"];
const etatsEntretien = ["en_attente", "en_cours", "terminé"];
const typesEntretien = ["corrective", "préventive"];
const etatsVehicule = ["disponible", "en_service", "en_panne"];

const descriptionsMaint = [
  "Vidange huile + filtres", "Révision des freins", "Changement courroie distribution",
  "Rotation pneus + équilibrage", "Vidange boîte de vitesses", "Niveau liquide refroidissement",
  "Remplacement bougies allumage", "Controle géométrie train avant", "Changement amortisseurs",
  "Révision embrayage", "Diagnostic moteur complet", "Nettoyage injecteurs",
  "Remplacement batterie", "Reglage frein à main", "Changement embrayage",
];

const descriptionsEntretien = [
  "Remplacement moteur – pistons usés", "Changement plaquettes + disques de frein",
  "Réparation faisceau électrique", "Remplacement pneu avant gauche crevé",
  "Soudure châssis endommagé", "Démarreur défectueux – remplacement",
  "Alternateur hors service", "Fuite huile moteur – joint spi",
  "Ventilateur radiateur HS", "Capteur ABS défaillant",
  "Échappement percé – changement", "Boîtier électronique défectueux",
  "Injecteur encrassé – remplacement", "Radiateur percé",
  "Compresseur climatisation HS",
];

// ── Helpers for unique values ────────────────────────────────────
function uniqueSequence(prefix: string, start: number, width: number, count: number) {
  return Array.from({ length: count }, (_, i) => `${prefix}${pad(start + i, width)}`);
}

async function seed() {
  console.log("🌱 Seeding 150 records per table...\n");

  // ── 1. Delete all data ──────────────────────────────────────────
  console.log("Syncing schema & clearing existing data...");
  try { await db.execute(sql`ALTER TABLE carnet_de_bord RENAME COLUMN date_de_fin TO date_fin`); } catch {}
  await db.delete(entretien);
  await db.delete(carnetDeBord);
  await db.delete(panne);
  await db.delete(affectation);
  await db.delete(maintenance);
  await db.delete(chauffeur);
  await db.delete(vehicules);
  await db.delete(utilisateur);
  console.log("Done.\n");

  // ── 2. Utilisateurs (150 + admin) ────────────────────────────────
  console.log("Inserting utilisateurs...");
  const [admin] = await db
    .insert(utilisateur)
    .values({
      nom: "Admin", prenom: "Dorra", email: "dorra@gmail.com",
      motDePasse: await hash("dorra123"), tel: "20100000", role: "admin",
    })
    .returning();
  const allUsers: { id_utilisateur: string }[] = [admin];
  const telSeq = uniqueSequence("21", 0, 6, COUNT);
  for (let i = 0; i < COUNT; i++) {
    const nom = pick(noms);
    const prenom = pick(prenoms);
    const firstname = prenom.toLowerCase();
    const [u] = await db
      .insert(utilisateur)
      .values({
        nom, prenom,
        email: `${firstname}.${nom.toLowerCase().replace(/\s+/g, "")}${i}@park.tn`,
        motDePasse: await hash(`${firstname}123`),
        tel: telSeq[i],
        role: i < 3 ? "admin" : "maintenance",
      })
      .returning();
    allUsers.push(u);
  }
  console.log(`  ${allUsers.length} utilisateurs`);

  // ── 3. Chauffeurs (150) ──────────────────────────────────────────
  console.log("Inserting chauffeurs...");
  const allChauffeurs: { id_chauffeur: string }[] = [];
  const cinSeq = uniqueSequence("0", 0, 8, COUNT);
  const telChSeq = uniqueSequence("5", 0, 8, COUNT);
  const permisSeq = uniqueSequence("TN-", 0, 5, COUNT);
  for (let i = 0; i < COUNT; i++) {
    const nom = pick(noms);
    const prenom = pick(prenoms);
    const firstname = prenom.toLowerCase();
    const [ch] = await db
      .insert(chauffeur)
      .values({
        nom, prenom,
        cin: cinSeq[i],
        tel: telChSeq[i],
        numeroPermis: permisSeq[i],
        motdepasse: await hash(`${firstname}123`),
        email: `${firstname}.chauffeur${i}@email.tn`,
      })
      .returning();
    allChauffeurs.push(ch);
  }
  console.log(`  ${allChauffeurs.length} chauffeurs`);

  // ── 4. Véhicules (150) ──────────────────────────────────────────
  console.log("Inserting vehicules...");
  const allVehicules: { matricule: string }[] = [];
  for (let i = 0; i < COUNT; i++) {
    const [v] = await db
      .insert(vehicules)
      .values({
        matricule: `${pad(i + 1, 3)}-TN-${pad(Math.floor(Math.random() * 99 + 1), 2)}`,
        marque: pick(marques),
        dateCirculation: `${2015 + Math.floor(Math.random() * 10)}-${pad(1 + Math.floor(Math.random() * 12), 2)}-${pad(1 + Math.floor(Math.random() * 28), 2)}`,
        dateVisite: `${2024 + Math.floor(Math.random() * 4)}-${pad(1 + Math.floor(Math.random() * 12), 2)}-${pad(1 + Math.floor(Math.random() * 28), 2)}`,
        dateTaxe: `${2025}-${pad(1 + Math.floor(Math.random() * 12), 2)}-${pad(1 + Math.floor(Math.random() * 28), 2)}`,
        etat: pick(etatsVehicule),
      })
      .returning();
    allVehicules.push(v);
  }
  console.log(`  ${allVehicules.length} vehicules`);

  // ── 5. Maintenances (150) ────────────────────────────────────────
  console.log("Inserting maintenances...");
  const allMaintenances: { id_maintenance: string }[] = [];
  for (let i = 0; i < COUNT; i++) {
    const user = pick(allUsers);
    const veh = pick(allVehicules);
    const d = new Date(2024, 0, 1);
    d.setDate(d.getDate() + Math.floor(Math.random() * 500));
    const prochain = new Date(d);
    prochain.setDate(prochain.getDate() + 90 + Math.floor(Math.random() * 180));
    const [m] = await db
      .insert(maintenance)
      .values({
        id_utilisateur: user.id_utilisateur,
        matricule: veh.matricule,
        description: pick(descriptionsMaint),
        dateMaintenance: d.toISOString().split("T")[0],
        cout: (Math.random() * 1500 + 100).toFixed(2),
        kilometrage: Math.floor(Math.random() * 150000 + 5000),
        prochainEntretien: prochain.toISOString().split("T")[0],
      })
      .returning();
    allMaintenances.push(m);
  }
  console.log(`  ${allMaintenances.length} maintenances`);

  // ── 6. Affectations (150) ────────────────────────────────────────
  console.log("Inserting affectations...");
  for (let i = 0; i < COUNT; i++) {
    const ch = pick(allChauffeurs);
    const veh = pick(allVehicules);
    const d = new Date(2024, 0, 1);
    d.setDate(d.getDate() + Math.floor(Math.random() * 500));
    const debut = new Date(d);
    debut.setDate(debut.getDate() + Math.floor(Math.random() * 10));
    await db
      .insert(affectation)
      .values({
        dateAffectation: d.toISOString().split("T")[0],
        dateDebut: debut.toISOString().split("T")[0],
        typeAffectation: pick(typesAffectation),
        etat: pick(etatsAffectation),
        id_chauffeur: ch.id_chauffeur,
        matricule: veh.matricule,
      });
  }
  console.log(`  ${COUNT} affectations`);

  // ── 7. Pannes (150) ─────────────────────────────────────────────
  console.log("Inserting pannes...");
  const allPannes: { id_panne: string }[] = [];
  for (let i = 0; i < COUNT; i++) {
    const ch = pick(allChauffeurs);
    const veh = pick(allVehicules);
    const maint = Math.random() > 0.3 ? pick(allMaintenances) : undefined;
    const [p] = await db
      .insert(panne)
      .values({
        typePanne: pick(typesPanne),
        dateDeclaration: randDate(new Date(2024, 0, 1), new Date(2025, 11, 31)),
        chauffeurId: ch.id_chauffeur,
        matricule: veh.matricule,
        maintenanceId: maint?.id_maintenance,
      })
      .returning();
    allPannes.push(p);
  }
  console.log(`  ${allPannes.length} pannes`);

  // ── 8. Entretiens (150) ──────────────────────────────────────────
  console.log("Inserting entretiens...");
  for (let i = 0; i < COUNT; i++) {
    const veh = pick(allVehicules);
    const maint = pick(allMaintenances);
    const pan = pick(allPannes);
    await db
      .insert(entretien)
      .values({
        dateEntretien: randDate(new Date(2024, 0, 1), new Date(2025, 11, 31)),
        typeIntervention: pick(typesEntretien),
        descriptionIntervention: pick(descriptionsEntretien),
        etat: pick(etatsEntretien),
        matricule: veh.matricule,
        maintenanceId: maint.id_maintenance,
        panneId: pan.id_panne,
      });
  }
  console.log(`  ${COUNT} entretiens`);

  // ── 9. Carnets de bord (150) ─────────────────────────────────────
  console.log("Inserting carnets de bord...");
  for (let i = 0; i < COUNT; i++) {
    const ch = pick(allChauffeurs);
    const veh = pick(allVehicules);
    const kmBase = Math.floor(Math.random() * 100000 + 10000);
    const kmParcouru = Math.floor(Math.random() * 500 + 20);
    const d = randDate(new Date(2024, 0, 1), new Date(2025, 11, 31));
    const d2 = new Date(d);
    d2.setDate(d2.getDate() + Math.floor(Math.random() * 5 + 1));
    await db
      .insert(carnetDeBord)
      .values({
        dateDeDebut: d,
        dateDeFin: d2.toISOString().split("T")[0],
        km_depart: kmBase,
        km_arrive: kmBase + kmParcouru,
        id_chauffeur: ch.id_chauffeur,
        matricule: veh.matricule,
      });
  }
  console.log(`  ${COUNT} carnets de bord`);

  console.log("\n✅ Seeding complete — 150 records per table!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
