import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig"; // Adjust path as needed

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        // Fetch only upcoming appointments
        const response = await axiosInstance.get("/api/appointments/upcoming-appointments", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAppointments(response.data.appointments || response.data);
      } catch (err) {
        console.error("Error fetching upcoming appointments:", err);
        setError(err.response?.data?.message || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAppointments();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-900 mb-6">Upcoming Appointments</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-900 mb-6">Upcoming Appointments</h3>
        <div className="text-red-500 text-center py-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-900 mb-6">Upcoming Appointments</h3>
        <div className="text-center py-6 text-gray-600">
          <p>No upcoming appointments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Upcoming Appointments</h3>
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <div
            key={appointment._id || index}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-blue-800">
                  {appointment.patientName || appointment.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {appointment.time} • {appointment.date && new Date(appointment.date).toLocaleDateString()}
                </p>
                {appointment.disease && (
                  <p className="text-sm text-gray-500 mt-1">Condition: {appointment.disease}</p>
                )}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  appointment.status === "Scheduled" || appointment.status === "Upcoming"
                    ? "bg-blue-100 text-blue-700"
                    : appointment.status === "In Progress"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;