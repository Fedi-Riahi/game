"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Auth from "@/utils/Auth";
function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    wishlist: [],
    address1: "",
    address2: "",
    state: "",
    city: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userId =
          sessionStorage.getItem("sellerUserId") ||
          sessionStorage.getItem("buyerId");
        if (!userId) {
          throw new Error("User ID not found in session storage");
        }

        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to update user details");
      }
      alert("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch(`/api/user/${user._id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete user account");
        }
        alert("User account deleted successfully");
        // Optionally, you can redirect the user to the login page or perform other actions after deleting the account
      } catch (error) {
        console.error("Error deleting user account:", error);
      }
    }
  };

  return (
    <div className="mt-8 w-full px-20">
      <Link href="/" className="text-center font-medium">
        Back to home
      </Link>
      <h1 className="text-3xl font-medium mb-6 mt-10 mx-auto text-center">
        Account Details
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block py-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-3 px-4 w-full"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block py-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-3 px-4 w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="email" className="block py-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-3 px-4 w-full"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="phone" className="block py-2">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-3 px-4 w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block py-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-3 px-4 w-full"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 py-2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <span className="text-black">Hide Password</span>
                ) : (
                  <span className="text-black">Show Password</span>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="address1" className="block py-2">
                Addresse 1
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                value={user.address1}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-3 px-4 w-full"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="address2" className="block py-2">
                Addresse 2
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                value={user.address2}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-3 px-4 w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="state" className="block py-2">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={user.state}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-3 px-4 w-full"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="city" className="block py-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={user.city}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-3 px-4 w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="zipCode" className="block py-2">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={user.zipCode}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-3 px-4 w-full"
            />
          </div>
          <div className="flex items-center justify-center w-full mt-10">
            <button
              type="button"
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-3 px-10 rounded-tl-lg rounded-br-lg mr-4"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white font-semibold py-3 px-10 rounded-tl-lg rounded-br-lg hover:bg-red-600"
            >
              Delete Account
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Auth(Profile);
