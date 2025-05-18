import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-white py-10 px-4 border-t border-gray-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center sm:text-left">
          {/* Our information */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Our information</h3>
            <p className="text-gray-700">+92 324 1273054</p>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-semibold text-lg mb-2">About Us</h3>
            <ul className="text-gray-700 space-y-1">
              <li>Support Center</li>
              <li>Customer Support</li>
              <li>About Us</li>
              <li>Copy Right</li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Product</h3>
            <ul className="text-gray-700 space-y-1">
              <li>Rolex</li>
              <li>Digital Airpods</li>
              <li>Smart Watches</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Social</h3>
            <div className="flex justify-center sm:justify-start space-x-4 text-xl">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Payment Methods</h3>
            <ul className="text-gray-700 space-y-1">
              <li>🟢 Easypaisa</li>
              <li>🔴 Mastercard</li>
              <li>🟠 Jazz Cash</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-10 text-sm text-gray-600">
          <span className=" text-gray-600 px-2 py-1 rounded">
            © ShineCraft 2025. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
