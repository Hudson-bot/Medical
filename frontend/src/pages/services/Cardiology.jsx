import React from "react";
import { FaHeart } from "react-icons/fa";

const Cardiology = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaHeart className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Cardiology Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Specialized care for heart-related conditions and diseases.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Cardiology Department</h2>
          <p className="text-gray-700 mb-6">
            Our cardiology department is dedicated to diagnosing, treating, and preventing heart diseases. We offer advanced treatments for conditions such as coronary artery disease, heart failure, arrhythmias, and hypertension.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of cardiologists and cardiac surgeons use state-of-the-art technology to provide personalized care and improve heart health.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Diagnosis and treatment of heart disease</li>
            <li>Cardiac rehabilitation</li>
            <li>Electrocardiograms (ECG)</li>
            <li>Angioplasty and stenting</li>
            <li>Pacemaker implantation</li>
            <li>Heart surgery</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cardiology;