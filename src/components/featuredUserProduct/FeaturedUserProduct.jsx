"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const FeaturedUserProduct = () => {
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchProductAndSeller = async () => {
      try {
        // Fetch user product
        const productResponse = await fetch("/api/userproduct");
        const productData = await productResponse.json();
        const products = productData.products;
        // Filter products to get only the featured one
        const featuredProduct = products.find((product) => product.boosted);
        if (featuredProduct) {
          setProduct(featuredProduct);

          // Fetch seller
          const sellerResponse = await fetch("/api/seller");
          const sellerData = await sellerResponse.json();
          const sellers = sellerData.sellers;
          // Find seller matching the product's sellerId
          const matchedSeller = sellers.find(
            (seller) => seller.user_id === featuredProduct.sellerId
          );
          if (matchedSeller) {
            setSeller(matchedSeller);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductAndSeller();
  }, []);

  if (!product || !seller) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-4 w-max-screen bg-white lg:px-20 px-5">
      <h1 className="mb-5 text-2xl lg:text-3xl font-bold text-black text-center lg:text-start lg:w-1/3">
        Featured Product by {seller.name}
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-start w-full gap-8">
        {/* Left Images */}
        <div className="flex-1 flex items-center justify-center flex-col lg:flex-row gap-4">
          <div className="relative w-48 h-48 mx-auto">
            {product.productImage[0] && (
              <Image
                src={product.productImage[0]}
                alt="Left Image 1"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          <div className="relative w-48 h-48 mx-auto">
            {product.productImage[0] && (
              <Image
                src={product.productImage[0]}
                alt="Left Image 2"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        </div>

        {/* Product Card */}
        <div className="flex-1 p-5 border border-blue-800 rounded-lg overflow-hidden shadow-lg max-w-full lg:max-w-2xl mx-5">
          <h2 className="text-2xl font-semibold my-4 text-black">
            {product.name}{" "}
          </h2>
          <p className="my-4 line-clamp-3 text-zinc-700">
            {product.description}
          </p>
          <div className="flex items-center justify-between w-full my-4">
            <p className="font-bold text-lg mb-3 text-zinc-700">
              {product.price} DT
            </p>
            <button className="z-10 mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-2 px-8 rounded-tl-lg rounded-br-lg">
              Add to cart
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 text-center">
          <div className="relative w-48 h-48 lg:w-96 lg:h-96 mx-auto">
            <Image
              src={product.productImage[0]}
              alt="Right Image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUserProduct;
