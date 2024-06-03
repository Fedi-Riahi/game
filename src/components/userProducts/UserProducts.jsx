"use client"
import React, { useState, useEffect } from "react";


const UserProducts = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await fetch("/api/userproduct");
        if (!response.ok) {
          throw new Error("Failed to fetch user products");
        }
        const data = await response.json();
        setUserProducts(data.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, []);

  const handleBoostChange = async (productId, isSelectedForBoost) => {
    try {
      const response = await fetch(`/api/userproduct/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boosted: isSelectedForBoost }),
      });
      if (!response.ok) {
        throw new Error("Failed to update product boosted status");
      }
      // Update the local state to reflect the change
      setUserProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, boosted: isSelectedForBoost } : product
        )
      );
    } catch (error) {
      console.error("Error updating product boosted status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userProducts.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={product.productImage[0]}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {product.description}
              </p>
              <p className="text-sm font-semibold">${product.price}</p>
              <p className="text-sm font-semibold">Boost Status: {product.boostStatus}</p>
              {product.boostStatus === "Boosting Pending" && (
                <label className="block mt-2">
                  <input
                    type="checkbox"
                    checked={product.boosted || false}
                    onChange={(e) => handleBoostChange(product._id, e.target.checked)}
                    className="mr-2"
                  />
                  Boost
                </label>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
