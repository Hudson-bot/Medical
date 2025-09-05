// src/components/ChartsSection.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const ChartsSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/api/appointments/stats/monthly");
        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching monthly stats:", err);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-gradient-to-br from-pastel-blue-100 to-pastel-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Monthly Patient Visits
      </h3>

      {/* Loading */}
      {isLoading && (
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center animate-pulse">
          <span className="text-gray-500">Loading...</span>
        </div>
      )}

      {/* Empty */}
      {!isLoading && data.length === 0 && (
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No data available.</span>
        </div>
      )}

      {/* Chart */}
      {!isLoading && data.length > 0 && (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" fill="#3b82f6" name="Patient Visits" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ChartsSection;
