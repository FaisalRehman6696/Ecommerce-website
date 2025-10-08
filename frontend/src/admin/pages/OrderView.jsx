import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const OrderView = () => {
  const [isOpen, setisOpen] = useState(false);
  const toggleSidebar = () => {
    setisOpen(!isOpen);
  };
  const { _id } = useParams();
  const [list, setlist] = useState({});
  const getCategory = async () => {
    try {
      const res = await axios.get(`https://ecommerce-website-3-ewl0.onrender.com/get-order/${_id}`);
      setlist(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const total = list.totalamount + list.deliverycharges;
  return (
    <>
      <Sidebar isOpen={isOpen} />
      <main
        className={`content px-3 py-2 flex-1 transition-all duration-300 bg-slate-60 ${
          isOpen ? "ml-60" : "ml-0"
        } bg-slate-300 min-h-screen`}
      >
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="container-fluid ">
          <div className="flex justify-between items-center mt-5 mb-5">
            {/* Left side breadcrumb */}
            <ol className="breadcrumb flex space-x-2">
              <li
                className="breadcrumb-item active  text-2xl font-bold"
                aria-current="page"
              >
                Order Detail
              </li>
            </ol>

            {/* Right side breadcrumb */}
            <ol className="breadcrumb flex space-x-2 text-gray-500">
              <li className="breadcrumb-item">
                <a href="#" className="text-blue-500">
                  Dashboard /
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Order
              </li>
            </ol>
          </div>

          {/* Users */}

          <div className="container mx-auto px-4 mt-6">
            {/* Customer Info */}
            <NavLink to="/order">
              {" "}
              <button className="mb-7 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-500">
                Back to Orders
              </button>
            </NavLink>

            <div className="bg-white shadow rounded-lg p-6 mb-4">
              <h2 className="text-xl font-semibold mb-2">
                Customer Information
              </h2>
              <p>
                <span className="font-semibold">Full Name:</span>{" "}
                {list.fullname}
              </p>
              <p>
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(list.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Product Info */}
            <div className="bg-white shadow rounded-lg p-6 mb-4">
              <h2 className="text-xl font-semibold mb-2">{list.orderpic?.name}</h2>
              <p>
                <span className="font-semibold">Category:</span>
                {list.orderpic?.category.name}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>
                {list.quantity}
              </p>
              <p>
                <span className="font-semibold">Price:</span> {list.totalamount}
              </p>
              <p>
                <span className="font-semibold">Total:</span> {list.totalamount}
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-blue-600 font-medium">Subtotal:</span>
                <span className="text-blue-600"> {list.totalamount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-blue-600 font-medium">
                  Delivery Charges:
                </span>
                <span className="text-blue-600"> {list.deliverycharges}</span>
              </div>
              <div className="flex justify-between mt-4 text-lg font-semibold">
                <span>Total:</span>
                <span>{total}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderView;
