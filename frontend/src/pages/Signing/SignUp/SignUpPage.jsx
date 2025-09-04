import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple, AiFillFacebook } from "react-icons/ai";
import axiosInstance from "../../../axiosConfig";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Patient", // Changed default role to Patient
    doctorType: "", // Add doctorType field
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");

    // Validate inputs
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      setError("All fields are required");
      return;
    }

    // Validate doctorType if role is Doctor
    if (formData.role === "Doctor" && !formData.doctorType) {
      setError("Doctor specialization is required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axiosInstance.post("api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        doctorType: formData.doctorType, // Include doctorType in the request
      });
      alert(res.data.message);
      navigate("/signin");
    } catch (error) {
      console.log("Detailed error:", error); // Add this line
      setError(
        error.response?.data?.message || "Failed to create account. Please try again."
      );
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-indigo-50 px-6">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg w-full max-w-md mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Sign Up</h2>
        <p className="text-gray-600 mb-4 text-center font-semibold">Create a new account</p>

        {/* Input Fields */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md mb-3"
        />
        
        {/* Role Selection */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md mb-3"
        >
          <option value="">Select Role</option>
          <option value="Management">Management</option>
        </select>
        
        {/* Doctor Specialization Field (Conditional) */}
        {formData.role === "Doctor" && (
          <input
            type="text"
            name="doctorType"
            placeholder="Doctor Specialization (e.g., Cardiology, Neurology)"
            value={formData.doctorType}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md mb-3"
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md mb-3"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md mb-3"
        />

        {error && (
          <div className="text-red-500 text-sm mb-3 text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-900 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
        >
          Sign Up
        </button>

        <div className="text-center mt-4 text-gray-500">— Or Sign up with —</div>

        {/* Social Sign Up */}
        <div className="flex justify-center gap-4 mt-3">
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition">
            <FcGoogle size={24} />
          </button>
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition">
            <AiFillApple size={24} />
          </button>
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition">
            <AiFillFacebook size={24} className="text-blue-600" />
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;