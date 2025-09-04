import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartsSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // Simulate fetching data (replace with actual API call)
  useEffect(() => {
    setTimeout(() => {
      setData([
        { name: 'Male', value: 45 },
        { name: 'Female', value: 55 },
      ]);
      setIsLoading(false);
    }, 2000); // Simulate a 2-second delay
  }, []);

  // Chart colors
  const COLORS = ['#3b82f6', '#a855f7'];

  return (
    <div className="bg-gradient-to-br from-pastel-blue-100 to-pastel-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient Visit by Gender</h3>

      {/* Loading State */}
      {isLoading && (
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center animate-pulse">
          <span className="text-gray-500">Loading...</span>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && data.length === 0 && (
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No data available.</span>
        </div>
      )}

      {/* Chart */}
      {!isLoading && data.length > 0 && (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Gender Statistics */}
      {!isLoading && data.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <p>Male: {data[0].value}%</p>
          <p>Female: {data[1].value}%</p>
        </div>
      )}
    </div>
  );
};

export default ChartsSection;