"use client";
import React, { useEffect, useState } from "react";
import BusinessRegistrationForm from "@/components/BusinessRegistrationForm/BusinessRegistrationForm";
import ProductForm from "@/components/productForm/ProductForm";
import SellerProducts from "@/components/sellerProducts/SellerProducts";
import Wishlist from "@/components/wishlist/Wishlist";
import SideNav from "@/components/sidenav/Sidenav";
import Intro from "@/components/intro/Intro";
import Orders from "@/components/orders/Orders";
import Auth from "@/utils/Auth";

const Dashboard = () => {
  const [sellerUserId, setSellerUserId] = useState(null);
  const [buyerId, setBuyerId] = useState(null);
  const [activeComponent, setActiveComponent] = useState("sellerProducts");

  useEffect(() => {
    const sellerId = sessionStorage.getItem("sellerUserId");
    const buyerId = sessionStorage.getItem("buyerId");

    if (sellerId) {
      setSellerUserId(sellerId);
    } else if (buyerId) {
      setBuyerId(buyerId);
    }
  }, []);

  const handleComponentChange = (component) => {
    if (component === "ProductForm") {
      setActiveComponent(component);
    } else {
      setActiveComponent(component);
    }
  };
  

  return (
    <div >
      <Intro title="Dashboard"/>
      <div className="bg-white flex md:flex-row flex-col">
        <SideNav
          handleShowWishlist={() => handleComponentChange("wishlist")}
          handleShowSellerProducts={() => handleComponentChange("sellerProducts")}
          handleShowOrders={() => handleComponentChange("orders")}
        />
        <div className="md:w-3/4  w-full mx-auto ">
          {activeComponent === "orders" && <Orders />}
          {activeComponent === "wishlist" && <Wishlist />}
          {activeComponent === "sellerProducts" && (
            <>
              {sellerUserId ? (
                <>
                  <div className="flex items-center justify-between w-full mb-8">
                    <h2 className="text-2xl font-medium my-4">Your Products for Sale</h2>
                    <button
                      onClick={() => handleComponentChange("productForm")}
                      className="mt-4 mr-2 text-md bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
                    >
                      Add Product
                    </button>
                  </div>
                  <SellerProducts />
                </>
              ) : (
                <BusinessRegistrationForm />
              )}
            </>
          )}
          {activeComponent === "productForm" && sellerUserId && <ProductForm />}
          {!sellerUserId && !buyerId && <BusinessRegistrationForm />}
        </div>
      </div>
    </div>
  );
};

export default Auth(Dashboard);
