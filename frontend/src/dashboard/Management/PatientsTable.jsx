import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig'; // Adjust path as needed`
import { useNavigate } from 'react-router-dom';


const PatientsTable = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all patients from backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get('/api/auth/patients', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setPatients(response.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Failed to load patients data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.patientInfo?.phone && patient.patientInfo.phone.includes(searchTerm))
  );

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">All Patients</h2>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 rounded mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-300 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">All Patients</h2>
        <div className="text-red-500 text-center py-8">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">All Patients</h2>
        <span className="text-sm text-gray-600">
          Total: {patients.length} patients
        </span>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search patients by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Age</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Gender</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-600">
                  No patients found
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => (
                <tr key={patient._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{patient.name}</td>
                  <td className="py-4 px-4 text-gray-700">{patient.email}</td>
                  <td className="py-4 px-4 text-gray-700">
                    {patient.patientInfo?.phone || 'Not provided'}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {patient.patientInfo?.age || 'Not provided'}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {patient.patientInfo?.gender || 'Not provided'}
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsTable;