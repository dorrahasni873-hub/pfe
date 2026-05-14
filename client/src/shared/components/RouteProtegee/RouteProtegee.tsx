import { ROUTES } from "@/routes";
import { useAuthentification } from "@/features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

const RouteProtegee = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useAuthentification();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default RouteProtegee;
