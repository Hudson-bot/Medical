import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext.jsx";
import CartPage from "../../components/CartPage/CartPage.jsx";
import PrescriptionModal from "../../pages/PrescriptionModal/PrescriptionModal.jsx"; // Adjust path
import axiosInstance from "../../axiosConfig"; // Adjust path as needed

export default function MedicineShop() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cart, addToCart } = useCart();

  // Fetch medicines from backend
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (search) params.append('search', search);
        if (filter) params.append('filter', filter);
        if (categoryFilter) params.append('category', categoryFilter);
        if (sortBy) params.append('sortBy', sortBy);

        const response = await axiosInstance.get(`/api/medicines?${params}`);
        setMedicines(response.data);
      } catch (err) {
        console.error("Error fetching medicines:", err);
        setError("Failed to load medicines");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [search, filter, categoryFilter, sortBy]);

  // Fetch diseases and categories for filters
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [diseasesRes, categoriesRes] = await Promise.all([
          axiosInstance.get('/api/medicines/diseases'),
          axiosInstance.get('/api/medicines/categories')
        ]);
        
        setDiseases(diseasesRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching filter options:", err);
      }
    };

    fetchFilterOptions();
  }, []);

  // Handle adding prescription medicines to cart
  const handleAddPrescriptionToCart = (prescriptionMedicines) => {
    prescriptionMedicines.forEach(med => {
      addToCart(med);
    });
    alert(`${prescriptionMedicines.length} medicines added to cart from your prescription!`);
  };

  if (loading) {
    return (
      <div className="mx-auto p-4 mt-16 bg-indigo-50 min-h-screen">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="w-full h-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto p-4 mt-16 bg-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 mt-16 bg-indigo-50 min-h-screen">
      {showCart ? (
        <CartPage onBack={() => setShowCart(false)} />
      ) : (
        <>
          {/* Search Bar and Action Buttons */}
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            
            {/* Prescription Upload Button */}
            <button
              onClick={() => setShowPrescriptionModal(true)}
              className="bg-green-600 text-white p-2 rounded-lg flex items-center justify-center w-12 h-12 hover:bg-green-700 transition duration-300"
              title="Upload Prescription"
            >
              <span className="text-sm">📋</span>
            </button>
            
            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="bg-indigo-900 text-white p-2 rounded-lg flex items-center justify-center w-12 h-12 hover:opacity-75 transition duration-300 relative"
              title="View Cart"
            >
              <span className="text-sm">🛒</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex gap-4 mb-4 flex-wrap">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">All Diseases</option>
              {diseases.map((disease) => (
                <option key={disease} value={disease}>
                  {disease}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full md:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Sort By</option>
              <option value="name">Name A-Z</option>
              <option value="price">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
              <option value="disease">Disease</option>
            </select>

            {(filter || categoryFilter || sortBy) && (
              <button
                onClick={() => {
                  setFilter("");
                  setCategoryFilter("");
                  setSortBy("");
                }}
                className="w-full md:w-auto p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Medicine Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {medicines.length ? (
              medicines.map((med) => (
                <div
                  key={med._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={med.image}
                    alt={med.name}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-semibold">{med.name}</h3>
                    <p className="text-xs text-gray-600">For: {med.disease}</p>
                    <p className="text-xs text-gray-500">{med.category}</p>
                    <p className="text-sm font-bold">Price: ${med.price}</p>
                    {med.prescriptionRequired && (
                      <p className="text-xs text-red-500">Prescription Required</p>
                    )}
                    <button
                      onClick={() => addToCart(med)}
                      className="w-full mt-2 bg-indigo-900 text-white py-1 rounded-lg hover:opacity-75 transition duration-300 text-xs"
                      disabled={med.prescriptionRequired}
                      title={med.prescriptionRequired ? "Prescription required - use upload feature" : ""}
                    >
                      {med.prescriptionRequired ? "Prescription Needed" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No medicines found. Try adjusting your filters.
              </p>
            )}
          </div>

          {/* Prescription Modal */}
          <PrescriptionModal
            isOpen={showPrescriptionModal}
            onClose={() => setShowPrescriptionModal(false)}
            medicines={medicines}
            onAddToCart={handleAddPrescriptionToCart}
          />
        </>
      )}
    </div>
  );
}