"use client";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/page";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Cart() {
  const { cartItems, handleAddToCart, handleRemoveItem } = useContext(Context);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const { status, data: session } = useSession();

  // Clear cart on logout
  useEffect(() => {
    if (status === "unauthenticated") {
      localStorage.removeItem("cartItems");
    }
  }, [status]);

  const handleQuantityChange = (item, newQuantity) => {
    newQuantity = Math.max(1, newQuantity);

    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    const quantityDifference = newQuantity - item.quantity;
    handleAddToCart(item, quantityDifference);
  };

  const handleIncrementQuantity = (item) => {
    handleQuantityChange(item, item.quantity + 1);
  };

  const handleDecrementQuantity = (item) => {
    handleQuantityChange(item, item.quantity - 1);
  };

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCouponApply = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(0.1 * cartSubtotal);
    } else {
      setDiscount(0);
    }
  };

  const cartTotal = cartSubtotal - discount;

  return (
    <div className="my-40 mx-40">
      <h2 className="text-3xl text-zinc font-medium mb-4">Panier d'achat</h2>
      <div className="flex items-start justify-between">
        <div className="w-3/4 mr-4">
          {cartItems && cartItems.length > 0 ? (
            <table className="w-full border-collapse ">
              <thead>
                <tr>
                  <th className=" p-2">Image</th>
                  <th className=" p-2">Name</th>
                  <th className=" p-2">Price</th>
                  <th className=" p-2">Quantity</th>
                  <th className=" p-2">Total</th>
                  <th className=" p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className=" p-2 w-32 h-44">
                      <img
                        src={item.productImage}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </td>
                    <td className=" p-2">{item.name}</td>
                    <td className=" p-2">${item.price}</td>
                    <td className=" p-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleDecrementQuantity(item)}
                          className="px-2 py-1 bg-gray-200 text-gray-600 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleIncrementQuantity(item)}
                          className="px-2 py-1 bg-gray-200 text-gray-600 rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className=" p-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className=" p-2">
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">Your cart is empty</div>
          )}
        </div>
        <div className="w-1/4 mt-5">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-medium mb-4">Order Summary</h3>
            <p className="mb-4 font-bold">Total: ${cartTotal.toFixed(2)}</p>

            <Link
              href="/checkout"
              className="w-full bg-green-500 text-white py-2 rounded text-center block"
            >
              Check out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
