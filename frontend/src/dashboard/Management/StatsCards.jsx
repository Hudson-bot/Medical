import React, { useState, useEffect } from 'react';
import { FaUserMd, FaUserInjured, FaUserPlus } from 'react-icons/fa';
import RegistrationModal from './RegistrationModal';
import axiosInstance from '../../axiosConfig'; // Adjust path as needed

const StatsCards = ({ onShowPatients, onShowDoctors }) => {
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors and patients count from backend
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        // Fetch doctors count
        const doctorsResponse = await axiosInstance.get('/api/auth/count/doctors', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Fetch patients count
        const patientsResponse = await axiosInstance.get('/api/auth/count/patients', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setDoctorsCount(doctorsResponse.data.count);
        setPatientsCount(patientsResponse.data.count);
      } catch (err) {
        console.error('Error fetching counts:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);


  const handleDoctorsClick = () => {
    console.log('Navigate to doctors list');
  };

  const handlePatientsClick = () => {
    console.log('Navigate to patients list');
  };

  const stats = [
    { 
      title: "Total Doctors", 
      value: loading ? "..." : doctorsCount, 
      change: "View all doctors", 
      color: "from-blue-200 to-purple-200", 
      icon: <FaUserMd />,
      isButton: true,
      action: () => onShowDoctors && onShowDoctors()
    },
    { 
      title: "Total Patients", 
      value: loading ? "..." : patientsCount, 
      change: "View all patients", 
      color: "from-pink-200 to-orange-200", 
      icon: <FaUserInjured />,
      isButton: true,
      action: () => onShowPatients && onShowPatients()
    },
    { 
      title: "Register New Doctor", 
      value: "Add", 
      change: "Create account", 
      color: "from-green-200 to-teal-200", 
      icon: <FaUserPlus />,
      isButton: true,
      action: () => setIsDoctorModalOpen(true)
    },
    { 
      title: "Register New Patient", 
      value: "Add", 
      change: "Create account", 
      color: "from-purple-200 to-indigo-200", 
      icon: <FaUserPlus />,
      isButton: true,
      action: () => setIsPatientModalOpen(true)
    },
  ];

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-lg shadow-lg ${stat.isButton ? 'cursor-pointer' : ''}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
              <div className="text-gray-700 text-2xl">{stat.icon}</div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">Error</p>
            <p className="text-sm text-gray-700 mt-1">Failed to load</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${stat.isButton ? 'cursor-pointer hover:scale-105' : ''}`}
            onClick={stat.isButton ? stat.action : undefined}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
              <div className="text-gray-700 text-2xl">{stat.icon}</div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-sm text-gray-700 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Registration Modals */}
      <RegistrationModal 
        isOpen={isDoctorModalOpen} 
        onClose={() => setIsDoctorModalOpen(false)} 
        role="Doctor" 
      />
      
      <RegistrationModal 
        isOpen={isPatientModalOpen} 
        onClose={() => setIsPatientModalOpen(false)} 
        role="Patient" 
      />
    </>
  );
};

export default StatsCards;