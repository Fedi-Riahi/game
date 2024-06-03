import Link from "next/link";
import React from "react";

const Intro = () => {
  return (
    <div className="bg-black px-5 py-10 md:px-40">
      <div className="max-w-screen-xl mx-auto">
        <Link href="/" className="text-white mb-5 block">
          Back to home
        </Link>
        <h1 className="text-4xl md:text-6xl font-bold text-white mt-10 md:w-2/3">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Digital Gaming
          </span>
        </h1>
        <p className="text-white mt-4 md:w-1/2">
          Welcome to Gamely Marketplace! Explore a world of gaming delights
          with our wide range of game keys and accessories. Find your next
          gaming thrill here!
        </p>
      </div>
    </div>
  );
};

export default Intro;
