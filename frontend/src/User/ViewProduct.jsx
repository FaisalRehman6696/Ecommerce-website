import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const ViewProduct = () => {
  const location = useLocation();
  const rs = location.state?.rs;
  const initialCard = location.state?.card || [];

  const [card, setCard] = useState(() => {
    const stored = sessionStorage.getItem("card");
    return stored ? JSON.parse(stored) : initialCard;
  });

  useEffect(() => {
    sessionStorage.setItem("card", JSON.stringify(card));
  }, [card]);
  const addToCart = () => {
    if (!rs) return;
    const newItem = { ...rs, quantity: 1 };
    const updatedCart = [...card, newItem];
    setCard(updatedCart);
    sessionStorage.setItem("card", JSON.stringify(updatedCart));
  };
  return (
    <>
      <Navbar card={card} setCard={setCard} />
      <div className="flex justify-center">
        <div className="max-w-6xl px-4 py-24 grid md:grid-cols-2 gap-10 mt-16">
          {/* Left Side - Image */}
          <div className="w-full h-[50vh]">
            <img
              src={`http://localhost:3000/${rs.image}`}
              alt=""
              className="w-[300px] h-[50vh] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6 w-full">
            <h1 className="text-3xl font-bold text-gray-800">{rs.name}</h1>
            <p className="text-gray-600 text-lg">{rs.description}</p>
            <p className="text-2xl font-semibold text-orange-500">
              PKR {rs.price}
            </p>

            <div className="flex gap-4">
              <button
                onClick={addToCart}
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
              >
                Add to Cart
              </button>
              <button className="border border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-50 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewProduct;
