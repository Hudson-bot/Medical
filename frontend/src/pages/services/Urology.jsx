import React from "react";
import { FaProcedures } from "react-icons/fa";

const Urology = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaProcedures className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Urology Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Expert care for conditions affecting the urinary tract and reproductive system.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Urology Department</h2>
          <p className="text-gray-700 mb-6">
            Our urology department is equipped with state-of-the-art technology and staffed by highly skilled professionals. We specialize in diagnosing and treating a wide range of urological conditions, including kidney stones, urinary tract infections, prostate issues, and more.
          </p>
          <p className="text-gray-700 mb-6">
            We are committed to providing personalized care tailored to each patient's unique needs. Our team works closely with patients to develop effective treatment plans that prioritize their health and well-being.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Diagnosis and treatment of kidney stones</li>
            <li>Management of urinary tract infections</li>
            <li>Prostate health services</li>
            <li>Bladder cancer treatment</li>
            <li>Minimally invasive surgeries</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Urology;