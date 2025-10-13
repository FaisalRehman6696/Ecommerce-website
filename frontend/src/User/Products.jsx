import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
const Products = ({ card, setCard }) => {
  const [list, setlist] = useState({});
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-website-2nkk.onrender.com/api/get-active-product"
        );
        setlist(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getProduct();
  }, []);

  return (
    <>
      <div id="products" className="py-10 px-4  text-center scroll-mt-24 ">
        <div className="w-16 h-[1px] bg-orange-400 mx-auto mt-2 mb-2"></div>
        <h2 className="text-2xl font-semibold tracking-widest text-gray-800 mb-6   mx-auto">
          PRODUCTS
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-5xl py-6 ">
        {Array.isArray(list) && list.length > 0
          ? list.map((rs) => {
              const { _id, image, name, description, price } = rs;
              return (
                <div
                  key={_id}
                  class="bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-2xl p-4 transform transition-transform hover:scale-105 hover:translate-y-0 duration-300  hover:ease-in-out"
                >
                  <NavLink to={`/view-product/${_id}`} state={{ card, rs }}>
                    <img
                      src={`http://localhost:3000/${image}`}
                      alt="TAG Heuer"
                      class="rounded-2xl w-full px-1  object-cover mt-1 transform transition-transform hover:scale-105 hover:translate-y-0 duration-300  ease-in-out"
                      style={{ height: "360px" }}
                    />
                  </NavLink>
                  <div class="mt-4">
                    <h3 class="font-bold text-lg text-gray-800 flex items-center gap-1">
                      {name}
                    </h3>
                    {description}
                    <p class="text-gray-600 my-2">PKR{price}</p>
                    <button
                      class="mt-4 w-full bg-orange-300 hover:bg-orange-400 text-black font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
                      onClick={() =>
                        setCard((prevCard) => {
                          const newItem = {
                            _id,
                            image,
                            name,
                            price,
                            quantity: 1,
                          };
                          const updatedCart = [...prevCard, newItem];
                          sessionStorage.setItem(
                            "card",
                            JSON.stringify(updatedCart)
                          );
                          return updatedCart;
                        })
                      }
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <section class="container max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 sm:px-8 lg:px-20 py-16 mt-20">
        <div class="text-center lg:text-left">
          <div class="bg-white rounded-full shadow-lg w-10 h-10 mx-auto lg:mx-0 flex items-center justify-center text-orange-400 mb-8 text-2xl">
            <i class="fa-solid fa-quote-left"></i>
          </div>
          <p class="text-gray-600 mb-6 max-w-md mx-auto lg:mx-0">
            They are the best watches that one acquires, also they are always
            with the latest news and trends, with a very comfortable price and
            especially with the attention you receive, they are always attentive
            to your questions.
          </p>
          <p class="text-gray-500 text-sm mb-4">March 27, 2021</p>
          <div class="flex items-center gap-4 justify-center lg:justify-start">
            <img
              src="https://theshinecraft.store/assets/img/testimonial1.jpg"
              alt="Lee Doe"
              class="rounded-full w-12 h-12 object-cover"
            />
            <div>
              <h1 class="font-semibold text-lg">Lee Doe</h1>
              <p class="text-gray-500 text-sm">Director of a company</p>
            </div>
          </div>
        </div>

        <div class="relative w-full max-w-md mx-auto lg:mx-0">
          <div class="absolute -right-10 -top-10 md:-right-20 md:-top-20 bg-orange-300 w-full h-full z-0 "></div>
          <img
            src="https://theshinecraft.store/images/tem_img/img1.jpg"
            alt="Watch"
            class="relative z-10 w-full rounded-md shadow-md"
          />
        </div>
      </section>
    </>
  );
};

export default Products;
