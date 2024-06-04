"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { CiUser, CiSearch, CiShoppingCart, CiLogout } from "react-icons/ci";

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItemCount(cartItems.length);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    sessionStorage.clear();
  };

  const isAdmin = sessionStorage.getItem("adminToken");

  return (
    <div className="bg-black dark:bg-gray-900 w-full border-b border-gray-600 dark:border-gray-600">
      <div className=" flex flex-wrap items-center justify-between mx-10 p-4 max-w-screen">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/logo.png" width={60} height={60} alt="Gamely" />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/aboutus"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/faqs"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/contactus"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact Us
              </Link>
            </li>
            {status === "authenticated" && (
              <li>
                <Link
                  href="/dashboard"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="flex items-center space-x-4">
              <CiSearch className="h-6 w-6 text-white" />
              <Link href="/cart" className="relative">
                <CiShoppingCart className="h-6 w-6 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-3 -right-3 inline-flex items-center justify-center z-20 px-2 py-1 text-xs font-bold leading-none text-red-100 bg-blue-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {status === "authenticated" ? (
                <div className="flex items-center space-x-4">
                  <Link href="/profile">
                    <CiUser className="h-6 w-6 text-white" />
                  </Link>
                  <button
                    onClick={() => handleSignOut()}
                    className="text-white"
                  >
                    <CiLogout className="h-6 w-6 text-white" />
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <CiUser className="h-6 w-6 text-white" />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
