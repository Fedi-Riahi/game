"use client"
import { useState } from "react";
import Link from "next/link";

const Sidenav = ({ handleShowWishlist, handleShowSellerProducts, handleShowOrders }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      <button className="block md:hidden text-white bg-black/80 py-2 px-auto text-center" onClick={toggleNav}>
        Menu
      </button>
      <nav
        className={`bg-black/90 w-full min-h-screen p-4 flex flex-col justify-start md:w-1/5 md:flex top-20 md:flex-col md:justify-start ${
          isNavOpen ? "absolute inset-0 z-50" : "hidden md:block"
        }`}
      >
        <button className="absolute top-4 right-4 text-white md:hidden" onClick={closeNav}>
          Close
        </button>
        <ul className="flex flex-col items-center w-full">
          <li className="w-full my-4">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleShowSellerProducts();
                closeNav(); // Close the nav after clicking a link
              }}
              className="block text-white hover:bg-black/30 py-3 px-4 rounded"
            >
              Products
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleShowWishlist();
                closeNav(); // Close the nav after clicking a link
              }}
              className="block text-white hover:bg-black/30 py-3 px-4 rounded"
            >
              Wishlist
            </Link>
          </li>
          <li className="w-full my-4">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleShowOrders();
                closeNav(); // Close the nav after clicking a link
              }}
              className="block text-white hover:bg-black/30 py-3 px-4 rounded"
            >
              Orders
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidenav;

