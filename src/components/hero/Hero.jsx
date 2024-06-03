import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full h-screen px-5 lg:px-20">
      <div className="flex-1 text-center lg:text-left mt-10 lg:mt-0">
        <h1 className="text-4xl lg:text-6xl lg:w-2/3 font-bold text-white">
          Best{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Digital Gaming
          </span>{" "}
          Accessories
        </h1>
        <p className="text-base lg:text-lg text-white pt-3">
          Welcome to Gamely Marketplace! Explore a world of gaming delights with
          our wide range of game keys and accessories. Find your next gaming
          thrill here!
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-6">
          <button className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-10 rounded-tl-lg rounded-br-lg mt-2">
            Show Products
          </button>
          <button className="bg-transparent border border-gray-600 hover:bg-gray-200/10 text-white font-semibold py-3 px-10 rounded-tl-lg rounded-br-lg mt-2">
            Show Collections
          </button>
        </div>
      </div>
      <div className="flex-1 w-full lg:w-1/3 mt-10 lg:mt-40 pt-5">
        <Image src="/Hero.png" alt="Hero" className="w-full mx-auto lg:w-3/4 xl:w-2/3" width={900} height={800} />
      </div>
    </div>
  );
};

export default Hero;
