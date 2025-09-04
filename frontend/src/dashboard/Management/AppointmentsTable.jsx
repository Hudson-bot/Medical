import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';

const AppointmentsTable = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axiosInstance.get('/api/appointments/all-appointments');
        
        // The backend returns { appointments: [...], currentPage: 1, ... }
        // We need to extract the appointments array
        setAppointments(response.data.appointments || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err.response?.data?.message || err.message);
        setIsLoading(false);
      }
    };

    fetchAllAppointments();
  }, []);

  const handleRowClick = (appointmentId) => {
    navigate(`/management/appointments/${appointmentId}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">All Appointments</h3>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">All Appointments</h3>
        <div className="text-center py-8 text-red-500">
          <p>Error loading appointments: {error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">All Appointments</h3>
        <div className="text-center py-8 text-gray-500">
          <p>No appointments found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">All Appointments</h3>
        <div className="flex space-x-2">
          <button 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Patient</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Doctor</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Time</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Disease</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr
                key={appt._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 text-sm text-gray-700">{appt._id.substring(0, 8)}</td>
                <td className="p-3 text-sm text-gray-700">{appt.patientName}</td>
                <td className="p-3 text-sm text-gray-700">{appt.doctorName}</td>
                <td className="p-3 text-sm text-gray-700">
                  {new Date(appt.date).toLocaleDateString()}
                </td>
                <td className="p-3 text-sm text-gray-700">{appt.time}</td>
                <td className="p-3 text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      appt.disease === "Fever"
                        ? "bg-red-100 text-red-800"
                        : appt.disease === "Cold"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {appt.disease}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      appt.status === "Scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : appt.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : appt.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <button
                    onClick={() => handleRowClick(appt._id)}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;