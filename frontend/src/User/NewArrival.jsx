import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NewArrival = ({ card, setCard }) => {
 
  const [list, setlist] = useState({});
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`https://ecommerce-website-2nkk.onrender.com/api/get-new-product`);
        setlist(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  return (
    <>
      <div className="py-10 px-4  text-center">
        <div className="w-16 h-[1px] bg-orange-400 mx-auto mt-2 mb-2"></div>
        <h2 className="text-2xl font-semibold tracking-widest text-gray-800 mb-6   mx-auto">
          NEW ARRIVALS
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-5xl py-6 mb-20">
        {Array.isArray(list) && list.length > 0 ? (
          list.map((rs) => {
            const { _id, name, price, productType, image } = rs;
            console.log(rs);
            return (
              <div
                key={_id}
                class="relative bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-2xl p-4 transform transition-transform hover:scale-105 hover:translate-y-0 duration-300  hover:ease-in-out"
              >
                <NavLink to={`/view-product/${_id}`} state={{ card, rs }}>
                  <img
                    src={`https://ecommerce-website-2nkk.onrender.com/get-category-by/api/${image}`}
                    alt="TAG Heuer"
                    class="rounded-2xl w-full px-1  object-cover mt-1 transform transition-transform hover:scale-105 hover:translate-y-0 duration-300  ease-in-out"
                    style={{ height: "360px" }}
                  />
                </NavLink>
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  {productType}
                </span>
                <div class="mt-4">
                  <h3 class="font-bold text-lg text-gray-800 flex items-center gap-1">
                    {name}
                  </h3>
                  <p class="text-gray-600 my-2">PKR{price}</p>
                  <button
                    class="mt-4 w-full bg-orange-300 hover:bg-orange-400 text-black font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
                    onClick={() =>
                      setCard((prevCard) => {
                        const newItem = {
                          _id,
                          name,
                          price,
                          productType,
                          image,
                          quantity: 1,
                        };
                        const updateCard = [...prevCard, newItem];
                        sessionStorage.setItem(
                          "card",
                          JSON.stringify(updateCard)
                        );
                        return updateCard;
                      })
                    }
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>data not found</p>
        )}
      </div>
    </>
  );
};

export default NewArrival;
