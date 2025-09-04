// components/RegistrationModal.js
import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";

const RegistrationModal = ({ isOpen, onClose, role }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: role,
    doctorType: "" // New field for doctor type
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Doctor specializations
  const doctorSpecializations = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Orthopedic",
    "Gynecologist",
    "Psychiatrist",
    "Dentist",
    "Ophthalmologist",
    "General Physician"
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate inputs
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    // If registering a doctor, validate doctor type
    if (role === "Doctor" && !formData.doctorType) {
      setError("Please select a doctor specialization");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        doctorType: formData.doctorType // Send doctor type to backend
      });
      alert(res.data.message);
      onClose();
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: role,
        doctorType: ""
      });
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Register New {role}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md mb-3"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md mb-3"
            required
          />
          
          {/* Doctor Type Selection (only shown for Doctor role) */}
          {role === "Doctor" && (
            <select
              name="doctorType"
              value={formData.doctorType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md mb-3"
              required
            >
              <option value="">Select Specialization</option>
              {doctorSpecializations.map((specialization, index) => (
                <option key={index} value={specialization}>
                  {specialization}
                </option>
              ))}
            </select>
          )}
          
          <div className="w-full border border-gray-300 p-3 rounded-md mb-3 bg-gray-100">
            <span className="text-gray-700">{role}</span>
            <input
              type="hidden"
              name="role"
              value={role}
            />
          </div>
          
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md mb-3"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md mb-3"
            required
          />

          {error && (
            <div className="text-red-500 text-sm mb-3 text-center">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-400 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-900 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : `Register ${role}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;