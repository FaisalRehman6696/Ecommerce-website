import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Product = () => {
  const [isOpen, setisOpen] = useState(false);
  const toggleSidebar = () => {
    setisOpen(!isOpen);
  };
  const [list, setlist] = useState({});
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-website-3-tg4v.onrender.com/get-product"
        );
        setlist(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  const DeleteProduct = async (_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/delete-product/${_id}`
      );

      alert(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const [editData, seteditData] = useState({
    name: "",
    category: "",
    price: "",
    status: "",
    productType: "",
  });
  const [editModalOpen, seteditModalOpen] = useState(false);
  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("category", editData.category.name);
      formData.append("price", editData.price);
      formData.append("status", editData.status);
      formData.append("productType", editData.productType);
      if (editData.newImage) {
        formData.append("image", editData.newImage);
      }
      console.log(editData);
      const res = await axios.put(
        `http://localhost:3000/update-product/${editData._id}`,
        formData
      );
      alert(res.data.msg);
      window.location.reload();
      seteditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (rs) => {
    seteditData(rs);
    seteditModalOpen(true);
  };
  const handleEditChange = (e) => {
    seteditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    seteditData({ ...editData, newImage: file });
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

        <div className="container-fluid">
          <div className="flex justify-between items-center mt-5 mb-5">
            {/* Left side breadcrumb */}
            <ol className="breadcrumb flex space-x-2">
              <li
                className="breadcrumb-item active  text-2xl font-bold"
                aria-current="page"
              >
                Product
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
                Product
              </li>
            </ol>
          </div>

          {/* Top Section */}

          <div className="bg-white shadow rounded-lg p-3 mb-6">
            <NavLink
              to="/create-product"
              className="inline-block bg-blue-600 text-white px-3 py-2 font-semibold hover:bg-blue-700 transition duration-300 rounded-lg"
            >
              Add New Product
            </NavLink>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-4">Product List</h4>

            {/* Scrollable wrapper */}
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Image</th>
                    <th className="px-6 py-3">Product Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Product Type</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(list) && list.length > 0 ? (
                    list.map((rs, index) => {
                      if (!rs) return null;
                      const {
                        _id,
                        image,
                        name,
                        category,
                        price,
                        status,
                        productType,
                      } = rs;

                      return (
                        <tr key={_id} className="border-t">
                          <td className="px-6 py-3">{index + 1}</td>
                          <td className="px-6 py-3">
                            <img
                              src={`http://localhost:3000/${image}`}
                              alt=""
                              className="h-10 w-10 rounded object-cover"
                            />
                          </td>
                          <td className="px-6 py-3">{name}</td>
                          <td className="px-6 py-3">
                            {category?.name || "N/A"}
                          </td>
                          <td className="px-6 py-3">${price}</td>
                          <td className="px-6 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="px-6 py-3">{productType}</td>
                          <td className="px-6 py-3 space-x-2">
                            <button
                              onClick={() => handleEdit(rs)}
                              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => DeleteProduct(_id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
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

          {editModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto p-6">
                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
                  onClick={() => seteditModalOpen(false)}
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                  Edit Category
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                      placeholder="Category Name"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      value={editData.category.name}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    >
                      <option value="">Select a Category</option>

                      <option value="ROLEX">ROLEX</option>
                      <option value="AIR">AIR</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                      placeholder="Price"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Product Type */}
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                      Product Type
                    </label>
                    <input
                      type="text"
                      name="productType"
                      value={editData.productType}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                      placeholder="Product Type (e.g. Physical/Digital)"
                    />
                  </div>

                  {/* Image Preview */}
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                      Image (preview only)
                    </label>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${
                        editData.image
                      }`}
                      alt="Category"
                      className="h-24 w-24 object-cover rounded-lg border"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                      Upload New Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleUpdateProduct}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition duration-200"
                  >
                    Update Category
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Product;
