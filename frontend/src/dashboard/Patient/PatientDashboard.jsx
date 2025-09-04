import React, { useState } from "react";
import Header from "./Header";
import PatientInfo from "./PatientInfo";
import HeartRate from "./HeartRate";
import BloodPressure from "./BloodPressure";
import Haemoglobin from "./Haemoglobin";
import BookAppointment from "./BookAppointment";
import PreviousAppointments from "./PreviousAppointments";
import MedicineStore from "./MedicineStore";
import UpcomingAppointments from "./UpcomingAppointments";
import AIChat from "./AIChat"; // ✅ Import AI Chat

const PatientDashboard = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <div className="min-h-screen bg-indigo-50 p-6 space-y-6 mt-16 relative">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-4">
          <PatientInfo />
          <MedicineStore />
        </div>

        <div className="space-y-4">
          <Haemoglobin/>
          <BloodPressure/>
        </div>

        <div className="space-y-4">
          <HeartRate/>
          <BookAppointment onBookAppointment={() => setShowDialog(true)} />
        </div>

        <div className="space-y-4">
          <PreviousAppointments />
          <UpcomingAppointments />
        </div>
      </div>

      {/* Floating AI button */}
      <button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        🤖
      </button>

      {/* AI Chat Component */}
      <AIChat showAIChat={showAIChat} setShowAIChat={setShowAIChat} />
    </div>
  );
};

export default PatientDashboard;
