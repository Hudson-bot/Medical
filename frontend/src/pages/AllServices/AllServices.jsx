import React from "react";
import { FaBrain, FaEye, FaProcedures, FaHeart, FaTooth, FaStethoscope, FaBone, FaBaby, FaAllergies, FaLungs, FaSyringe, FaUserMd, FaMicroscope, FaPills } from "react-icons/fa";
import { Link } from "react-router-dom";

const allServices = [
  {
    id: "urology",
    title: "Urology",
    icon: <FaProcedures className="text-2xl text-indigo-600" />,
    description:
      "Our urology department provides expert care for conditions affecting the urinary tract and reproductive system.",
    image: "/images/Urology.jpg",
  },
  {
    id: "neurology",
    title: "Neurology",
    icon: <FaBrain className="text-2xl text-indigo-600" />,
    description:
      "Our neurology department provides expert care for conditions affecting the brain, spine, and nervous system.",
    image: "/images/Neurology.jpg",
  },
  {
    id: "eye-care",
    title: "Eye Care",
    icon: <FaEye className="text-2xl text-indigo-600" />,
    description:
      "Our eye care department provides expert treatment for vision-related issues and eye diseases.",
    image: "/images/eye.jpg",
  },
  {
    id: "cardiology",
    title: "Cardiology",
    icon: <FaHeart className="text-2xl text-indigo-600" />,
    description:
      "Our cardiology department specializes in diagnosing and treating heart-related conditions.",
    image: "/images/cardiology.jpg",
  },
  {
    id: "dentistry",
    title: "Dentistry",
    icon: <FaTooth className="text-2xl text-indigo-600" />,
    description:
      "Our dentistry department provides comprehensive oral health care, from routine check-ups to advanced procedures.",
    image: "/images/dentistry.jpg",
  },
  {
    id: "general-medicine",
    title: "General Medicine",
    icon: <FaStethoscope className="text-2xl text-indigo-600" />,
    description:
      "Our general medicine department offers primary care for a wide range of health conditions.",
    image: "/images/general-medicine.jpeg",
  },
  {
    id: "orthopedics",
    title: "Orthopedics",
    icon: <FaBone className="text-2xl text-indigo-600" />,
    description:
      "Our orthopedics department specializes in treating musculoskeletal conditions and injuries.",
    image: "/images/orthopedics.jpg",
  },
  {
    id: "pediatrics",
    title: "Pediatrics",
    icon: <FaBaby className="text-2xl text-indigo-600" />,
    description:
      "Our pediatrics department provides specialized care for infants, children, and adolescents.",
    image: "/images/pediatrics.jpeg",
  },
  {
    id: "allergy-immunology",
    title: "Allergy & Immunology",
    icon: <FaAllergies className="text-2xl text-indigo-600" />,
    description:
      "Our allergy and immunology department diagnoses and treats allergies and immune system disorders.",
    image: "/images/allergy.jpeg",
  },
  {
    title: "Pulmonology",
    icon: <FaLungs className="text-2xl text-indigo-600" />,
    description:
      "Our pulmonology department specializes in treating respiratory conditions and lung diseases.",
    image: "/images/pulmonology.jpg",
  },
  {
    id: "oncology",
    title: "Oncology",
    icon: <FaSyringe className="text-2xl text-indigo-600" />,
    description:
      "Our oncology department provides advanced care for cancer patients, including chemotherapy and radiation therapy.",
    image: "/images/oncology.jpg",
  },
  {
    id: "dermatology",
    title: "Dermatology",
    icon: <FaUserMd className="text-2xl text-indigo-600" />,
    description:
      "Our dermatology department treats skin conditions, from acne to skin cancer.",
    image: "/images/dermatology.jpeg",
  },
  {
    id: "pathology",
    title: "Pathology",
    icon: <FaMicroscope className="text-2xl text-indigo-600" />,
    description:
      "Our pathology department provides diagnostic services, including lab tests and tissue analysis.",
    image: "/images/pathology.jpg",
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    icon: <FaPills className="text-2xl text-indigo-600" />,
    description:
      "Our pharmacy department ensures safe and effective medication management for all patients.",
    image: "/images/pharmacy.jpg",
  },
];

const AllServices = () => {
  return (
    <section className="mt-5 w-full bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-6 md:px-12 lg:px-24 text-center rounded-3xl">
    {/* Header Section */}
    <div className="mb-10">
      <h3 className="text-indigo-600 text-lg font-semibold flex items-center justify-center gap-2">
        <span role="img" aria-label="stethoscope">🩺</span> All Services
      </h3>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 leading-snug">
        Explore Our Comprehensive Services
      </h2>
    </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allServices.map((service) => (
          <Link
            key={service.id}
            to={`/services/${service.id}`}
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
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllServices;