import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";
const CreateProduct = () => {
  const [isOpen, setisOpen] = useState(false);
  const toggleSidebar = () => {
    setisOpen(!isOpen);
  };
  const [form, setform] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    status: "",
    productType: "",
    image: "",
  });
  const handleImage = (e) => {
    const file = e.target.files[0];
    setform({ ...form, image: file });
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const SubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("status", form.status);
    formData.append("productType", form.productType);
    formData.append("image", form.image); // Append image file

    try {
      const res = await axios.post(
        `http://localhost:3000/add-product`,
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
                Create Product
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
                Create Product
              </li>
            </ol>
          </div>

          {/* Form starts here */}
          <div className="p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] bg-white">
            <form>
              {/* Image Upload */}

              {/* Product Name */}
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter product name"
                  required
                />
              </div>
              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter product Description"
                  required
                />
              </div>
              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Category</option>
                  <option value="AIRPODS">AIRPODS</option>
                  <option value="ROLEX">ROLEX</option>
                </select>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter price"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Status</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </div>

              {/* Product Type */}
              <div className="mb-4">
                <label
                  htmlFor="productType"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Product Type
                </label>
                <select
                  id="productType"
                  name="productType"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Type</option>
                  <option value="All">All</option>
                  <option value="Featured">Featured</option>
                  <option value="New">New</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImage}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-700"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                  onClick={SubmitForm}
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
          {/* Form ends here */}
        </div>
      </main>
    </>
  );
};

export default CreateProduct;
