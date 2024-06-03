import React from "react";

const About = () => {
  return (
    <div className="bg-white p-8 rounded-tl-lg lg:px-20 px-5">
      <h1 className="text-3xl font-bold mb-4">About our shop</h1>
      <p className="text-gray-700 mb-8 lg:w-1/2 w-full">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
        mollis nisl, non rhoncus odio tristique nec. Integer et tortor ipsum.
        Vivamus fringilla risus nec dolor faucibus, id venenatis nunc fermentum.
      </p>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* First Div */}
        <div className="w-full lg:w-1/4 bg-white rounded-tr-lg rounded-bl-lg px-4 py-8 border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            01
          </h2>
          <h2 className="text-xl font-bold mb-2">Our mission</h2>
          <p className="text-gray-700">
            Introducing our gaming marketplace: your go-to
          </p>
        </div>
        {/* Second Div */}
        <div className="w-full lg:w-1/4 bg-white rounded-tr-lg rounded-bl-lg px-4 py-8 border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            02
          </h2>
          <h2 className="text-xl font-bold mb-2">Our values</h2>
          <p className="text-gray-700">
            Large promotions with numerous discounts
          </p>
        </div>
        {/* Third Div */}
        <div className="w-full lg:w-1/4 bg-white rounded-tr-lg rounded-bl-lg px-4 py-8 border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            03
          </h2>
          <h2 className="text-xl font-bold mb-2">Our service</h2>
          <p className="text-gray-700">
            We provide fast and high quality service
          </p>
        </div>
        {/* Fourth Div */}
        <div className="w-full lg:w-1/4 bg-white rounded-tr-lg rounded-bl-lg px-4 py-8 border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            04
          </h2>
          <h2 className="text-xl font-bold mb-2">Gamely</h2>
          <p className="text-gray-700">
            Introducing our gaming marketplace: your go-to
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
