"use client";
import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription here, e.g., send email to backend
    console.log("Subscribed with email:", email);
    // Reset email input after submission
    setEmail("");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-white py-10 lg:py-20 px-5 lg:px-20">
      <div className="flex-1 lg:mr-8 mb-10 lg:mb-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 my-5">
            Subscribe to our newsletter and{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              get -20% off
            </span>
          </h1>
          <p className="text-gray-700 mb-4">
            Welcome to Gamely Marketplace! Explore a world of gaming delights
            with game keys and accessories. Find your next gaming thrill here!
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row mt-5"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
            className="border border-gray-300 rounded-t-md sm:rounded-l-md sm:rounded-t-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 mb-4 sm:mb-0"
          />
          <button className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white px-6 py-3 rounded-b-md sm:rounded-r-md sm:rounded-b-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
            Subscribe
          </button>
        </form>
      </div>
      <div className="flex-1 w-full">
        <img
          src="./newsletter.png"
          alt="Newsletter Image"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Newsletter;
