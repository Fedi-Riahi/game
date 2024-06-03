"use client"
import React, { useState, useEffect } from "react";
import Receipt from "../Receipt/Receipt";

function Bill({ handleCheckout }) {
  const [email, setEmail] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); // State for total price

  const [paymentMethod, setPaymentMethod] = useState("");
  const [sendOffers, setSendOffers] = useState(false);
  const [receiveProductEmail, setReceiveProductEmail] = useState("");
  const [sendConfirmationEmail, setSendConfirmationEmail] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [csv, setCSV] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
    // Calculate total price
    setTotalPrice(calculateTotal(storedCartItems));
  }, []);

  function calculateSubtotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }

  function calculateShipping() {
    return 10; // Assuming a fixed shipping cost of 10 DT
  }

  function calculateTotal(cartItems) {
    return calculateSubtotal(cartItems) + calculateShipping();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId =
      sessionStorage.getItem("buyerId") ||
      sessionStorage.getItem("sellerUserId");
    // Prepare order data
    const orderData = {
      userId: userId,
      email: email,
      paymentMethod: paymentMethod,
      cartItems: cartItems,
      totalPrice: totalPrice,
    };

    // Send order data to the API using fetch
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order.");
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);
      setOrderPlaced(true);

      // Send email after order placement
      const emailResponse = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, cartItems }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email.");
      }

      // Handle successful order placement
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error
    }
  };

  return (
    <div className="mx-4 md:mx-20 mt-10 md:mt-40 flex flex-col md:flex-row justify-between">
      <div className="w-full md:w-1/2 mr-0 md:mr-10 ">
        <h2 className="font-medium text-2xl my-2">Account</h2>
        <div className="w-full">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="randomname@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-3 px-4 mb-4 border border-gray-200"
          />
        </div>
        <div className="w-full border border-gray-200 my-4" />
        <div className="flex items-center gap-2 ">
          <input
            type="checkbox"
            id="sendOffers"
            checked={sendOffers}
            onChange={(e) => setSendOffers(e.target.checked)}
            c
          />
          <label htmlFor="sendOffers">Send offers to this email</label>
        </div>
        <h2 className="font-medium text-2xl mt-8">
          Email to receive your product
        </h2>
        <div className="my-4">
          <input
            type="email"
            id="receiveProductEmail"
            value={receiveProductEmail}
            onChange={(e) => setReceiveProductEmail(e.target.value)}
            required
            placeholder="randomname@gmail.com"
            className="w-full py-3 px-4 mb-4 border border-gray-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sendConfirmationEmail"
            checked={sendConfirmationEmail}
            onChange={(e) => setSendConfirmationEmail(e.target.checked)}
          />
          <label htmlFor="sendConfirmationEmail">
            Send confirmation email to this address
          </label>
        </div>
        {/* Payment Method selection */}
        <h2 className="font-medium text-2xl my-2">Payment Method</h2>
        <span className="text-gray-500">All transactions are secure</span>
        <div className="my-4 py-4  px-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white ">
          <input
            type="radio"
            id="creditCard"
            value="credit_card"
            checked={paymentMethod === "credit_card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="creditCard" className="mx-2">
            Credit Card
          </label>
        </div>
        <div className="my-4 py-4  px-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white ">
          <input
            type="radio"
            id="debitCard"
            value="debit_card"
            checked={paymentMethod === "debit_card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="debitCard" className="mx-2">
            Debit Card
          </label>
        </div>
        <div className="my-4 py-4  px-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white ">
          <input
            type="radio"
            id="paypal"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paypal" className="mx-2" onClick={handleSubmit}>
            PayPal
          </label>
        </div>
        {/* Credit Card details */}
        {paymentMethod === "credit_card" && (
          <div className="flex flex-col gap-2 ">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full py-3 px-4 border border-gray-400
              "
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="CSV"
                value={csv}
                onChange={(e) => setCSV(e.target.value)}
                className="flex-1 w-1/2 py-3 px-4 border border-gray-400"
              />
              <input
                type="text"
                placeholder="Expiration Date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="flex-1 w-1/2 py-3 px-4 border border-gray-400"
              />
            </div>
          </div>
        )}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-2 px-8 rounded-tl-lg rounded-br-lg"
        >
          Proceed
        </button>
      </div>
      {orderPlaced && <Receipt />}
      <div className="w-full md:w-1/2">
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="flex my-4">
              <img
                src={item.productImage}
                alt={item.productImage}
                className="w-40 h-52 mr-2"
              />
              <span className="py-2 px-2 font-medium">{item.name}</span>
              <span className="pt-10 px-2 font-medium">{item.price} DT</span>
            </li>
          ))}
        </ul>
        <div className="md:flex flex-col w-1/2 items-center justify-center mx-auto hidden ">
          <div className="flex items-center justify-between w-full ">
            <span>Subtotal</span>
            <span>{calculateSubtotal(cartItems)} DT</span>
          </div>
          <div className="flex items-center justify-between w-full ">
            <span>Shipping Email</span>
            <span>{email}</span>
          </div>
          <div className="flex items-center justify-between w-full ">
            <span>Total</span>
            <span>{calculateTotal(cartItems)} DT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bill;
