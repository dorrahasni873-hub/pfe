import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LayoutPrincipal from "@/app/layouts/LayoutPrincipal";
import TableauDeBord from "@/features/dashboard/pages/DashboardPage";
import PageConnexion from "@/features/auth/pages/LoginPage";
import PageInscription from "@/features/auth/pages/RegisterPage";
import RouteProtegee from "@/shared/components/RouteProtegee/RouteProtegee";
import ChauffeursPage from "@/features/drivers/pages/DriversPage";
import VehiculesPage from "@/features/vehicles/pages/VehiclesPage";
import PageUtilisateurs from "@/features/users/pages/UsersPage";
import AffectationsPage from "@/features/assignments/pages/AssignmentsPage";
import MaintenancePage from "@/features/maintenance/pages/MaintenancePage";
import CarnetDeBordPage from "@/features/logbooks/pages/LogbookPage";
import EntretiensPage from "@/features/interventions/pages/InterventionsPage";
import PannesPage from "@/features/breakdowns/pages/BreakdownsPage";
import Profile from "@/shared/components/Profile/profile";

export const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PageConnexion />} />
        <Route path="/register" element={<PageInscription />} />

        <Route
          path="/"
          element={
            <RouteProtegee>
              <LayoutPrincipal />
            </RouteProtegee>
          }
        >
          <Route index element={<TableauDeBord />} />
          <Route path="chauffeurs" element={<ChauffeursPage />} />
          <Route path="vehicules" element={<VehiculesPage />} />
          <Route path="utilisateurs" element={<PageUtilisateurs />} />
          <Route path="affectations" element={<AffectationsPage />} />
          <Route path="maintenances" element={<MaintenancePage />} />
          <Route path="carnets" element={<CarnetDeBordPage />} />
          <Route path="entretiens" element={<EntretiensPage />} />
          <Route path="pannes" element={<PannesPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
