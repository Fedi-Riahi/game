const ContactUs = () => {
  return (
    <div className="w-screen px-4 py-8 relative">
      <div className="bg-black text-white py-8 px-4 absolute top-0 left-0 right-0 z-10 ">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-lg">
          Have questions or feedback? Fill out the form below to get in touch
          with us.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16 mt-16 relative z-20">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <ul className="mt-4">
              <li className="py-4">CALL US : +21695158699</li>
              <li>EMAIL : gamely@company.com</li>
              <li>Address: Rue ali ben ayed , Douar hicher , Manouba 2086</li>
            </ul>
          </div>
          <div>
            <form className="space-y-4 flex-1">
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
    </div>
  );
};

export default ContactUs;
