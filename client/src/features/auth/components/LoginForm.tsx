import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthentification } from "@/features/auth/hooks/useAuth";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export function FormulaireConnexion() {
  const navigate = useNavigate();
  const { login } = useAuthentification();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !motDePasse) {
      setError("Email et mot de passe requis");
      return;
    }

    setLoading(true);

    const success = await login({ email, motDePasse });

    setLoading(false);

    if (success) navigate("/");
    else setError("Email ou mot de passe invalide");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0">
        <img
          src="/car.png"
          alt="background"
          className="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <CardContent className="relative p-8">
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="text-center space-y-3 mb-8">
                  <div className="flex justify-center">
                    <div className="size-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <img
                        src="/logo.png"
                        alt="STS Béja"
                        className="size-12 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-white">
                    Bienvenue
                  </h1>
                  <p className="text-sm text-white/60">
                    Connectez-vous à votre compte
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-in fade-in slide-in-from-top-1">
                    {error}
                  </div>
                )}

                <Field>
                  <FieldLabel className="text-white/80">Email</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="m@example.com"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-blue-400/50 focus-visible:ring-blue-400/20"
                    />
                  </div>
                </Field>

                <Field>
                  <div className="flex items-center mb-1">
                    <FieldLabel className="text-white/80">Mot de passe</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-xs text-white/40 hover:text-blue-400 transition-colors"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={motDePasse}
                      onChange={(e) => setMotDePasse(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-blue-400/50 focus-visible:ring-blue-400/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </Field>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-none shadow-lg shadow-blue-600/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Connexion...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>

                <FieldDescription className="text-center text-white/40 mt-6">
                  Vous n'avez pas de compte ?{" "}
                  <Link
                    to="/register"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    S'inscrire
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
