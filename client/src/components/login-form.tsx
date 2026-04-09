import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !motDePasse) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    const success = await login({ email, motDePasse });
    setLoading(false);
    console.log(success);

    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Card className="overflow-hidden p-0 ml-50">
        <CardContent className="grid p-0 md:grid-cols-2 relative">
          <form className="p-2 md:p-8 z-10 bg-white " onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bienvenue</h1>
                <p className="text-muted-foreground text-balance">
                  Connectez-vous à votre compte
                </p>
              </div>

              {error && <p className="text-red-600 text-center">{error}</p>}

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

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </Field>

              {/* <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Ou continuez avec</FieldSeparator> */}
              {/* 
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
              </Field> */}

              <FieldDescription className="text-center">
                Vous n'avez pas de compte ?{" "}
                <Link to="/register">S'inscrire</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <div className="">
        <img
          src="/car.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-fit dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <FieldDescription className="px-6 text-center">
        En cliquant sur continuer, vous acceptez nos{" "}
        <a href="#">Conditions d'utilisation</a> et notre{" "}
        <a href="#">Politique de confidentialité</a>.
      </FieldDescription>
    </div>
  );
}
