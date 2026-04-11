/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
                    <Input
                      type="password"
                      value={motDePasse}
                      onChange={(e) => setMotDePasse(e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Confirmer</FieldLabel>
                    <Input
                      type="password"
                      value={confirmMotDePasse}
                      onChange={(e) => setConfirmMotDePasse(e.target.value)}
                    />
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
