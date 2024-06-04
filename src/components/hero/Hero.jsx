import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full h-screen px-5 lg:px-20 gap-10">
      <div className="flex-1 text-center lg:text-left  mb-40 ">
        <h1 className="text-4xl lg:text-7xl py-4 w-full font-bold text-white">
          Best{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Digital Gaming
          </span>{" "}
          Accessories
        </h1>
        <p className="text-base lg:text-lg text-white py-4">
          Welcome to Gamely Marketplace! Explore a world of gaming delights with
          our wide range of game keys and accessories. Find your next gaming
          thrill here!
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-6">
          <Link href="/shop" className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-10 rounded-tl-lg rounded-br-lg mt-2">
            Visit Shop
          </Link>
          <Link href="/products" className="bg-transparent border border-gray-600 hover:bg-gray-200/10 text-white font-semibold py-3 px-10 rounded-tl-lg rounded-br-lg mt-2">
          Visit Marketplace
          </Link>
        </div>
      </div>
      <div className="flex-1 w-full lg:w-1/3 mt-10 lg:mt-10 pt-5">
        <Image src="/Hero.png" alt="Hero" className="w-full mx-auto lg:w-3/4 xl:w-2/3" width={900} height={800} />
      </div>
    </div>
  );
};

export default Hero;
