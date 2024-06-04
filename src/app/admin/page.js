"use client";
import React, { useState, useEffect } from "react";
import AdminSidenav from "@/components/AdminSideNav/AdminSideNav";
import UsersList from "@/components/usersList/UsersList";
import AdminsList from "@/components/adminsList/AdminsList";
import GiftCardForm from "@/components/gitfCardForm/giftCardForm";
import EditCardForm from "@/components/EditCardForm/EditCardForm";
import UserProducts from "@/components/userProducts/UserProducts";
import NewsList from "@/components/newsList/NewsList";
import NewsForm from "@/components/newsForm/NewsForm"; // Import NewsForm component
import Intro from "@/components/intro/Intro";
import AdminOrders from "@/components/adminOrders/adminOrders";

const AdminPage = () => {
  const [view, setView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUserProducts, setShowUserProducts] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false); // State for showing NewsForm

  const handleShowDashboard = () => setView("dashboard");
  const handleShowProducts = async () => {
    setView("products");
    fetchProducts();
    setShowAddForm(false);
    setShowUserProducts(false);
    setShowNewsForm(false);
  };
  const handleShowFeaturedProducts = () => setView("featuredProducts");
  const handleShowNews = () => {
    setView("news");
    setShowNewsForm(false);
  };
  const handleShowUsers = () => setView("users");
  const handleShowOrders = () => setView("orders");
  const handleShowAdmins = () => setView("admins");

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/product");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (view === "products") {
      fetchProducts();
    }
  }, [view]);

  const handleEditProduct = (productId) => {
    const product = products.find((p) => p._id === productId);
    setEditingProduct(product);
    setView("editProduct");
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`/api/product/${productId}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
    setView("products");
  };

  const handleAddProduct = () => {
    setShowAddForm(true);
  };

  const handleShowUserProducts = () => {
    setView("userProducts");
    setShowUserProducts(true);
  };

  const handleAddNews = () => {
    setShowNewsForm(true);
  };

  return (
    <div>
        <Intro title="Admin Dashboard" />
      <div className="flex bg-white min-h-screen ">
        <AdminSidenav
          handleShowDashboard={handleShowDashboard}
          handleShowProducts={handleShowProducts}
          handleShowFeaturedProducts={handleShowFeaturedProducts}
          handleShowNews={handleShowNews}
          handleShowUsers={handleShowUsers}
          handleShowOrders={handleShowOrders}
          handleShowAdmins={handleShowAdmins}
          handleShowUserProducts={handleShowUserProducts}
        />
        <div className="w-4/5 p-6">
          {view === "dashboard" && <div>Dashboard content goes here</div>}
          {view === "products" && !showAddForm && (
            <div>
              <div className="flex items-center justify-between w-full ">
                <h2 className="text-2xl mb-4 font-medium">Products</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="max-w-xs flex flex-col py-4 px-2 items-center justify-between bg-blue-950 rounded-lg overflow-hidden shadow-lg  mr-20 bg-cover bg-center relative"
                    style={{
                      width: "300px",
                      height: "480px",
                      backgroundImage: `url(${product.productImage})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-blue-950 bg-opacity-60 z-0"></div>
                    <h3 className="text-lg text-center font-semibold mb-2 text-white z-10">
                      {product.name}
                    </h3>
                    <div className="w-full flex items-center justify-center z-10"></div>
                    <div className="p-4 z-10 w-full">
                      <p className="text-white font-semibold text-2xl">
                        {product.price} DT
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <button
                          className="mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-2 px-8 rounded-tl-lg rounded-br-lg"
                          onClick={() => handleEditProduct(product._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="mt-4 mr-2  border border-gray-400 text-md text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showAddForm && <GiftCardForm />}
          {view === "editProduct" && editingProduct && (
            <EditCardForm
              giftCard={editingProduct}
              onUpdate={handleUpdateProduct}
            />
          )}
          {view === "featuredProducts" && (
            <div>Featured Products content goes here</div>
          )}
          {view === "news" && !showNewsForm && (
            <div>
              <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-2xl font-medium">News</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  onClick={handleAddNews} // Add this handler to show the NewsForm
                >
                  Add News
                </button>
              </div>
              <NewsList />
            </div>
          )}
          {view === "news" && showNewsForm && <NewsForm />}{" "}
          {/* Conditionally render NewsForm */}
          {view === "users" && <UsersList />}
          {view === "orders" && <div><AdminOrders /></div>}
          {view === "admins" && <AdminsList />}
          {view === "userProducts" && showUserProducts && <UserProducts />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
