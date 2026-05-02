import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import ChauffeursPage from "@/pages/ChauffeursPage";
import VehiculesPage from "@/pages/VehiculesPage";
import UsersPage from "@/pages/UsersPage";
import AffectationsPage from "@/pages/AffectationPage";
import MaintenancePage from "@/pages/MaintenancePage";
import CarnetDeBordPage from "@/pages/CarnetDeBordPage";
import EntretiensPage from "@/pages/EntretienPage";
import PannesPage from "@/pages/PannePage";
import Profile from "@/components/profile/profile";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="chauffeurs" element={<ChauffeursPage />} />
          <Route path="vehicules" element={<VehiculesPage />} />
          <Route path="utilisateurs" element={<UsersPage />} />
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
