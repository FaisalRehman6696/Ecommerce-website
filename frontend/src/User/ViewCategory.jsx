import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const ViewCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialcard = location.state?.rs;
  const { _id } = useParams();
  // console.log(_id);

  const [card, setCard] = useState(() => {
    const stored = sessionStorage.getItem("card");
    return stored ? JSON.parse(stored) : [initialcard];
  });
  useEffect(() => {
    sessionStorage.setItem("card", JSON.stringify(card));
  }, [card]);

  const [list, setlist] = useState([]);
  const [selectedId, setselectedId] = useState(_id);
  useEffect(() => {
    const handleCategoryChange = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-website-3-tg4v.onrender.com/get-category-by/${selectedId}`
        );

        setlist(res.data);
      } catch (err) {
        console.error("Failed to fetch category:", err);
      }
    };
    handleCategoryChange();
  }, [selectedId]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/get-category`); // Assumes endpoint returns all categories
        setCategory(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setselectedId(e.target.value);
  };

  return (
    <>
      {" "}
      <Navbar card={card} setCard={setCard} />
      <div className="max-w-6xl mx-auto px-6 mt-40">
        {/* PRODUCTS Section Heading */}
        <div className="text-center py-6 relative">
          <div className="w-16 h-[1px] bg-orange-400 mx-auto mb-2"></div>
          <h2 className="text-2xl font-semibold tracking-widest text-gray-800">
            PRODUCTS
          </h2>

          {/* Dropdown Positioned to the Right Below Heading */}
          <div className="absolute right-0 top-0 mt-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Category
            </label>
            <select
              className="w-40 p-2 border rounded text-sm"
              onChange={handleCategoryChange}
              value={selectedId}
            >
              <option value="">Select...</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}

              {/* Add more categories if needed */}
            </select>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {Array.isArray(list) && list.length > 0 ? (
            list.map((rs) => {
              const { _id, image, name, description, price } = rs;
              return (
                <div
                  key={_id}
                  className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-2xl p-4 transform transition-transform hover:scale-105 duration-300"
                >
                  <NavLink to={`/view-product/${_id}`} state={{ card, rs }}>
                    <img
                      src={`http://localhost:3000/${image}`}
                      alt={name}
                      className="rounded-2xl w-full object-cover mt-1 transition-transform hover:scale-105 duration-300"
                      style={{ height: "360px" }}
                    />
                  </NavLink>
                  <div className="mt-4">
                    <h3 className="font-bold text-lg text-gray-800">{name}</h3>
                    <p className="text-gray-600 text-sm">{description}</p>
                    <p className="text-gray-600 my-2">PKR {price}</p>
                    <button
                      className="mt-4 w-full bg-orange-300 hover:bg-orange-400 text-black font-semibold py-2 rounded-lg"
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
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewCategory;
