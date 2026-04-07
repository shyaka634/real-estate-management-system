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

