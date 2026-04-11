/* eslint-disable @typescript-eslint/no-unused-vars */
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

    if (success) navigate("/");
    else setError("Invalid email or password");
  };

  return (
    <div className="relative min-h-screen">
      {/* 🌄 FULL SCREEN BACKGROUND */}
      <div className="fixed inset-0">
        <img
          src="/car.png"
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 🧾 LOGIN FORM OVERLAY */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold">Bienvenue</h1>
                  <p className="text-sm text-muted-foreground">
                    Connectez-vous à votre compte
                  </p>
                </div>

                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                  />
                </Field>

                <Field>
                  <div className="flex items-center">
                    <FieldLabel>Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline hover:underline"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>

                  <Input
                    type="password"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                  />
                </Field>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>

                <FieldDescription className="text-center">
                  Vous n'avez pas de compte ?{" "}
                  <Link to="/register">S'inscrire</Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
