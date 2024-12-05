// src/app/components/Navbar.js

"use client";

import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#0E2E0B] p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">My Portfolio</div>

        {/* Menu links for large screens */}
        <div className="flex max-md:hidden space-x-6">
          <a href="#projects" className="text-white hover:text-gray-300">
            Projects
          </a>
          <a href="#experience" className="text-white hover:text-gray-300">
            Experience
          </a>
          <a href="#skills" className="text-white hover:text-gray-300">
            Skills
          </a>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact
          </a>
        </div>

        {/* Hamburger Menu for small screens */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Dropdown menu for small screens */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 bg-[#0E2E0B] rounded shadow-md">
          <a
            href="#projects"
            className="block text-white py-2 px-4 hover:bg-gray-700"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="block text-white py-2 px-4 hover:bg-gray-700"
          >
            Experience
          </a>
          <a
            href="#skills"
            className="block text-white py-2 px-4 hover:bg-gray-700"
          >
            Skills
          </a>
          <a
            href="#contact"
            className="block text-white py-2 px-4 hover:bg-gray-700"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
