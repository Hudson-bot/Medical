import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";

const HeartRate = () => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeartRateData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/medical-details/patient");
        
        if (response.data.success) {
          const heartRateValue = response.data.data.medicalDetail?.heartRate;
          setValue(heartRateValue !== undefined ? heartRateValue : null);
        }
      } catch (err) {
        console.error("Error fetching heart rate data:", err);
        setError("Failed to load heart rate data");
      } finally {
        setLoading(false);
      }
    };

    fetchHeartRateData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-indigo-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-7 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-300 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-40 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-indigo-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <img src="/images/heartbeat.png" alt="HeartBeat" className="w-10 h-10 object-contain" />
            <h3 className="text-2xl font-bold text-indigo-800">Heart Rate</h3>
          </div>
          <div className="text-red-500 text-center">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm text-indigo-600 hover:text-indigo-800 mt-2"
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
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-indigo-100">
      <div className="flex flex-col items-center space-y-4">
        {/* Header with Icon */}
        <div className="flex items-center space-x-3">
          <img src="/images/heartbeat.png" alt="HeartBeat" className="w-10 h-10 object-contain" />
          <h3 className="text-2xl font-bold text-indigo-800">Heart Rate</h3>
        </div>

        {/* Value with Animated Pulse Effect */}
        <div className="relative">
          <p className="text-5xl font-bold text-indigo-600">{displayValue}</p>
          {value !== null && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-indigo-200 rounded-full opacity-0 animate-ping"></div>
            </div>
          )}
        </div>

        {/* Subtext */}
        <p className="text-sm text-gray-500">Current heart rate in bpm</p>
        
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

export default HeartRate;