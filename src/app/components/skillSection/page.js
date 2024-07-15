// src/app/components/SkillSection.js

"use client";

import React from "react";
import Slider from "react-slick";

const skills = [
  { name: "React.js", icon: "/react.svg" },
  { name: "Next.js", icon: "/icon-nextjs.png" },
  { name: "Figma", icon: "/icon_figma.png" },
  { name: "TensorFlow", icon: "/icon-tensorflow.png" },
  { name: "Keras", icon: "/icon-keras.png" },
  // Tambahkan lebih banyak skill sesuai kebutuhan
];

const SkillSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="skills" className="py-16 bg-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8 text-center">
          Skills
        </h2>
        <Slider {...settings}>
          {skills.map((skill, index) => (
            <div key={index} className="p-2">
              <div className="bg-white rounded-full p-2 shadow-md flex items-center justify-center">
                <img src={skill.icon} alt={skill.name} className="h-16 w-16" />
              </div>
              <p className="text-center mt-2 text-gray-700 text-sm">
                {skill.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SkillSection;
