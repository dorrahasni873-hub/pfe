import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ROUTES } from "@/routes";
import LayoutPrincipal from "@/app/layouts/LayoutPrincipal";
import RouteProtegee from "@/shared/components/RouteProtegee/RouteProtegee";
import NotFoundPage from "@/shared/components/NotFound/NotFoundPage";

const PageConnexion = lazy(() => import("@/features/auth/pages/LoginPage"));
const PageInscription = lazy(() => import("@/features/auth/pages/RegisterPage"));
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

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

export const RoutesApp = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
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
            <Route path="chauffeurs" element={<ChauffeursPage />} />
            <Route path="vehicules" element={<VehiculesPage />} />
            <Route path="utilisateurs" element={<PageUtilisateurs />} />
            <Route path="affectations" element={<AffectationsPage />} />
            <Route path="maintenances" element={<MaintenancePage />} />
            <Route path="carnets" element={<CarnetDeBordPage />} />
            <Route path="entretiens" element={<EntretiensPage />} />
            <Route path="pannes" element={<PannesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
