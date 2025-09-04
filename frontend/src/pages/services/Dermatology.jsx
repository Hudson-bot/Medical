import React from "react";
import { FaUserMd } from "react-icons/fa";

const Dermatology = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaUserMd className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Dermatology Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Treatment of skin conditions, from acne to skin cancer.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Dermatology Department</h2>
          <p className="text-gray-700 mb-6">
            Our dermatology department specializes in diagnosing and treating a wide range of skin conditions, including acne, eczema, psoriasis, and skin cancer. We offer both medical and cosmetic treatments to help you achieve healthy and radiant skin.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of dermatologists and skin care specialists uses the latest technology and techniques to provide effective care.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Acne treatment</li>
            <li>Eczema and psoriasis management</li>
            <li>Skin cancer screening and treatment</li>
            <li>Cosmetic dermatology</li>
            <li>Laser therapy</li>
            <li>Mohs surgery</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dermatology;