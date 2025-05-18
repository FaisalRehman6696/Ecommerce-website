import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-60 bg-gray-900 text-white transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <div className="p-4 text-center font-bold text-xl border-b flex justify-between items-center">
          <span>Admin Dashboard</span>
        </div>
        <ul className="space-y-2 p-4">
          <li>
            <NavLink
              to="/AdminDashboard"
              className="flex items-center p-2 rounded hover:bg-gray-800"
            >
              <i className="fa-solid fa-house mr-2"></i>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/activelist"
              className="flex items-center p-2 rounded hover:bg-gray-800"
            >
              <i class="fa-solid fa-users mr-2"></i>Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className="flex items-center p-2 rounded hover:bg-gray-800"
            >
              <i className="fa-solid fa-ellipsis mr-2"></i>Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product"
              className="flex items-center p-2 rounded hover:bg-gray-800"
            >
              <i class="fa-solid fa-file mr-2"></i>Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/order"
              className="flex items-center p-2 rounded hover:bg-gray-800"
            >
              <i class="fa-solid fa-list mr-2"></i>Order
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
