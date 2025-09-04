import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("api/auth/forgot-password", { email });
      alert(res.data.message || "Reset link sent to your email.");
      navigate("/signin");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-indigo-50 px-6">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Forgot Password</h2>
        <p className="text-gray-600 mb-4 text-center font-semibold">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md mb-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Remember your password?{" "}
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

export default ForgotPassword;
