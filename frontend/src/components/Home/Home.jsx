import React from "react";
import { FaUserMd } from "react-icons/fa";
import AboutUs from "../About Us/AboutUs";
import Services from "../Services/Services";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import HowWeWork from "../HowWeWork/HowWeWork";
import OurNumbers from "../OurNumbers/OurNumbers";
import FrequentlyAsked from "../FrequentlyAsked/FrequentlyAsked";
import Footer from "../Footer/Footer";
import TeamMembers from "../TeamMembers/TeamMembers";
import Testimonials from "../Testimonials/Testimonials";
import { Link, useNavigate } from "react-router-dom";

  
const Home = () => {
  const navigate = useNavigate();
  const handleSignIn = (role) => {
    navigate(`/signin?role=${role}`); // Navigate to the SigninPage with role as a query parameter
  };

  const handleSignIn1 = () => {
    navigate(`/aboutus1`); // Navigate to the SigninPage with role as a query parameter
  };
  return (
    <div className="mt-16 overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="w-full h-screen overflow-hidden flex flex-col lg:flex-row items-center justify-between bg-cover bg-no-repeat bg-center px-4 sm:px-6 lg:px-16 xl:px-32 rounded-sm"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      >
        {/* Left Section */}
        <div className="max-w-lg text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-indigo-600 font-semibold">
            <FaUserMd className="text-xl" />
            <span>Your Health Our Priority</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mt-4">
            Expert medical care you can rely on.
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mt-4">
            Experience healthcare you can trust. Our dedicated team provides
            compassionate, high-quality care.
          </p>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start mt-6 gap-4">
            <button 
            onClick={() => handleSignIn("Patient")}
            className="bg-blue-900 text-white px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-3 text-sm sm:text-base lg:text-lg font-medium rounded-full hover:bg-blue-800 transition-colors duration-300">
              Book an Appointment
            </button>
            <Link
             to={"/aboutUspage"}
             className="bg-blue-900 text-white px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-3 text-sm sm:text-base lg:text-lg font-medium rounded-full hover:bg-blue-800 transition-colors duration-300">
              About Us
            </Link>
          </div>

          {/* Line break */}
          <hr className="border-gray-300 border-t-4 mt-8" />

          {/* Rating Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 mt-8 text-gray-700 text-base sm:text-lg font-medium">
            <span>• Google Rating</span>
            <span className="text-yellow-500 font-bold">5.0 ⭐⭐⭐⭐⭐</span>
            <span>• Based on 500 Reviews</span>
          </div>
        </div>

        {/* Doctor Badge */}
        <div className="lg:absolute lg:bottom-80 lg:right-1/3 mt-8 lg:mt-0 bg-white shadow-lg px-5 py-3 rounded-lg flex flex-col items-center max-w-full">
          <div className="flex -space-x-2">
            <img src="/images/doc1.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Doctor 1" />
            <img src="/images/doc2.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Doctor 2" />
            <img src="/images/doc3.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Doctor 3" />
            <img src="/images/doc4.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Doctor 4" />
          </div>
          <hr className="w-full border-gray-300 my-2" />
          <span className="text-gray-800 text-sm font-medium">
            Talk to our 48+ Doctors
          </span>
        </div>

        {/* Satisfied Clients Badge */}
        <div className="lg:absolute lg:bottom-28 lg:right-32 mt-8 lg:mt-0 bg-white shadow-lg px-5 py-3 rounded-lg flex items-center gap-3 max-w-full">
          <div className="bg-indigo-600 text-white p-2 rounded-full">
            <FaUserMd className="text-lg" />
          </div>
          <div>
            <span className="text-gray-800 text-lg font-semibold">3500+</span>
            <p className="text-gray-600 text-sm">Satisfied Clients</p>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <AboutUs />
      <Services />
      <WhyChooseUs />
      <HowWeWork />
      <OurNumbers />
      <FrequentlyAsked />
      <TeamMembers />
      <Testimonials />
    </div>
  );
};

export default Home;