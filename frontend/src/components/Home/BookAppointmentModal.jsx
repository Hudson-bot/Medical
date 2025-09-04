import React, { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaClock, FaNotesMedical, FaStethoscope, FaTimes, FaEnvelope, FaPhone } from "react-icons/fa";
import axiosInstance from "../../axiosConfig";

const BookAppointmentModal = ({ onClose, onBookAppointment }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: "",
    disease: "",
    date: "",
    time: "",
    notes: "",
    patientName: "",
    patientEmail: "",
    patientPhone: ""
  });

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    
    // Fetch doctors from backend
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get("/api/appointments/doctors");
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let response;
      
      if (isLoggedIn) {
        // User is logged in - use their token and always use patientName from form
        const token = localStorage.getItem("token");
        const appointmentData = {
          doctorId: formData.doctorId,
          disease: formData.disease,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
          patientName: formData.patientName // Always use patientName from form
        };
        
        response = await axiosInstance.post("/api/appointments/book", appointmentData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        // User is not logged in - include patient info in the request
        const appointmentData = {
          doctorId: formData.doctorId,
          disease: formData.disease,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
          patientName: formData.patientName,
          patientEmail: formData.patientEmail,
          patientPhone: formData.patientPhone
        };
        
        response = await axiosInstance.post("/api/appointments/book-guest", appointmentData);
      }
      
      console.log("Appointment booked:", response.data);
      alert("Appointment booked successfully!");
      
      // Call the success callback
      if (onBookAppointment) {
        onBookAppointment();
      }
      
      // Close the modal
      onClose();
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert(err.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Book an Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Information Section */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Patient Information</h3>
            
            <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                name="patientName"
                placeholder="Patient Full Name"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>

            {!isLoggedIn && (
              <>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300 mt-3">
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <input
                    type="email"
                    name="patientEmail"
                    placeholder="Patient Email Address"
                    value={formData.patientEmail}
                    onChange={handleChange}
                    className="w-full outline-none"
                    required
                  />
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300 mt-3">
                  <FaPhone className="text-gray-500 mr-3" />
                  <input
                    type="tel"
                    name="patientPhone"
                    placeholder="Patient Phone Number"
                    value={formData.patientPhone}
                    onChange={handleChange}
                    className="w-full outline-none"
                    required
                  />
                </div>
              </>
            )}
          </div>

          {/* Appointment Details Section */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Appointment Details</h3>
            
            <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300">
              <FaStethoscope className="text-gray-500 mr-3" />
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                required
              >
                <option value="" disabled>Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name} - {doctor.doctorType}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300 mt-3">
              <FaNotesMedical className="text-gray-500 mr-3" />
              <input
                type="text"
                name="disease"
                placeholder="Disease/Condition"
                value={formData.disease}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300 mt-3">
              <FaCalendarAlt className="text-gray-500 mr-3" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full outline-none"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300 mt-3">
              <FaClock className="text-gray-500 mr-3" />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300">
            <FaNotesMedical className="text-gray-500 mr-3" />
            <textarea
              name="notes"
              placeholder="Additional notes (optional)"
              value={formData.notes}
              onChange={handleChange}
              className="w-full outline-none resize-none"
              rows={2}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors duration-300"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentModal;