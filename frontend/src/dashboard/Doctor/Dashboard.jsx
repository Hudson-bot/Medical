import React, { useState, useEffect } from "react";
import StatsCards from "./StatsCards";
import UpcomingAppointments from "./UpcomingAppointments";
import WeeklyOverview from "./WeeklyOverview";
import TodaySchedule from "./TodaySchdule";
import axiosInstance from "../../axiosConfig"; 

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Get the date
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = today.toLocaleDateString("en-US", { month: "long" });
  const date = today.getDate();
  const year = today.getFullYear();

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 mt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 mt-16 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-16 ">
      {/* Modernized Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg p-6 rounded-lg flex items-center justify-between transform transition-all ">
        <h2 className="text-3xl font-bold text-white">
          Hello Dr, {userData?.name || "Doctor"}
          {userData?.doctorType && ` (${userData.doctorType})`}
        </h2>
        <p className="text-white text-opacity-90 text-lg">
          {dayName}, {date} {monthName} {year}
        </p>
      </div>

      {/* Stats and Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <StatsCards />
        <UpcomingAppointments />
      </div>

      {/* Charts and Invoices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <WeeklyOverview />
        <TodaySchedule />
      </div>
    </div>
  );
};

export default Dashboard;