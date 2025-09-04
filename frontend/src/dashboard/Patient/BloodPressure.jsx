import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";

const BloodPressure = () => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBloodPressureData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/medical-details/patient");
        
        if (response.data.success) {
          const bpData = response.data.data.medicalDetail?.bloodPressure;
          if (bpData && bpData.systolic !== undefined && bpData.diastolic !== undefined) {
            setValue(`${bpData.systolic}/${bpData.diastolic}`);
          } else {
            setValue(null);
          }
        }
      } catch (err) {
        console.error("Error fetching blood pressure data:", err);
        setError("Failed to load blood pressure data");
      } finally {
        setLoading(false);
      }
    };

    fetchBloodPressureData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-blue-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-7 bg-gray-300 rounded w-40 animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-300 rounded w-28 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-blue-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <img src="/images/bloodPressure.jpg" alt="BloodPressure" className="w-10 h-10 object-contain" />
            <h3 className="text-2xl font-bold text-blue-800">Blood Pressure</h3>
          </div>
          <div className="text-red-500 text-center">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm text-blue-600 hover:text-blue-800 mt-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayValue = value === null ? "N/A" : value;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
      <div className="flex flex-col items-center space-y-4">
        {/* Header with Icon */}
        <div className="flex items-center space-x-3">
          <img src="/images/bloodPressure.jpg" alt="BloodPressure" className="w-10 h-10 object-contain" />
          <h3 className="text-2xl font-bold text-blue-800">Blood Pressure</h3>
        </div>

        {/* Value with Animated Pulse Effect */}
        <div className="relative">
          <p className="text-5xl font-bold text-blue-600 text-center">{displayValue}</p>
          {value !== null && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full opacity-0 animate-ping"></div>
            </div>
          )}
        </div>

        {/* Subtext */}
        <p className="text-sm text-gray-500">Current blood pressure in mmHg</p>
        
        {/* Last Updated */}
        {value !== null && (
          <p className="text-xs text-gray-400 mt-2">
            Last reading available
          </p>
        )}
      </div>
    </div>
  );
};

export default BloodPressure;