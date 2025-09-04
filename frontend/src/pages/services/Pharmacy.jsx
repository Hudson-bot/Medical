import React from "react";
import { FaPills } from "react-icons/fa";

const Pharmacy = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaPills className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Pharmacy Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Safe and effective medication management for all patients.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Pharmacy Department</h2>
          <p className="text-gray-700 mb-6">
            Our pharmacy department is dedicated to providing safe and effective medication management for all patients. We offer prescription services, medication counseling, and support for managing chronic conditions.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of pharmacists and pharmacy technicians is committed to ensuring the highest standards of care and patient safety.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Prescription dispensing</li>
            <li>Medication counseling</li>
            <li>Chronic disease management</li>
            <li>Immunization services</li>
            <li>Compounding services</li>
            <li>Medication therapy management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;