import { useState, useEffect } from 'react';
import PropertyList from './PropertyList.jsx';
import PropertyForm from './PropertyForm.jsx';

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('properties');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/properties', {
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setProperties(data);
      }
    } catch {
      console.error('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
    setShowForm(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        credentials: 'include'
      });
      window.location.reload();
    } catch {
      console.error('Logout failed');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            RealEstate Management
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <button
            onClick={() => setActiveTab('properties')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'properties'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab('rents')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'rents'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Rents
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'rents'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Requests
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {activeTab === 'properties' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">My Properties</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {showForm ? 'Cancel' : 'Add Property +'}
                </button>
              </div>
              
              {showForm && <PropertyForm onAdd={handleAddProperty} />}
              <PropertyList properties={properties} onUpdate={fetchProperties} />
            </div>
          )}
          
          {activeTab === 'rents' && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Rent Agreements</h2>
              <div className="text-gray-500 text-lg">Rent management coming soon...</div>
            </div>
          )}
          
          {activeTab === 'requests' && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Rental Requests</h2>
              <div className="text-gray-500 text-lg">Request management coming soon...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

