import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./components/AuthContext";
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import PropertiesPage from "./pages/PropertiesPage";
import RentsPage from "./pages/RentsPage";
import RequestsPage from "./pages/RequestsPage";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function WithLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <WithLayout>
              <DashboardPage />
            </WithLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <WithLayout>
              <PropertiesPage />
            </WithLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/rents"
        element={
          <ProtectedRoute>
            <WithLayout>
              <RentsPage />
            </WithLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests"
        element={
          <ProtectedRoute>
            <WithLayout>
              <RequestsPage />
            </WithLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
