import React from "react";
import { FaBone } from "react-icons/fa";

const Orthopedics = () => {
  return (
    <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
            <FaBone className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Orthopedics Department</h1>
          <p className="text-lg text-gray-700 mt-2">
            Specialized care for musculoskeletal conditions and injuries.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Orthopedics Department</h2>
          <p className="text-gray-700 mb-6">
            Our orthopedics department specializes in the diagnosis and treatment of conditions affecting the bones, joints, ligaments, and muscles. We offer both surgical and non-surgical treatments for injuries, arthritis, and other musculoskeletal disorders.
          </p>
          <p className="text-gray-700 mb-6">
            Our team of orthopedic surgeons and physiotherapists is committed to helping you regain mobility and live pain-free.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Joint replacement surgery</li>
            <li>Arthroscopy</li>
            <li>Fracture treatment</li>
            <li>Spine surgery</li>
            <li>Sports injury management</li>
            <li>Physical therapy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orthopedics;