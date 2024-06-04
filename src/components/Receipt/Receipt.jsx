import React from "react";
import Image from "next/image";

const Receipt = ({ orderId, timestamp, paymentMethod, email, totalPrice }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start mx-4 w-full ">
      {/* Left side with receipt details */}
      <div className="flex-1 text-start mb-4 md:mb-0">
        <h2 className="text-xl font-semibold mb-2 text-green-500">Payment Successful</h2>
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

      {/* Right side with the logo */}
      <div className="flex-1 ml-4">
        <Image src="/logo.png" alt="Company Logo" width={400} height={400} />
        <h1 className="text-5xl text-center">Gamely</h1>
      </div>
    </div>
  );
};

export default Receipt;
