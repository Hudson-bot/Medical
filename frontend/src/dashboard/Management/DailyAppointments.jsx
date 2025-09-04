import React from 'react';
import { useParams } from 'react-router-dom';

const DailyAppointments = () => {
  const { date } = useParams(); // Get the date from the URL

  // Mock data for daily appointments
  const dailyAppointments = [
    { id: "00001", patient: "Andrew Loriean", doctor: "Dr. Jeremy Smith", time: "12:00 PM", disease: "Fever" },
    { id: "00002", patient: "Gabriel Loriean", doctor: "Dr. Angelina Ramos", time: "12:30 PM", disease: "Cold" },
    { id: "00003", patient: "Childa Gronda", doctor: "Dr. Nathan Jack", time: "1:00 PM", disease: "Flu" },
    { id: "00003", patient: "Childa Gronda", doctor: "Dr. Nathan Jack", time: "1:00 PM", disease: "Flu" },
    { id: "00003", patient: "Childa Gronda", doctor: "Dr. Nathan Jack", time: "1:00 PM", disease: "Flu" },
    { id: "00003", patient: "Childa Gronda", doctor: "Dr. Nathan Jack", time: "1:00 PM", disease: "Flu" },
    { id: "00003", patient: "Childa Gronda", doctor: "Dr. Nathan Jack", time: "1:00 PM", disease: "Flu" },
    { id: "00003", patient: "Childa Gronda", doctor: "Dr. Nathan Jack", time: "1:00 PM", disease: "Flu" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Appointments for {date}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Patient</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Doctor</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Time</th>
              <th className="p-3 text-left text-sm font-medium text-gray-600">Disease</th>
            </tr>
          </thead>
          <tbody>
            {dailyAppointments.map((appt) => (
              <tr key={appt.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3 text-sm text-gray-700">{appt.id}</td>
                <td className="p-3 text-sm text-gray-700">{appt.patient}</td>
                <td className="p-3 text-sm text-gray-700">{appt.doctor}</td>
                <td className="p-3 text-sm text-gray-700">{appt.time}</td>
                <td className="p-3 text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      appt.disease === "Fever"
                        ? "bg-red-100 text-red-800"
                        : appt.disease === "Cold"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {appt.disease}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyAppointments;