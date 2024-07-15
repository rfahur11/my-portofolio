// src/app/components/ContactSection.js

"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const contactDetails = [
  {
    type: "Phone",
    value: "+62895380146029",
    icon: faPhone,
  },
  {
    type: "Email",
    value: "rfahrur6045@gmail.com",
    icon: faEnvelope,
  },
  {
    type: "LinkedIn",
    value: "https://www.linkedin.com/in/fahrur-rozi-336b04164/",
    href: "https://www.linkedin.com/in/fahrur-rozi-336b04164/",
    icon: faLinkedin,
  },
  {
    type: "GitHub",
    value: "https://github.com/rfahur11",
    href: "https://github.com/rfahur11",
    icon: faGithub,
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-gray-100 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
          Contact
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Feel free to reach out to me via any of the following methods:
        </p>
        <div className="flex flex-wrap justify-center space-x-8">
          {contactDetails.map((contact, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <FontAwesomeIcon
                icon={contact.icon}
                size="2x"
                className="text-gray-700"
              />
              <h3 className="text-xl font-bold text-gray-900">
                {contact.type}
              </h3>
              <a href={contact.href} className="text-blue-500 hover:underline">
                {contact.value}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
