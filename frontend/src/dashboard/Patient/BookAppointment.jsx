import React, { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaClock, FaNotesMedical, FaStethoscope } from "react-icons/fa";
import axiosInstance from "../../axiosConfig"; // Adjust path as needed

const BookAppointment = ({ onBookAppointment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: "",
    disease: "",
    date: "",
    time: "",
    notes: "",
    patientName: ""
  });

  // Fetch doctors from backend
  useEffect(() => {
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
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post("/api/appointments/book", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Appointment booked:", response.data);
      alert("Appointment booked successfully!");
      setIsOpen(false);
      setFormData({ doctorId: "", disease: "", date: "", time: "", notes: "", patientName: "" });
      
      // Refresh appointments if callback provided
      if (onBookAppointment) {
        onBookAppointment();
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert(err.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
      <div className="flex flex-col items-center space-y-4">
        <button
          className="h-14 w-48 text-sm bg-blue-900 hover:bg-blue-800 text-white rounded-3xl transition-colors duration-300"
          onClick={() => setIsOpen(true)}
        >
          Book an Appointment
        </button>
        <img src="/images/bp.png" alt="Blood Pressure" className="w-40 h-40 object-contain" />

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Book an Appointment</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300">
                  <FaUser className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={formData.patientName}
                    onChange={handleChange}
                    className="w-full outline-none"
                    required
                  />
                </div>
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
                <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300">
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
                <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300">
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
                <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors duration-300">
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
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Booking..." : "Confirm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;