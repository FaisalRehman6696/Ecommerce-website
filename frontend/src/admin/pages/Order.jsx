import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Order = () => {
  
  const [isOpen, setisOpen] = useState(false);
  const toggleSidebar = () => {
    setisOpen(!isOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setshow] = useState("");
  console.log(show);
  const [list, setlist] = useState({});
  const getCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/get-order`);
      setlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <Sidebar isOpen={isOpen} />
      <main
        className={`content px-3 py-2 flex-1 transition-all duration-300 bg-slate-60 ${
          isOpen ? "ml-60" : "ml-0"
        }  bg-slate-300 min-h-screen`}
      >
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="container-fluid">
          <div className="flex justify-between items-center mt-5 mb-5">
            {/* Left side breadcrumb */}
            <ol className="breadcrumb flex space-x-2">
              <li
                className="breadcrumb-item active  text-2xl font-bold"
                aria-current="page"
              >
                Category
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

          {/* Top Section */}

          {/* Category Table */}
         <div className="bg-white shadow rounded-lg p-4">
  <h4 className="text-lg font-semibold mb-4">Order List</h4>
  
  {/* Wrapping the table in a container to handle overflow */}
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="px-4 py-2">#</th>
          <th className="px-4 py-2">orderpic</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">address</th>
          <th className="px-4 py-2">phone</th>
          <th className="px-4 py-2">city</th>
          <th className="px-4 py-2">state</th>
          <th className="px-4 py-2">total amoumt</th>
          <th className="px-4 py-2">delievery charges</th>
          <th className="px-4 py-2">createdAt</th>
          <th className="px-4 py-2">order status</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(list) && list.length > 0 ? (
          list.map((rs, index) => {
            if (!rs) return null;
            const {
              _id,
              orderpic,
              fullname,
              totalamount,
              deliverycharges,
              address,
              phone,
              city,
              state,
              orderstatus,
              createdAt,
            } = rs;
            return (
              <tr key={_id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2" style={{ cursor: "pointer" }}>
                  <img
                    src={
                      orderpic?.image
                        ? `http://localhost:3000/${orderpic.image}`
                        : ""
                    }
                    alt=""
                    className="h-8 w-8 rounded"
                    onClick={() => {
                      setshow(`http://localhost:3000/${orderpic.image}`);
                      setIsModalOpen(true);
                    }}
                  />
                </td>
                <td className="px-4 py-2">{fullname}</td>
                <td className="px-4 py-2">{address}</td>
                <td className="px-4 py-2">{phone}</td>
                <td className="px-4 py-2">{city}</td>
                <td className="px-4 py-2">{state}</td>
                <td className="px-4 py-2">{totalamount}</td>
                <td className="px-4 py-2">{deliverycharges}</td>
                <td className="px-4 py-2">{createdAt}</td>
                <td className="px-4 py-2">{orderstatus}</td>
                <td className="px-4 py-2 space-x-2">
                  <NavLink to={`/orderview/${_id}`}>
                    <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                      view
                    </button>
                  </NavLink>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="8" className="text-center py-4">
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

         {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  overflow-y-auto">
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative my-10 top-10">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        onClick={() => setIsModalOpen(false)}
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
        Selected Image
      </h2>
      <img
        src={show}
        alt="Selected"
        className="w-full h-auto rounded shadow-md"
      />
    </div>
  </div>
)}

        </div>
      </main>
    </>
  );
};

export default Order;
