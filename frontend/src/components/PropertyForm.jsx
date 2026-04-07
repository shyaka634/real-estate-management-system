import { useState } from 'react';

export default function PropertyForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        onAdd(data);
        setFormData({ title: '', location: '', price: '' });
        setMessage('Property added successfully!');
      } else {
        setMessage(data.message || 'Failed to add property');
      }
    } catch {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-8 rounded-2xl border-2 border-dashed border-blue-200 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add New Property</h3>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 text-center font-medium ${
          message.includes('successfully') 
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Property Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 shadow-sm"
            placeholder="Cozy Downtown Apartment"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 shadow-sm"
            placeholder="Downtown, City Center"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Price (USD)</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 shadow-sm"
            placeholder="1200"
          />
        </div>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'List Property'}
          </button>
        </div>
      </form>
    </div>
  );
}

