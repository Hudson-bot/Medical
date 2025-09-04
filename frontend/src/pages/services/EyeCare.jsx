import React from "react";
import { FaEye } from "react-icons/fa";

const EyeCare = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaEye className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Eye Care Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Expert treatment for vision-related issues and eye diseases.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Eye Care Department</h2>
          <p className="text-gray-700 mb-6">
            Our eye care department is dedicated to preserving and improving your vision. We offer comprehensive eye exams, advanced diagnostic services, and personalized treatment plans for a wide range of eye conditions, including cataracts, glaucoma, and refractive errors.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of ophthalmologists and optometrists is committed to providing the highest standard of care using the latest technology and techniques. Whether you need routine eye care or specialized treatment, we are here to help you see clearly and live better.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Comprehensive eye exams</li>
            <li>Diagnosis and treatment of cataracts</li>
            <li>Glaucoma management</li>
            <li>Refractive surgery (LASIK, PRK)</li>
            <li>Pediatric eye care</li>
            <li>Treatment of macular degeneration</li>
            <li>Contact lens fitting and care</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EyeCare;