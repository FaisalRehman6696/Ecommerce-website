import React, { useEffect, useState } from "react";
import Navbar from "../User/Navbar";
import Products from "../User/Products";
import Categories from "../User/Categories";
import NewsLetter from "../User/NewsLetter";
import Footer from "../User/Footer";
import NewArrival from "../User/NewArrival";
import OurStory from "../User/OurStory";

const Eccommerce = () => {
  const [card, setCard] = useState([]);
  useEffect(() => {
    const stored = sessionStorage.getItem("card");
    if (stored) {
      setCard(JSON.parse(stored));
    }
  }, []);

  // Save to sessionStorage whenever the card changes
  useEffect(() => {
    sessionStorage.setItem("card", JSON.stringify(card));
  }, [card]);

  return (
    <>
      <Navbar card={card} setCard={setCard} />
      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://theshinecraft.store/images/web-logo/bg.webp')`,
        }}
      >
        <div className="absolute  inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col text-center px-4">
          <h1 className=" text-3xl md:text-5xl text-white font-bold">
            Browse Our Latest Products
          </h1>
          <button className="mt-6 border text-white px-6 py-4 rounded-sm text-xl bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300">
            Explore Now
          </button>
        </div>
      </section>
      <div className="px-6">
        <Products setCard={setCard} card={card} />
        <Categories />
        <OurStory />
        <NewArrival setCard={setCard} card={card} />
        <NewsLetter />
        <Footer />
      </div>
    </>
  );
};

export default Eccommerce;
