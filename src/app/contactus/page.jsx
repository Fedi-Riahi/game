import Intro from "@/components/intro/Intro";
import React from "react";

const ContactUs = () => {
  return (
    <div className="w-full  relative">
      <Intro
        title="Contact Us"
        desc="With that in mind, we strive to deliver accurate, trustworthy, and engaging content to our users. Our team of experts, researchers, and writers work tirelessly to curate high-quality articles, guides, and resources that cover various domains such as technology, science, health, business, and more.
"
      />
      <div className="max-w-4xl mx-auto px-4 py-16 mt-16 relative z-20">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <ul className="mt-4">
              <li className="py-4">CALL US : +21695158699</li>
              <li className="py-4">EMAIL : gamely@company.com</li>
              <li className="py-4">Address: Rue ali ben ayed , Douar hicher , Manouba 2086</li>
            </ul>
          </div>
          <div>
            <form className="space-y-4 flex-1 absolute bottom-16 bg-white px-4 py-4 rounder-tr-md">
              <h1 className="text-2xl text-blue-500">Contact Form</h1>
              <div className="flex justify-between w-full gap-4">
                <div className="flex-1">
                  <label htmlFor="name" className="block">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border border-gray-300 rounded-md py-3 px-4 w-full"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="name" className="block">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border border-gray-300 rounded-md py-3 px-4 w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between w-full gap-4">
                <div className="flex-1">
                  <label htmlFor="email" className="block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border border-gray-300 rounded-md py-3 px-4 w-full"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="name" className="block">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border border-gray-300 rounded-md py-3 px-4 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="border border-gray-300 rounded-md py-3 px-4 w-full"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-3 px-10 rounded-tl-lg rounded-br-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Google Maps iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.9681605806763!2d10.08925341181787!3d36.81928287212599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd327b54aba601%3A0xf8b76c3a1d4a455e!2sRue%20Ali%20Ben%20Ayed!5e0!3m2!1sen!2stn!4v1717456577083!5m2!1sen!2stn"
        width="600"
        height="450"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="mx-12 mt-60 w-full"
      ></iframe>
    </div>
  );
};

export default ContactUs;
