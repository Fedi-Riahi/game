"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function ProductDetails() {
  const [giftCard, setGiftCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    if (id) {
      // Fetch gift card details using the ID
      fetch(`/api/product/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch gift card details");
          }
          return response.json();
        })
        .then((data) => {
          setGiftCard(data.giftCard);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]); // Fetch gift card details when the ID changes

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching the gift card details
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message if fetching fails
  }

  if (!giftCard) {
    return <div>No gift card found</div>; // Display a message when no gift card is found
  }

  return (
    <div className="flex flex-col md:flex-row md:px-40 md:items-center md:justify-center bg-black min-h-screen px-4 pt-10">
      <div className="md:flex-1 md:pr-8 flex flex-col justify-start text-left md:text-left">
        <Link href="/" className="text-white mb-10 inline-block">
          Back to home
        </Link>
        <h1 className="text-4xl w-full md:w-1/2 font-bold text-white mb-10">
          {giftCard.name}
        </h1>
        <p className="text-lg text-gray-400 mb-5 w-full md:w-1/2">{giftCard.description}</p>
        <p className="text-lg text-gray-400 mb-10">Type: {giftCard.type}</p>
        <span className="text-lg font-bold text-white mb-5">${giftCard.value}</span>
        <button className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-2 px-10 rounded-tl-lg rounded-br-lg w-full md:w-2/5">
          Purchase
        </button>
      </div>
      <div className="border border-blue-600 flex flex-col items-center justify-center md:ml-8 mt-8 md:mt-0">
        <div className=" cursor-pointer">
          <Image
            src={giftCard.productImage[0]}
            alt={giftCard.name}
            width={150}
            height={150}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="border border-blue-600  md:ml-8 mt-8 md:mt-0 ">
        <Image
          src={giftCard.productImage[0]}
          alt={giftCard.name}
          width={600}
          height={600}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}

export default ProductDetails;
