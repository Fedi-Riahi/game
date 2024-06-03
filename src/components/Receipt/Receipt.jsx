import React from "react";

const Receipt = ({ orderId, timestamp, paymentMethod, email, totalPrice }) => {
  return (
    <div className="text-center">

      <h2 className="text-xl font-semibold mb-2">Payment Successful</h2>
      <div className="mb-2">
        <p className="font-semibold">Total Price:</p>
        <p>{totalPrice} DT</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">Order ID:</p>
        <p>{orderId}</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">Timestamp:</p>
        <p>{timestamp}</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">Payment Method:</p>
        <p>{paymentMethod}</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">Email:</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Receipt;
