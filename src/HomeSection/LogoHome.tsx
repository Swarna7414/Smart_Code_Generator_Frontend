import React from 'react';
import '../Styles/Home.css';
import logo from '../assets/LogoImage.png';

const LogoHome: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 md:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-16">
        <div className="w-full max-w-4xl text-center md:text-left order-2 md:order-1 md:pt-0">
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-medium mb-0">
            Welcome to
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.15] pb-2 hero-gradient-text -mt-1">
            <span className="block">Perception</span>
            <span className="block mt-0 whitespace-nowrap">Intelligence Lab</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
            Perception Intelligence Lab was founded by Prof. Debesh Jha in May 2026, located at the Department of Computer Science, University of South Dakota, Vermillion, SD.
          </p>
          <a
            href="#discover"
            className="inline-block mt-6 md:mt-8 px-8 py-3.5 text-base font-semibold text-white rounded-lg bg-[#0ed6e8] hover:opacity-90 transition-opacity duration-200 shadow-md hover:shadow-lg"
          >
            Discover more
          </a>
        </div>
        <div className="flex-1 flex justify-center md:justify-end order-1 md:order-2 w-full md:w-auto">
          <img
            src={logo}
            alt="Perception Intelligence Lab"
            className="w-[75vw] max-w-xs sm:max-w-sm md:w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl h-auto object-contain md:scale-125 md:origin-center"
          />
        </div>
      </div>
    </section>
  );
};

export default LogoHome;