import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentification } from "@/features/auth/hooks/useAuth";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

export function FormulaireInscription() {
  const { register } = useAuthentification();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (
      !email ||
      !motDePasse ||
      !confirmMotDePasse ||
      !nom ||
      !prenom ||
      !tel
    ) {
      setError("All fields are required");
      return;
    }

    if (motDePasse !== confirmMotDePasse) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const success = await register({
      email,
      motDePasse,
      nom,
      prenom,
      tel,
    });

    setLoading(false);

    if (success) navigate("/");
    else setError("Failed to register. Try again.");
  };

  return (
    <div className="relative min-h-screen">
      {/* ✅ FULL SCREEN IMAGE BACKGROUND */}
      <div className="fixed inset-0">
        <img
          src="/car.png"
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ✅ FORM ON TOP */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold">Créer votre compte</h1>
                  <p className="text-sm text-muted-foreground">
                    Inscrivez-vous pour continuer
                  </p>
                </div>

                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}

                <Field>
                  <FieldLabel>Prénom</FieldLabel>
                  <Input value={nom} onChange={(e) => setNom(e.target.value)} />
                </Field>

                <Field>
                  <FieldLabel>Nom</FieldLabel>
                  <Input
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel>Téléphone</FieldLabel>
                  <Input value={tel} onChange={(e) => setTel(e.target.value)} />
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>

                <Field className="grid grid-cols-2 gap-3">
                  <Field>
                    <FieldLabel>Mot de passe</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel>Confirmer</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmMotDePasse}
                        onChange={(e) => setConfirmMotDePasse(e.target.value)}
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </Field>
                </Field>

                <FieldDescription>Minimum 8 caractères</FieldDescription>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Création..." : "Créer un compte"}
                </Button>

                <FieldSeparator>Ou continuer avec</FieldSeparator>

                <div className="grid grid-cols-3 gap-3">
                  <Button type="button" variant="outline">
                    Apple
                  </Button>
                  <Button type="button" variant="outline">
                    Google
                  </Button>
                  <Button type="button" variant="outline">
                    Meta
                  </Button>
                </div>

                <FieldDescription className="text-center">
                  Déjà un compte ? <Link to="/login">Se connecter</Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
