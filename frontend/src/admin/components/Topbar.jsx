import React, { useState } from "react";

const Topbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      {/* Main Content */}

      <div className="flex justify-between items-center">
        {/* Left menu icon */}
        <button
          className="p-2 text-black rounded mb-4"
          onClick={() => toggleSidebar()}
        >
          ☰
        </button>

        {/* Right side dropdown trigger */}
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer text-black font-medium px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <i class="fa-solid fa-user"></i>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                View Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;
