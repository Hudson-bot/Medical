import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomeBanner from "./WelcomeBanner";
import StatsCards from "./StatsCards";
import ChartsSection from "./ChartsSection";
import DepartmentsList from "./DepartmentsList";
import AppointmentsTable from "./AppointmentsTable";
import TodaySchedule from "../Doctor/TodaySchdule";

const DashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-indigo-50 min-h-screen p-6">
     
      {/* Main Content Container */}
      <main className="container mx-auto">
        <WelcomeBanner />
        <StatsCards 
          onShowDoctors={() => navigate('/management/doctors')} 
          onShowPatients={() => navigate('/management/patients')} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <ChartsSection />
          <DepartmentsList />
          <TodaySchedule />
        </div>

        <div className="grid grid-cols-1  mt-6">
          <AppointmentsTable />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;