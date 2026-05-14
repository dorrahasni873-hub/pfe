import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Page non trouvée
      </p>
      <Link
        to={ROUTES.DASHBOARD}
        className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
};

export default NotFoundPage;
