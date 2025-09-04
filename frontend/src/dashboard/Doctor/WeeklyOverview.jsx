import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", appointments: 10 },
  { day: "Tue", appointments: 25 },
  { day: "Wed", appointments: 30 },
  { day: "Thu", appointments: 20 },
  { day: "Fri", appointments: 35 },
];

const WeeklyOverview = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Weekly Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="day"
            axisLine={{ stroke: "#4A90E2" }}
            tick={{ fill: "#4A90E2" }}
          />
          <YAxis
            axisLine={{ stroke: "#4A90E2" }}
            tick={{ fill: "#4A90E2" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #4A90E2",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar
            dataKey="appointments"
            fill="#4A90E2"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyOverview;