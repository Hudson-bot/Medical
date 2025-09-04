import React from "react";
import { FaAllergies } from "react-icons/fa";

const AllergyImmunology = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaAllergies className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Allergy & Immunology Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Diagnosis and treatment of allergies and immune system disorders.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Allergy & Immunology Department</h2>
          <p className="text-gray-700 mb-6">
            Our allergy and immunology department specializes in diagnosing and treating conditions related to the immune system, including allergies, asthma, and autoimmune diseases. We offer personalized treatment plans to help you manage your symptoms and improve your quality of life.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of allergists and immunologists uses advanced diagnostic tools and therapies to provide effective care.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Allergy testing and treatment</li>
            <li>Asthma management</li>
            <li>Immunotherapy</li>
            <li>Treatment of autoimmune diseases</li>
            <li>Food allergy management</li>
            <li>Eczema and skin allergy care</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllergyImmunology;