"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import EditProductForm from "@/components/editProductForm/EditProductForm";

function SellerProducts() {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const sellerUserId = sessionStorage.getItem("sellerUserId");
        if (!sellerUserId) {
          throw new Error("Seller user ID not found in session storage");
        }

        const response = await fetch(`/api/userproduct?sellerId=${sellerUserId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user products: ${response.status}`);
        }

        const data = await response.json();
        // Filter products where sellerId matches sellerUserId from session storage
        const filteredProducts = data.products.filter(
          (product) => product.sellerId === sellerUserId
        );
        setUserProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user products:", error);
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/userproduct/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }

      setUserProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
  };

  const handleRequestBoost = async (productId) => {
    console.log(productId);
    try {
      const response = await fetch(`/api/userproduct/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boostStatus: "Boosting Pending" }),
      });

      if (!response.ok) {
        throw new Error("Failed to request boost for product");
      }

      const updatedProduct = await response.json();
      console.log("Updated product:", updatedProduct);

      setUserProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, boostStatus: "Boosting Pending" }
            : product
        )
      );
    } catch (error) {
      console.error("Error requesting boost for product:", error);
    }
  };

  const handleFinishEditing = () => {
    setEditingProductId(null);
  };

  return (
    <div className="md:flex md:flex-wrap">
      {editingProductId ? (
        <EditProductForm
          product={userProducts.find(
            (product) => product._id === editingProductId
          )}
          onFinishEditing={handleFinishEditing}
        />
      ) : (
        <div className="md:w-full ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {userProducts.length === 0 ? (
                <p>No products found.</p>
              ) : (
                userProducts.map((product) => (
                  <div
                    key={product._id}
                    className="border border-gray-200 p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center mb-4 gap-10"
                  >
                    <div className="w-full md:w-1/4 flex items-center justify-center mb-4 md:mb-0">
                      <div className="relative overflow-hidden rounded-lg  md:w-72 md:h-72">
                        <Image
                          src={product.productImage[0]}
                          alt={product.name}
                          layout="fill"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-3/4 flex flex-col justify-between md:h-full">
                      <span className="font-bold">Name</span>
                      <h2 className="text-lg mb-2">{product.name}</h2>
                      <span className="font-bold">Date</span>
                      <p>{product.createdAt.split("T")[0]}</p>
                      <span className="font-bold">Category</span>
                      <p>{product.category}</p>
                      <span className="font-bold">Price</span>
                      <p className="">{product.price} DT</p>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => handleEditProduct(product._id)}
                          className="mt-4 mr-2 text-md bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRequestBoost(product._id)}
                          className="mt-4 mr-2 text-md bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
                        >
                          Request Boost
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="mt-4 mr-2 text-md border border-red-500 text-red-500 hover:bg-red-50 font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SellerProducts;
