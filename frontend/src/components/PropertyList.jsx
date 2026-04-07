export default function PropertyList({ properties, onUpdate }) {
  const handleDelete = async (id) => {
    if (!confirm('Delete this property?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        onUpdate();
      }
    } catch {
      alert('Failed to delete property');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.length === 0 ? (
        <div className="col-span-full text-center py-24">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties yet</h3>
          <p className="text-gray-500 text-lg">Add your first property to get started!</p>
        </div>
      ) : (
        properties.map((property) => (
          <div key={property.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-gray-100">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                  {formatPrice(property.price)}/mo
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {property.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{property.location}</p>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleDelete(property.id)}
                  className="text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Delete
                </button>
                <span className="text-sm text-gray-500">ID: {property.id}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

