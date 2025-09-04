import React from "react";
import { FaMicroscope } from "react-icons/fa";

const Pathology = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaMicroscope className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Pathology Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Diagnostic services, including lab tests and tissue analysis.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Pathology Department</h2>
          <p className="text-gray-700 mb-6">
            Our pathology department provides essential diagnostic services to support accurate diagnosis and treatment. We offer a wide range of laboratory tests, including blood tests, tissue analysis, and molecular diagnostics.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of pathologists and lab technicians is committed to delivering accurate and timely results to support patient care.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Blood tests</li>
            <li>Tissue biopsy and analysis</li>
            <li>Molecular diagnostics</li>
            <li>Cytopathology</li>
            <li>Hematology</li>
            <li>Microbiology</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pathology;