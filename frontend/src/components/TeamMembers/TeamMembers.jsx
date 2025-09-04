import { User } from 'lucide-react';
import React from 'react';

const teamMembers = [
  {
    id: 1,
    name: "Dr. Ashutosh",
    specialty: "Infectious Disease",
    image: "/images/doc1.jpg", // Replace with actual images
  },
  {
    id: 2,
    name: "Dr. Ayush",
    specialty: "Infectious Disease",
    image: "/images/doc3.jpg",
  },
  {
    id: 3,
    name: "Dr. Ashish",
    specialty: "Infectious Disease",
    image: "/images/doc2.jpg",
  },
  {
    id: 4,
    name: "Dr. Recant",
    specialty: "Infectious Disease",
    image: "/images/doc4.jpg",
  },
];

const TeamMembers = () => {
  return (
    <section className="py-16 bg-gradient-to-br bg-white text-center rounded-3xl">
      <div className="mb-10">
        <div className="flex items-center justify-center text-indigo-600">
          <User className="w-6 h-6" />
          <span className="ml-2 text-sm font-semibold">Team Members</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
          Compassionate experts you can trust
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Our team brings together a wealth of experience, passion, and a
          dedication to excellence in patient care.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover"
            />
            <div className="bg-indigo-600 text-white py-4">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm">{member.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamMembers;