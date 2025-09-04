import React from "react";
import { FaBrain } from "react-icons/fa";

const Neurology = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaBrain className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Neurology Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Expert care for conditions affecting the brain, spine, and nervous system.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Neurology Department</h2>
          <p className="text-gray-700 mb-6">
            Our neurology department is dedicated to providing advanced care for patients with neurological disorders. We specialize in diagnosing and treating conditions such as epilepsy, stroke, multiple sclerosis, Parkinson's disease, and more.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of neurologists, neurosurgeons, and support staff work together to deliver comprehensive and compassionate care. We utilize the latest diagnostic tools and treatment techniques to ensure the best outcomes for our patients.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Diagnosis and treatment of epilepsy</li>
            <li>Stroke prevention and management</li>
            <li>Multiple sclerosis care</li>
            <li>Parkinson's disease treatment</li>
            <li>Neurodegenerative disorder management</li>
            <li>Minimally invasive neurosurgery</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Neurology;