import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = ({ card, setCard }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cardOpen, setcardOpen] = useState(false);
  const toggleCard = () => setcardOpen(!cardOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const data = sessionStorage.getItem("card");
    if (data) {
      setCard(JSON.parse(data));
    }
  }, [setCard]);
  const updateQuantity = (type, index) => {
    const updatedCard = card.map((item, i) => {
      if (i === index) {
        const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(newQty, 1) };
      }
      return item;
    });
    setCard(updatedCard);
    sessionStorage.setItem("card", JSON.stringify(updatedCard));
  };

  const removeItem = (id) => {
    const updatedCard = card.filter((item) => item._id !== id);
    setCard(updatedCard);
    sessionStorage.setItem("card", JSON.stringify(updatedCard));
  };
  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">⌚</div>

          {/* Desktop Links */}
          <div
            className="hidden md:flex space-x-6 font-medium "
            style={{ flexGrow: 0.4 }}
          >
            <a href="#home" className="text-orange-300">
              Home
            </a>
            <a
              href="#categories"
              className="text-gray-700 hover:text-orange-300 delay-150 transition-colors"
            >
              Categories
            </a>
            <a
              href="#products"
              className="text-gray-700 hover:text-orange-300 delay-150 transition-colors"
            >
              Products
            </a>
            <a
              href="#new"
              className="text-gray-700 hover:text-orange-300  delay-150 transition-colors"
            >
              New
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-xl hidden md:block">🌙</button>
            <div className="relative ">
              <button className="text-xl" onClick={toggleCard}>
                🛒
              </button>
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                {card?.length || 0}
              </span>
            </div>

            <div
              className={`fixed top-0 right-0 h-full w-full md:w-[410px]  bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                cardOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold"></h2>
                <button onClick={toggleCard}>
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-4 p-6 font-medium">
                <div className="flex flex-col space-y-4 items-center">
                  <p className="text-gray-700">Your Cart </p>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                  {Array.isArray(card) && card.length > 0 ? (
                    card.map((rs, index) => {
                      const { _id, image, name, price, quantity = 1 } = rs;
                      return (
                        <div
                          key={_id}
                          className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
                        >
                          <img
                            src={`https://ecommerce-website-2nkk.onrender.com/${image}`}
                            alt=""
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 ml-4">
                            <h3 className="text-lg font-semibold">{name}</h3>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity("dec", index)}
                                className="px-2 bg-gray-200 rounded"
                              >
                                -
                              </button>
                              <span>{quantity}</span>
                              <button
                                onClick={() => updateQuantity("inc", index)}
                                className="px-2 bg-gray-200 rounded"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <p className="text-sm font-semibold text-gray-700">
                              PKR {price}
                            </p>
                            <button
                              onClick={() => removeItem(rs._id)}
                              className="text-red-500 hover:text-red-700 text-sm font-bold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>no items</p>
                  )}
                  <div className="flex justify-between text-lg font-semibold border-t pt-4">
                    <span>Total:</span>
                    <span>
                      PKR{" "}
                      {Array.isArray(card)
                        ? card.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )
                        : 0}
                    </span>
                  </div>
                  <NavLink to="/checkout" state={{ card }}>
                    <button className="w-full bg-orange-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-500 transition mt-2">
                      Checkout
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Mobile Menu Icon */}
            <button className="md:hidden text-2xl" onClick={toggleMenu}>
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold"></h2>
          <button onClick={toggleMenu}>
            <FaTimes size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 items-center p-6 font-medium">
          <a href="#home" onClick={toggleMenu} className="text-orange-300">
            Home
          </a>
          <a
            href="#categories"
            onClick={toggleMenu}
            className="text-gray-700 hover:text-orange-300"
          >
            Categories
          </a>
          <a
            href="#products"
            onClick={toggleMenu}
            className="text-gray-700 hover:text-orange-300"
          >
            Products
          </a>
          <a
            href="#new"
            onClick={toggleMenu}
            className="text-gray-700 hover:text-orange-300"
          >
            New
          </a>
        </div>
      </div>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/923128077934"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 z-50"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-7 h-7"
        />
      </a>
    </>
  );
};

export default Navbar;
