import React from "react";
import { FaSyringe } from "react-icons/fa";

const Oncology = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaSyringe className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Oncology Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Advanced care for cancer patients, including chemotherapy and radiation therapy.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Oncology Department</h2>
          <p className="text-gray-700 mb-6">
            Our oncology department provides comprehensive care for patients with cancer. We offer advanced treatments, including chemotherapy, radiation therapy, immunotherapy, and targeted therapy, tailored to each patient's unique needs.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of oncologists, radiologists, and support staff is committed to providing compassionate care and improving outcomes for cancer patients.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Chemotherapy</li>
            <li>Radiation therapy</li>
            <li>Immunotherapy</li>
            <li>Targeted therapy</li>
            <li>Cancer screening and diagnosis</li>
            <li>Palliative care</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Oncology;