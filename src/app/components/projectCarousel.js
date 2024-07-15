"use client";
// src/app/components/ProjectCarousel.js

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectCarousel = () => {
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
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const projects = [
    {
      title: "Netlify (website) - Binar Academy",
      imageUrl: "/flyTicket.png",
      link: "https://flyticket.netlify.app/",
      description:
        "Website to booking fly tickets. Capstone from Binar Academy MSIB Batch 4.",
    },
    {
      title: "E-commerce Analyst Data Dashboard - Dicoding",
      imageUrl: "/e-commerce.png",
      description:
        "Dashboard used python to get ay insight from sample data e-commerce. Deploy use streamlit.",
      link: "https://data-ecommerce.streamlit.app/",
    },
    {
      title: "Caraka Mobile (android) - Bangkit Academy MSIB Batch 6",
      imageUrl: "/carakaMobile.jpg",
      description:
        "Android app to educate any elemtary level students to understanding about javanese script. Model build use tensorflow lite and keras.",
      link: "https://mega.nz/file/df9TCIaK#GVV4GWSJ_eYaaQoMvO4VDJson6ALVY7hygZsVQZef1Y",
    },
    {
      title: "stock management (vba excel) - Bantarsari Health Center",
      imageUrl: "/vba-stock.png",
      description: "Description for project 4.",
      link: "https://docs.google.com/spreadsheets/d/1gg4H02IjGb1D9wStSXTSn1rb4x6WV9GG/edit?usp=sharing&ouid=103583580848086143171&rtpof=true&sd=true",
    },
    {
      title: "letters management (vba excel) - Bantarsari Health Center",
      imageUrl: "/vba-letter.png",
      description: "Description for project 5.",
      link: "https://docs.google.com/spreadsheets/d/13y6N0kSHGIqXUFyAdYU2-OXcvYysZWw1/edit?usp=sharing&ouid=103583580848086143171&rtpof=true&sd=true",
    },
  ];

  const handleClick = (link) => {
    window.open(link, "_blank"); // Opens link in a new tab
  };

  return (
    <Slider {...settings}>
      {projects.map((project, index) => (
        <div key={index} className="p-4">
          <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
              <div className="w-full h-72 bg-gray-200 py-12">
                <image src={project.imageUrl} alt="ui/ux review check" />
              </div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
              <button
                className="absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></span>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900 h-12">
                  {project.title}
                </h5>
              </div>
              <div className="flex items-center justify-between">
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700 h-12">
                  {project.description}
                </p>
              </div>
            </div>
            <div className="p-6 pt-3">
              <button
                className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => handleClick(project.link)}
              >
                Go to Link
              </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProjectCarousel;
