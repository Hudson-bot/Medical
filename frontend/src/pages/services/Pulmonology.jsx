import React from "react";
import { FaLungs } from "react-icons/fa";

const Pulmonology = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaLungs className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Pulmonology Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Specialized care for respiratory conditions and lung diseases.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Pulmonology Department</h2>
          <p className="text-gray-700 mb-6">
            Our pulmonology department is dedicated to diagnosing and treating conditions affecting the respiratory system, including asthma, chronic obstructive pulmonary disease (COPD), lung cancer, and sleep apnea. We provide comprehensive care to help you breathe easier and live healthier.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of pulmonologists and respiratory therapists uses advanced diagnostic tools and treatments to manage respiratory conditions effectively.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Diagnosis and treatment of asthma</li>
            <li>COPD management</li>
            <li>Lung cancer screening and treatment</li>
            <li>Sleep apnea diagnosis and therapy</li>
            <li>Pulmonary rehabilitation</li>
            <li>Bronchoscopy and other diagnostic procedures</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pulmonology;