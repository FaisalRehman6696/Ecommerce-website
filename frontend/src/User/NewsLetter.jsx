import React from "react";

const NewsLetter = () => {
  return (
    <>
      <div className="bg-[#ffb266] w-full py-16 px-4 sm:px-8 max-w-5xl mx-auto ">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Text Section */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 md:w-96 ">
              Subscribe Our Newsletter
            </h2>
            <p className="text-gray-700 text-base text-semibold">
              Don't miss out on your discounts. Subscribe to our email
              newsletter to get the best offers, discounts, coupons, gifts and
              much more.
            </p>
          </div>

          {/* Right Form Section */}
          <div className="flex flex-col sm:flex-row items-center md:justify-end ">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-4 py-4  focus:outline-none "
            />
            <button className="w-full sm:w-auto px-6 py-4 bg-black text-white font-semibold hover:bg-gray-800 transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-28 px-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] text-center p-6">
          <div className="text-4xl mb-4">🏷️</div>
          <h1 className="font-bold text-lg">Brand Authenticity</h1>
          <p className="text-gray-500 text-sm mt-1">100% Genuine Products</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] text-center p-6">
          <div className="text-4xl mb-4">⭐</div>
          <h1 className="font-bold text-lg">Buy Now Pay Later</h1>
          <p className="text-gray-500 text-sm mt-1">
            10-month interest-free payment options
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] text-center p-6">
          <div className="text-4xl mb-4">🔁</div>
          <h1 className="font-bold text-lg">5-Star Google Rating</h1>
          <p className="text-gray-500 text-sm mt-1">1000+ reviews</p>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
