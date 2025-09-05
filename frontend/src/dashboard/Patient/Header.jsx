import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import PrescriptionPopup from "./PrescriptionPopup"; // Adjust path as needed

const Header = () => {
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPrescriptions, setShowPrescriptions] = useState(false);

  // Fetch patient data from backend
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setPatientName(response.data.name || "Patient");
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Failed to fetch patient data");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-3xl shadow-xl text-white">
        <div className="animate-pulse">
          <div className="h-8 bg-blue-500 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-blue-500 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-3xl shadow-xl text-white relative">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Good Morning, {patientName}</h1>
            <p className="text-lg mt-2">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          
          <button
            onClick={() => setShowPrescriptions(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center gap-2"
          >
            📋 My Prescriptions
          </button>
        </div>
        
        {error && (
          <div className="mt-4 bg-red-500 bg-opacity-20 border border-red-300 rounded-lg p-3">
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Prescription Popup */}
      <PrescriptionPopup 
        isOpen={showPrescriptions}
        onClose={() => setShowPrescriptions(false)}
      />
    </>
  );
};

export default Header;