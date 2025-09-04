import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig'; // Adjust path as needed

const UpcomingAppointments = () => {
  const navigate = useNavigate();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch upcoming appointments from backend
  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get('/api/appointments/user-appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Filter for upcoming appointments (date is today or in the future)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
        
        const upcoming = response.data.filter(appt => {
          const appointmentDate = new Date(appt.date);
          return appointmentDate >= today && appt.status === 'Scheduled';
        });

        // Sort by date (soonest first)
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setUpcomingAppointments(upcoming);
      } catch (err) {
        console.error('Error fetching upcoming appointments:', err);
        setError('Failed to fetch upcoming appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAppointments();
  }, []);

  const handleClick = () => {
    navigate('/all-upcoming-appointments');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-green-100">
        <h3 className="text-2xl font-bold text-green-900 mb-4">Upcoming Appointments</h3>
        <div className="animate-pulse space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-16 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-purple-50 p-6 rounded-3xl shadow-xl border border-green-100">
        <h3 className="text-2xl font-bold text-green-900 mb-4">Upcoming Appointments</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="bg-gradient-to-br from-green-50 to-purple-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-green-100 cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="text-2xl font-bold text-green-900 mb-4">Upcoming Appointments</h3>
      {upcomingAppointments.length === 0 ? (
        <p className="text-gray-600">No upcoming appointments</p>
      ) : (
        <ul className="space-y-3">
          {upcomingAppointments.slice(0, 3).map((appt) => (
            <li key={appt._id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-green-800">
                  {formatDate(appt.date)}
                </span>
                <span className="text-sm text-gray-600">{appt.time}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700 font-medium">{appt.doctorName}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {appt.doctorId?.doctorType || 'Doctor'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{appt.disease}</p>
            </li>
          ))}
          {upcomingAppointments.length > 3 && (
            <li className="text-center text-blue-600 font-medium mt-2">
              + {upcomingAppointments.length - 3} more appointments
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default UpcomingAppointments;