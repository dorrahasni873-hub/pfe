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
    console.log("from register form ", {
      email,
      motDePasse,
      nom,
      prenom,
      tel,
    });
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

    if (success) {
      console.log({
        email,
        password: motDePasse,
        firstName: nom,
        lastName: prenom,
        tel,
      });

      navigate("/");
    } else {
      setError("Failed to register. Try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Créer votre compte</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Entrez vos informations ci-dessous pour créer votre compte
                </p>
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              <Field>
                <FieldLabel htmlFor="nom">Prénom</FieldLabel>
                <Input
                  id="nom"
                  type="text"
                  placeholder="John"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="prenom">Nom de famille</FieldLabel>
                <Input
                  id="prenom"
                  type="text"
                  placeholder="Doe"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="tel">Téléphone</FieldLabel>
                <Input
                  id="tel"
                  type="tel"
                  placeholder="+1234567890"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirmer le mot de passe
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmMotDePasse}
                    onChange={(e) => setConfirmMotDePasse(e.target.value)}
                    required
                  />
                </Field>
              </Field>

              <FieldDescription>
                Doit contenir au moins 8 caractères.
              </FieldDescription>

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Création du compte..." : "Créer un compte"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Ou continuez avec
              </FieldSeparator>

              {/* Social buttons here */}
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  Apple
                </Button>
                <Button variant="outline" type="button">
                  Google
                </Button>
                <Button variant="outline" type="button">
                  Meta
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
