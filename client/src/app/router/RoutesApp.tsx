import { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ROUTES } from "@/routes";
import LayoutPrincipal from "@/app/layouts/LayoutPrincipal";
import RouteProtegee from "@/shared/components/RouteProtegee/RouteProtegee";
import PageConnexion from "@/features/auth/pages/LoginPage";
import PageInscription from "@/features/auth/pages/RegisterPage";
import NotFoundPage from "@/shared/components/NotFound/NotFoundPage";

const TableauDeBord = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const ChauffeursPage = lazy(() => import("@/features/drivers/pages/DriversPage"));
const VehiculesPage = lazy(() => import("@/features/vehicles/pages/VehiclesPage"));
const PageUtilisateurs = lazy(() => import("@/features/users/pages/UsersPage"));
const AffectationsPage = lazy(() => import("@/features/assignments/pages/AssignmentsPage"));
const MaintenancePage = lazy(() => import("@/features/maintenance/pages/MaintenancePage"));
const CarnetDeBordPage = lazy(() => import("@/features/logbooks/pages/LogbookPage"));
const EntretiensPage = lazy(() => import("@/features/interventions/pages/InterventionsPage"));
const PannesPage = lazy(() => import("@/features/breakdowns/pages/BreakdownsPage"));
const ProfilePage = lazy(() => import("@/shared/components/Profile/ProfilePage"));
const ParametresPage = lazy(() => import("@/features/settings/pages/SettingsPage"));
const CalendrierPage = lazy(() => import("@/features/calendar/pages/CalendarPage"));
const AiPage = lazy(() => import("@/features/ai/pages/AiPage"));

export const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<PageConnexion />} />
        <Route path={ROUTES.REGISTER} element={<PageInscription />} />

        <Route
          path={ROUTES.DASHBOARD}
          element={
            <RouteProtegee>
              <LayoutPrincipal />
            </RouteProtegee>
          }
        >
          <Route index element={<TableauDeBord />} />
          <Route path={ROUTES.CHAUFFEURS} element={<ChauffeursPage />} />
          <Route path={ROUTES.VEHICULES} element={<VehiculesPage />} />
          <Route path={ROUTES.UTILISATEURS} element={<PageUtilisateurs />} />
          <Route path={ROUTES.AFFECTATIONS} element={<AffectationsPage />} />
          <Route path={ROUTES.MAINTENANCES} element={<MaintenancePage />} />
          <Route path={ROUTES.CARNETS} element={<CarnetDeBordPage />} />
          <Route path={ROUTES.ENTRETIENS} element={<EntretiensPage />} />
          <Route path={ROUTES.PANNES} element={<PannesPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.PARAMETRES} element={<ParametresPage />} />
          <Route path={ROUTES.CALENDRIER} element={<CalendrierPage />} />
          <Route path={ROUTES.AI} element={<AiPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
