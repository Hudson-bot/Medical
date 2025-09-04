import React from "react";
import { FaTooth } from "react-icons/fa";

const Dentistry = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaTooth className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Dentistry Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Comprehensive oral health care for all ages.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Dentistry Department</h2>
          <p className="text-gray-700 mb-6">
            Our dentistry department provides a wide range of services, from routine check-ups and cleanings to advanced procedures like dental implants and orthodontics. We are committed to helping you achieve a healthy and beautiful smile.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of dentists and hygienists use the latest technology to ensure your comfort and satisfaction.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Routine dental check-ups</li>
            <li>Teeth cleaning and whitening</li>
            <li>Fillings and root canals</li>
            <li>Dental implants</li>
            <li>Orthodontics (braces and aligners)</li>
            <li>Oral surgery</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dentistry;