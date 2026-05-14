import { useState } from "react";
import { aiService } from "@/features/ai/api/aiService";
import { IconBrain, IconSend, IconDatabase, IconAlertCircle } from "@tabler/icons-react";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";

type AiResult = {
  results?: Record<string, unknown>[];
  code?: string;
  explanation?: string;
  error?: string;
  usedAI?: boolean;
  answer?: string;
};

const suggestions = [
  "Quelle voiture a le plus de kilométrage ?",
  "Véhicules avec entretien en retard",
  "Quel chauffeur a eu le plus de pannes ?",
  "Consommation moyenne de carburant par véhicule",
];

const AiPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await aiService.ask(query);
      setResult(data);
    } catch {
      setResult({ error: "Erreur lors de la communication avec le serveur" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 space-y-6">
      <EntetePage
        title="Assistant IA"
        description="Posez des questions sur vos données en langage naturel"
        icon={IconBrain}
      />

      <div className="px-4 lg:px-6 max-w-4xl mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: Quelle voiture a le plus de kilométrage ?"
              className="pr-4 h-12 text-base"
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading || !query.trim()} className="h-12 px-6 gap-2">
            <IconSend className="size-4" />
            {loading ? "Analyse..." : "Envoyer"}
          </Button>
        </form>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuery(s)}
              className="text-xs px-3 py-1.5 rounded-full border bg-card text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {loading && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
                <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              </div>
              <p className="mt-4 text-sm">Génération de la requête...</p>
            </CardContent>
          </Card>
        )}

        {result && !loading && (
          <div className="space-y-4">
            {result.error && (
              <Card className="border-destructive/50">
                <CardContent className="p-6 flex items-start gap-3">
                  <IconAlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Erreur</p>
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{result.error}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {result.answer && (
              <Card>
                <CardContent className="p-4 flex items-start gap-3">
                  <IconBrain className="size-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm whitespace-pre-wrap">{result.answer}</p>
                </CardContent>
              </Card>
            )}

            {result.results && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <IconDatabase className="size-4 text-primary" />
                    <span className="text-sm font-medium">
                      Résultats ({result.results.length})
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          {result.results.length > 0 &&
                            Object.keys(result.results[0]).map((key) => (
                              <th key={key} className="text-left p-2 font-medium text-muted-foreground text-xs uppercase">
                                {key}
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.results.map((row, i) => (
                          <tr key={i} className="border-b last:border-0">
                            {Object.values(row).map((val, j) => (
                              <td key={j} className="p-2 text-sm">
                                {val === null || val === undefined ? "—" : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiPage;
