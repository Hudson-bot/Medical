import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    
    if (token && userName) {
      setIsLoggedIn(true);
      setUserName(userName);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  useEffect(() => {
    // Check login status on component mount
    checkLoginStatus();
    
    // Listen for storage changes (when user logs in/out from another tab)
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "userName") {
        checkLoginStatus();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // Listen for custom login events
    const handleLoginEvent = () => {
      checkLoginStatus();
    };
    
    window.addEventListener("userLogin", handleLoginEvent);
    window.addEventListener("userLogout", handleLoginEvent);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLogin", handleLoginEvent);
      window.removeEventListener("userLogout", handleLoginEvent);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    // Clear all authentication-related data from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("patientInfoCompleted");
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("userLogout"));
    
    // Reset state
    setIsLoggedIn(false);
    setUserName("");
    setIsDropdownOpen(false);
    
    // Redirect to home page
    navigate("/");
  };

  const getUserInitial = () => {
    if (!userName) return "U";
    return userName.charAt(0).toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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

          {/* Mobile Login/Logout Button */}
          {isLoggedIn ? (
            <div className="block lg:hidden mt-4">
              <div className="flex items-center mb-2">
                <span className="text-indigo-900 font-medium">Hello, {userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-indigo-900 hover:text-indigo-700 font-medium py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              className="block lg:hidden bg-indigo-900 text-white px-6 py-2 hover:bg-indigo-700 rounded-full mt-4 transition-colors duration-300"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </nav>

        {/* Desktop Login/User Profile */}
        <div className="hidden lg:block relative user-dropdown">
          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors duration-300"
              >
                {getUserInitial()}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm text-gray-700">Hello, {userName}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="bg-indigo-900 text-white px-6 py-2 hover:bg-indigo-700 rounded-full transition-colors duration-300"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;