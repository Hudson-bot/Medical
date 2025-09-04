import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig"; // Adjust path as needed

const WelcomeBanner = () => {
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-3xl shadow-xl text-white">
        <h1 className="text-3xl font-bold">Good Morning, Patient</h1>
        <p className="text-lg mt-2">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-3xl shadow-xl text-white flex justify-between items-center">
      <h1 className="text-3xl font-bold">Good Morning, {patientName}</h1>
      <p className="text-lg mt-2">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <button className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Create Appointment
        </button>
    </div>
  );
};

export default WelcomeBanner;

//import React from 'react';

// const WelcomeBanner = () => {
//   return (
//     <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-3xl shadow-xl text-white flex justify-between items-center">
//       {/* Text Content */}
//       <div>
//         <h2 className="text-3xl font-bold">Good Morning, Daniel Bruk</h2>
//         <p className="text-lg mt-2">Have a nice day at work & don’t forget to take care of yourself!</p>
//         <button className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//           Create Appointment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WelcomeBanner;fetxh the name of the logged user