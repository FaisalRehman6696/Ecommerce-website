import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";

const Createcategory = () => {
  const [isOpen, setisOpen] = useState(false);
  const toggleSidebar = () => {
    setisOpen(!isOpen);
  };
  const [form, setform] = useState({
    name: "",
    description: "",
    image: "",
  });
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setform({ ...form, [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
  };
  const SubmitForm = async (e) => {
    e.preventDefault();
    // const postData = { ...form };
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("image", form.image);
      const res = await axios.post(
        `https://ecommerce-website-3-ewl0.onrender.com/add-category`,
        formData
      );
      alert(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Sidebar isOpen={isOpen} />
      <main
        className={`content px-3 py-2 flex-1 transition-all duration-300 bg-slate-60 ${
          isOpen ? "ml-60" : "ml-0"
        }  bg-slate-300 min-h-screen`}
      >
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="container-fluid px-10 ">
          <div className="flex justify-between items-center mt-5 mb-5">
            {/* Left side breadcrumb */}
            <ol className="breadcrumb flex space-x-2">
              <li
                className="breadcrumb-item active  text-2xl font-bold"
                aria-current="page"
              >
                Add New Category
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
                Create Category
              </li>
            </ol>
          </div>
          {/* Form starts here */}
          <div className=" p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] bg-white">
            <form>
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter category name"
                />
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter description"
                ></textarea>
              </div>

              {/* Choose Image Field */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Choose Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImage}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-700"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 justify-end flex"
                onClick={SubmitForm}
              >
                Create Category
              </button>
            </form>
          </div>
          {/* Form ends here */}
        </div>
      </main>
    </>
  );
};

export default Createcategory;
