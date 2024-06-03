"use client"
import React, { useState, useEffect } from "react";

function Orders({ handleCheckout }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/order");
        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }
        const data = await response.json();
        // Filter orders based on buyerId or sellerUserId from session storage
        const buyerId = sessionStorage.getItem("buyerId");
        const sellerUserId = sessionStorage.getItem("sellerUserId");
        const filteredOrders = data.orders.filter(
          (order) => order.userId === buyerId || order.userId === sellerUserId
        );
        setOrders(filteredOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  // Function to generate a summary of items
  function generateItemsSummary(cartItems) {
    const itemsSummary = cartItems.map((item) => item.name).join(", ");
    return itemsSummary;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold my-4 ">Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">
                  {generateItemsSummary(order.cartItems)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.totalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
