import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Categories = () => {
  const [list, setlist] = useState({});
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("http://localhost:3000/get-category");
        setlist(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);
  return (
    <>
      <div className="py-10 px-4 text-center">
        {/* Heading */}
        <div className="w-16 h-[1px] bg-orange-400 mx-auto "></div>

        <h2 className="text-2xl font-semibold tracking-widest text-gray-800 mb-10 mt-6">
          CATEGORIES
        </h2>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}

          {/* Card 3 with overlay */}
          {Array.isArray(list) && list.length > 0 ? (
            list.map((rs) => {
              const { _id, name, image } = rs;
              return (
                <div
                  key={_id}
                  className="relative bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] p-3 transition-transform hover:scale-105 transform w-72 max-w-xs mx-auto group"
                >
                  <NavLink to={`/view-category/${_id}`} state={{ rs }}>
                    <img
                      src={`http://localhost:3000/${image}`}
                      alt="Watch 3"
                      className="rounded-xl w-full h-56 object-cover  p-2 group-hover:blur-sm"
                    />

                    <div className="absolute inset-0 flex flex-col items-center opacity-0 justify-center rounded-lg group-hover:opacity-100 transition duration-300">
                      <p className="text-orange-400 text-lg font-bold bg-white bg-opacity-60 rounded-xl w-36  p-5   ">
                        {name}
                      </p>
                    </div>
                  </NavLink>
                </div>
              );
            })
          ) : (
            <p>data not found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
