import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple, AiFillFacebook } from "react-icons/ai";
import axiosInstance from "../../../axiosConfig";

const SigninPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/api/auth/signin", {
        ...formData
      });

      if (response.data && response.data.token) {
        // Store user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("userName", response.data.name || formData.email.split('@')[0]);
        localStorage.setItem("patientInfoCompleted", response.data.patientInfoCompleted || false);
        
        // Dispatch custom event to notify Header component
        window.dispatchEvent(new CustomEvent("userLogin"));
        
        // Define route mapping based on user's actual role from backend
        const dashboardRoutes = {
          Patient: response.data.patientInfoCompleted ? "/patient-dashboard" : "/patient-info",
          Doctor: "/doctor-dashboard",
          Management: "/management-dashboard"
        };

        const userRole = response.data.role;
        
        if (!userRole) {
          setError("User role not found. Please contact support.");
          return;
        }

        const targetRoute = dashboardRoutes[userRole];

        if (!targetRoute) {
          setError(`Invalid role configuration: ${userRole}`);
          return;
        }

        // Navigate to appropriate dashboard
        navigate(targetRoute, { replace: true });
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Add Google login logic here
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
    // Add Apple login logic here
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // Add Facebook login logic here
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-indigo-50 px-6">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">User Login</h2>
        <p className="text-gray-600 mb-4 font-semibold text-center">Enter your details to sign in</p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email / Phone No"
            className="w-full border border-gray-300 p-3 rounded-md mb-3"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Passcode"
            className="w-full border border-gray-300 p-3 rounded-md mb-3"
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-900 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
          >
            Sign in
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-3">
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </div>

        <div className="text-center mt-4 text-gray-500">— Or Sign in with —</div>

        {/* Social Login */}
        <div className="flex justify-center gap-4 mt-3">
          <button 
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            <FcGoogle size={24} /> 
          </button>
          <button 
            onClick={handleAppleLogin}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            <AiFillApple size={24} /> 
          </button>
          <button 
            onClick={handleFacebookLogin}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            <AiFillFacebook size={24} className="text-blue-600" /> 
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Request Now
          </span>
        </p>
      </div>
    </section>
  );
};

export default SigninPage;