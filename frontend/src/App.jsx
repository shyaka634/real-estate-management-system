<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';
import Auth from './components/Auth.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [_user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth status on mount
    fetch('http://localhost:5000/api/users/profile', {
      credentials: 'include'
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Not authenticated');
    })
    .then(data => {
      setUser(data);
      setIsAuthenticated(true);
    })
    .catch(() => {
      setIsAuthenticated(false);
    })
    .finally(() => setLoading(false));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
          <Auth onLogin={handleLogin} />
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;

>>>>>>> d66e7ea0ba16666e78f0fcef9299a25396fa91dc
