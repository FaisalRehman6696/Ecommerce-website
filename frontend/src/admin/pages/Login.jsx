import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../User/Footer";
import axios from "axios";

const Login = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cardOpen, setcardOpen] = useState(false);
  const toggleCard = () => setcardOpen(!cardOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    const logData = { ...value };
    try {
      const res = await axios.post(
        `https://ecommerce-website-3-tg4v.onrender.com/admin-login`,
        logData
      );

      const token = res.data.token;
      sessionStorage.setItem("token", token);

      alert(res.data.msg);

      navigate("/admindashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
                0
              </span>
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

      <div className="flex items-center justify-center min-h-screen ">
        <div className="bg-white shadow-lg  md:p-8 rounded-xl w-full max-w-md">
          <div className="text-center mb-4 mt-2">
            <div className="text-black text-xl font-semibold">
              <h1>Welcome Back!</h1>
            </div>
            <h3 className="text-slate-600">
              Log in to access your account and manage your preferences.
            </h3>
            <p className="text-gray-500">.</p>
          </div>

          <form onSubmit={Submit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-gray-700 font-medium block mb-1"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Your email"
                name="email"
                onChange={handleInput}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-gray-700 font-medium block mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Your password"
                name="password"
                onChange={handleInput}
                required
                className="w-full p-2 border rounded focus:outline-none  focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                class="h-4 w-4 accent-orange-500"
              />
              <label for="remember" class="text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="flex justify-start  mt-4 mb-3">
              <button
                type="submit"
                className="bg-black hover:bg-black-600 text-white font-semibold py-2  rounded transition duration-200 w-20"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
