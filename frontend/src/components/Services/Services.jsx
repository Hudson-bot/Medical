import React from "react";
import { FaBrain, FaEye, FaProcedures } from "react-icons/fa";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Urology",
    icon: <FaProcedures className="text-2xl text-indigo-600" />,
    description:
      "Our urology department provides expert care for conditions affecting the urinary tract and reproductive system.",
    image: "/images/Urology.jpg",
  },
  {
    title: "Neurology",
    icon: <FaBrain className="text-2xl text-indigo-600" />,
    description:
      "Our neurology department provides expert care for conditions affecting the brain, spine, and nervous system.",
    image: "/images/Neurology.jpg",
  },
  {
    title: "Eye Care",
    icon: <FaEye className="text-2xl text-indigo-600" />,
    description:
      "Our eye care department provides expert treatment for vision-related issues and eye diseases.",
    image: "/images/eye.jpg",
  },
];

const Services = () => {
  return (
    <section className="mt-9 w-full bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-6 md:px-12 lg:px-24 text-center rounded-3xl">
      {/* Header Section */}
      <div className="mb-10">
        <h3 className="text-indigo-600 text-lg font-semibold flex items-center justify-center gap-2">
          <span role="img" aria-label="stethoscope">🩺</span> Our Services
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 leading-snug">
          Comprehensive services for <br className="hidden md:block"/> your health
        </h2>
      </div>

      {/* Services Card Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow-lg flex flex-col gap-4 transition duration-300 transform hover:scale-105 min-h-96 hover:shadow-2xl"
          >
            {/* Service Title & Icon */}
            <div className="flex items-center gap-2 text-lg font-semibold">
              <div className="bg-indigo-100 p-3 rounded-full flex items-center justify-center">
                {service.icon}
              </div>
              <span>{service.title}</span>
              <button className="ml-auto text-indigo-900 text-xl hover:text-indigo-800">→</button>
            </div>

            {/* Service Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.description}
            </p>

            {/* Service Image */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-gray-700">
        <p className="text-lg leading-relaxed font-semibold">
          From preventive care to specialized treatments, <br/>our wide range of services <br/>
          is designed to support your health at every stage.
        </p>
        <Link
          to="/allSgervices"
          className="mt-5 bg-indigo-900 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-800 transition-colors duration-300 inline-block"
        >
          View All Services
        </Link>
      </div>
    </section>
  );
};

export default Services;