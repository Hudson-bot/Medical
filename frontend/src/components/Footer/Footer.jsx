import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold">LOGO</h2>
          <p className="text-gray-300 mt-4">
            We offer a wide range of healthcare services to meet your needs.
          </p>
        </div>

        {/* Healthcare Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Healthcare</h3>
          <ul className="text-gray-300 space-y-2">
            <li className="hover:text-white transition-colors duration-300">• Doctors</li>
            <li className="hover:text-white transition-colors duration-300">• Diagnostics</li>
            <li className="hover:text-white transition-colors duration-300">• Caregiver</li>
            <li className="hover:text-white transition-colors duration-300">• Hospitality</li>
            <li className="hover:text-white transition-colors duration-300">• Emergency</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-300 space-y-2">
            <li><Link to='/home' className="hover:text-white transition-colors duration-300">• Home</Link></li>
            <li><Link to='/aboutUspage' className="hover:text-white transition-colors duration-300">• About Us</Link></li>
            <li><Link to='/allServices'className="hover:text-white transition-colors duration-300">• Services</Link></li>
            <li><Link to='/blog'className="hover:text-white transition-colors duration-300">• Blogs</Link></li>
            <li><Link to='/contactUs'className="hover:text-white transition-colors duration-300">• Contact US</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-400" />
              <span className="text-gray-300 hover:text-white transition-colors duration-300">yourmail@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-indigo-400" />
              <span className="text-gray-300 hover:text-white transition-colors duration-300">+1 (213) 465 789</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-400" />
              <span className="text-gray-300 hover:text-white transition-colors duration-300">Delhi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
        <p>Copyright © 2024 All Rights Reserved.</p>
        {/* Social Media Icons */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors duration-300" />
          <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors duration-300" />
          <Send className="w-5 h-5 cursor-pointer hover:text-white transition-colors duration-300" />
        </div>
        {/* Policies */}
        <div className="mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors duration-300">
            Privacy Policy
          </a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-white transition-colors duration-300">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;