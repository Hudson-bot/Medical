import React from "react";
import { FaStethoscope } from "react-icons/fa";

const GeneralMedicine = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaStethoscope className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">General Medicine Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Primary care for a wide range of health conditions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our General Medicine Department</h2>
          <p className="text-gray-700 mb-6">
            Our general medicine department provides comprehensive care for adults and children. We focus on preventive care, early diagnosis, and management of chronic conditions such as diabetes, hypertension, and respiratory diseases.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of general practitioners is dedicated to providing personalized and compassionate care.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Preventive health check-ups</li>
            <li>Management of chronic diseases</li>
            <li>Treatment of acute illnesses</li>
            <li>Vaccinations</li>
            <li>Health education and counseling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GeneralMedicine;