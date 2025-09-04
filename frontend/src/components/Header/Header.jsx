import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = () => {
    navigate("/signin");
  };

  return (
    <header className="bg-gradient-to-br from-blue-50 to-purple-50 w-screen fixed top-0 left-0 z-50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-indigo-900">
          MyLogo
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-indigo-900 focus:outline-none">
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-8 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 shadow-lg lg:shadow-none rounded-lg lg:rounded-none`}
        >
          <Link to="/" className="block lg:inline text-indigo-900 hover:text-indigo-700 font-medium py-2 lg:py-0 transition-colors duration-300">
            Home
          </Link>
          <Link to="/aboutUsPage" className="block lg:inline text-indigo-900 hover:text-indigo-700 font-medium py-2 lg:py-0 transition-colors duration-300">
            About Us
          </Link>
          <Link to="/allservices" className="block lg:inline text-indigo-900 hover:text-indigo-700 font-medium py-2 lg:py-0 transition-colors duration-300">
            Services
          </Link>
          <Link to="/blog" className="block lg:inline text-indigo-900 hover:text-indigo-700 font-medium py-2 lg:py-0 transition-colors duration-300">
            Blog
          </Link>
          <Link to="/contactUs" className="block lg:inline text-indigo-900 hover:text-indigo-700 font-medium py-2 lg:py-0 transition-colors duration-300">
            Contact Us
          </Link>

          {/* Book Appointment Button (Visible in Menu Bar on Small Screens) */}
          <button className="block lg:hidden bg-indigo-900 text-white px-6 py-2 hover:bg-indigo-700 rounded-full mt-4 transition-colors duration-300"
          onClick={handleSubmit}>
           Login
          </button>
        </nav>

        {/* Call-to-Action Button (Visible on Larger Screens) */}
        <button className="hidden lg:block bg-indigo-900 text-white px-6 py-2 hover:bg-indigo-700 rounded-full transition-colors duration-300"
        onClick={handleSubmit}>
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;