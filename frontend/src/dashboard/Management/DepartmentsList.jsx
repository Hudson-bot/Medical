import React, { useState, useEffect } from 'react';
import { FaStethoscope, FaTooth, FaHeadSideVirus, FaHeartbeat, FaEye } from 'react-icons/fa';

const DepartmentsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  // Simulate fetching data (replace with actual API call)
  useEffect(() => {
    setTimeout(() => {
      setDepartments([
        { name: "General Physician", percentage: 35, icon: <FaStethoscope /> },
        { name: "Dentist", percentage: 24, icon: <FaTooth /> },
        { name: "ENT", percentage: 10, icon: <FaHeadSideVirus /> },
        { name: "Cardiologist", percentage: 16, icon: <FaHeartbeat /> },
        { name: "Ophthalmology", percentage: 20, icon: <FaEye /> },
      ]);
      setIsLoading(false);
    }, 2000); // Simulate a 2-second delay
  }, []);

  // Dynamic colors for progress bars
  const colors = ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-red-200', 'bg-purple-200'];

  return (
<div className="bg-gradient-to-br from-pastel-blue-100 to-pastel-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">      <h3 className="text-xl font-semibold text-gray-800 mb-6">Top Departments</h3>

      {/* Loading State */}
      {isLoading && (
        <ul className="space-y-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <li key={index} className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-gray-300 animate-pulse" style={{ width: '50%' }}></div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Empty State */}
      {!isLoading && departments.length === 0 && (
        <p className="text-gray-500">No departments available.</p>
      )}

      {/* Departments List */}
      {!isLoading && departments.length > 0 && (
        <ul className="space-y-4">
          {departments.map((dept, index) => (
            <li key={index} className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">{dept.icon}</span>
                  <span className="text-gray-700">{dept.name}</span>
                </div>
                <span className="text-gray-500">{dept.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${colors[index % colors.length]} h-2 rounded-full`}
                  style={{ width: `${dept.percentage}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DepartmentsList;