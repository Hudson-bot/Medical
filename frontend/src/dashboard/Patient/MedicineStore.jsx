import React from "react";
import { useNavigate } from "react-router-dom";

const MedicineStore = () => {
  const navigate = useNavigate();

  const handleSubmit = () =>{
    navigate("/medicine-store");
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold text-white">Medicine Store</span>
        <button 
        onClick={handleSubmit} 
        className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MedicineStore;