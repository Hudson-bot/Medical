import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { FaUserInjured, FaUserMd, FaHospital } from "react-icons/fa";

const ButtonsForSigning = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleSignIn = (role) => {
    navigate(`/signin?role=${role}`); // Navigate to the SigninPage with role as a query parameter
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-6">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col items-center space-y-6 w-full max-w-md hover:shadow-3xl transition-shadow duration-300">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Register yourself as</h2>

        {/* Buttons for different roles */}
        <button
          onClick={() => handleSignIn("Patient")}
          className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          <FaUserInjured className="text-2xl" /> Patient
        </button>

        <button
          onClick={() => handleSignIn("Doctor")}
          className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          <FaUserMd className="text-2xl" /> Doctor
        </button>

        <button
          onClick={() => handleSignIn("Management")}
          className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          <FaHospital className="text-2xl" /> Management
        </button>
      </div>
    </section>
  );
};

export default ButtonsForSigning;