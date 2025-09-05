import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axiosInstance from "../../axiosConfig";

const WeeklyOverview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState("");
  const [stats, setStats] = useState({ appointments: 0, completed: 0, scheduled: 0 });

  useEffect(() => {
    fetchAppointmentStats();
  }, []);

  const fetchAppointmentStats = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/appointments/stats/chart");
      
      if (response.data.success) {
        setData(response.data.data);
        setDateRange(
          `Week of ${new Date(response.data.dateRange.start).toLocaleDateString()} - ${new Date(response.data.dateRange.end).toLocaleDateString()}`
        );
        setStats(response.data.total);
      }
    } catch (err) {
      console.error("Error fetching appointment stats:", err);
      setError("Failed to load appointment statistics");
      // Fallback to sample data if API fails
      setData([
        { day: "Mon", appointments: 10, completed: 8, scheduled: 2 },
        { day: "Tue", appointments: 25, completed: 20, scheduled: 5 },
        { day: "Wed", appointments: 30, completed: 25, scheduled: 5 },
        { day: "Thu", appointments: 20, completed: 15, scheduled: 5 },
        { day: "Fri", appointments: 35, completed: 30, scheduled: 5 },
        { day: "Sat", appointments: 15, completed: 10, scheduled: 5 },
        { day: "Sun", appointments: 5, completed: 3, scheduled: 2 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">Total: {payload[0].value} appointments</p>
          <p className="text-green-600">Completed: {payload[0].payload.completed}</p>
          <p className="text-orange-600">Scheduled: {payload[0].payload.scheduled}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-900 mb-6">Weekly Overview</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading appointment statistics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-blue-900">Weekly Appointment Overview</h3>
        {dateRange && (
          <span className="text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            {dateRange}
          </span>
        )}
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey="day"
            axisLine={{ stroke: "#4A90E2" }}
            tick={{ fill: "#4A90E2" }}
          />
          <YAxis
            axisLine={{ stroke: "#4A90E2" }}
            tick={{ fill: "#4A90E2" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="appointments"
            name="Total Appointments"
            fill="#4A90E2"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <Bar
            dataKey="completed"
            name="Completed"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <Bar
            dataKey="scheduled"
            name="Scheduled"
            fill="#F59E0B"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.appointments}</div>
          <div className="text-sm text-gray-600">Total Appointments</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.scheduled}</div>
          <div className="text-sm text-gray-600">Scheduled</div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyOverview;