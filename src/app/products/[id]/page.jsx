"use client"
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    if (id) {
      // Fetch product details using the ID
      fetch(`/api/userproduct/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch product details");
          }
          return response.json();
        })
        .then((data) => {
          setProduct(data.product);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]); // Fetch product details when the ID changes

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching the product details
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message if fetching fails
  }

  if (!product) {
    return <div>No product found</div>; // Display a message when no product is found
  }

  return (
    <div className="flex flex-col md:flex-row md:px-40 md:items-center md:justify-center bg-black h-screen px-4 py-10">
      <div className="md:flex-1 md:pr-8 flex flex-col justify-start text-left md:text-left">
        <Link href="" className="text-white mb-10 inline-block">
          Back to home
        </Link>
        <h1 className="text-4xl w-full md:w-1/2 font-bold  text-white mb-10">
          {product.name}
        </h1>
        <p className="text-lg text-gray-400  mb-5 w-full md:w-1/2">{product.description}</p>
        <p className="text-lg text-gray-400 mb-10">category: {product.category}</p>
        <span className="text-lg font-bold text-white mb-5">${product.price}</span>
        <button className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-2 px-10 rounded-tl-lg rounded-br-lg w-full md:w-2/5">
          Purchase
        </button>
      </div>
      <div className="border border-blue-600 flex flex-col items-center justify-center md:ml-8 mt-8 md:mt-0">
        {product.productImage.map((image, index) => (
          <div key={index} className="mb-4 cursor-pointer">
            <Image
              src={image}
              alt={product.name}
              width={150}
              height={150}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="border border-blue-600 p-10 md:ml-8 mt-8 md:mt-0 mx-4">
        <Image
          src={product.productImage[0]}
          alt={product.name}
          width={600}
          height={600}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}

export default ProductDetails;
