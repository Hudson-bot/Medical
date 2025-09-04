import React from "react";
import { FaBaby } from "react-icons/fa";

const Pediatrics = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaBaby className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Pediatrics Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Specialized care for infants, children, and adolescents.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Pediatrics Department</h2>
          <p className="text-gray-700 mb-6">
            Our pediatrics department is dedicated to providing comprehensive care for children from birth through adolescence. We focus on preventive care, early diagnosis, and treatment of childhood illnesses and developmental disorders.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of pediatricians and child specialists is committed to ensuring the health and well-being of your child.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Well-child check-ups</li>
            <li>Vaccinations</li>
            <li>Treatment of childhood illnesses</li>
            <li>Developmental assessments</li>
            <li>Nutritional counseling</li>
            <li>Adolescent health services</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pediatrics;