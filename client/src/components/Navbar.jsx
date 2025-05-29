import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-800 to-green-300 text-white border-b border-green-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-pink-400 transition-colors"
            >
              Smooth IT
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/About"
              className="hover:text-pink-400 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/Contact"
              className="hover:text-pink-400 transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              to="/employee"
              className="hover:text-pink-400 transition-colors duration-200"
            >
              Employee login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
