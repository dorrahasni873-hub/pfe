import { useAuthentification } from "@/features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

const RouteProtegee = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useAuthentification();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RouteProtegee;
