import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate=useNavigate()
  const token = sessionStorage.getItem("token");
  if (!token) {
    navigate("/admin-login");
  }
  const [isOpen, setisOpen] = useState(false);
  const toggleSidebar = () => {
    setisOpen(!isOpen);
  };

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
          <div className="mt-4 mb-5">
            <ol></ol>
            <ol className="breadcrumb flex space-x-2 text-gray-500 justify-end">
              <li className="breadcrumb-item">
                <a href="#" className="text-blue-500 ">
                  Dashboard /
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Home
              </li>
            </ol>
          </div>

          {/* Users */}

          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="text-lg font-semibold">Users Statistics</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { label: "Pending", value: 10 },
              { label: "Active", value: 20 },
              { label: "Freeze", value: 5 },
              { label: "Volunteer", value: 15 },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-6 text-center"
              >
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <h5 className="text-gray-600">{stat.label}</h5>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
