import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-2 w-full">
      <div className="mw-full mx-16 flex  items-center justify-between">
        <div className="flex-1 flex flex-col justify-between w-fit">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-5xl">Gamely<span className="text-purple-600">.</span></span>
          </div>

          {/* Title and Description */}
          <div className="text-center mt-4 md:mt-0 md:text-left md:w-1/4">
            <h1 className="text-xl  font-bold text-white mt-10 w-fit">
            Reach out & let your {" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                mind explore
              </span>
            </h1>
            <p className="text-md mt-2">
              i also love the challenge of trying to beat a difficult game or
              master a new skill
            </p>
          </div>
        </div>

        {/* Links */}
        <nav className="text-center md:text-left mt-4 md:mt-0 md:w-1/2 flex-1 flex justify-center md:justify-start">
          <ul className="flex flex-col space-x-4 flex-1">
            <li>
              <Link href="#" className="text-md hover:text-gray-400">
                NAVIGATION
              </Link>
            </li>
            <li>
              <Link href="#" className="text-md hover:text-gray-400">
                All Products
              </Link>
            </li>
            <li>
              <Link href="#" className="text-md hover:text-gray-400">
                All Collections
              </Link>
            </li>
            <li>
              <Link href="#" className="text-md hover:text-gray-400">
                News Page
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
          <ul className="flex flex-col space-x-4  flex-1">
            <li>
              <Link href="#" className="text-md hover:text-gray-400">
                ABOUT US
              </Link>
            </li>
            <li>
              <Link href="/aboutus" className="text-md hover:text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="text-md hover:text-gray-400">
                Contact with us
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="text-md hover:text-gray-400">
                FAQ’s
              </Link>
            </li>
            <li>
              <Link href="/policy" className="text-md hover:text-gray-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-md hover:text-gray-400">
                Terms & Conditions
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>

        {/* Share Icons */}
        <div className="flex items-center mt-4 md:mt-0 ">
          <FaFacebook className="text-xl mr-4 hover:text-gray-400 cursor-pointer" />
          <FaTwitter className="text-xl mr-4 hover:text-gray-400 cursor-pointer" />
          <FaInstagram className="text-xl hover:text-gray-400 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
