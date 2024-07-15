// src/app/components/Navbar.js

"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#0E2E0B] p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">My Portfolio</div>
        <div className="hidden md:flex space-x-4">
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
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
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
