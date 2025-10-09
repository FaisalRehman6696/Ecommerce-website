import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const card =
    location.state?.card ?? JSON.parse(sessionStorage.getItem("card")) ?? [];
  const [shippingInfo, setShippingInfo] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });

  const Submit = async (e) => {
    e.preventDefault;
    const Data = {
      fullname: shippingInfo.fullname,
      orderpic: card.map((item) => item._id),
      totalamount: total,
      deliverycharges: DELIVERY_CHARGES,
      address: shippingInfo.address,
      phone: shippingInfo.phone,
      city: shippingInfo.city,
      state: shippingInfo.state,
      orderstatus: "pending", // ✅ Add this
    };
    const res = await axios.post(`https://ecommerce-website-5-195j.onrender.com/save-order`, Data);
    alert(res.data.msg);
    setShippingInfo({
      fullname: "",
      address: "",
      city: "",
      state: "",
      phone: "",
    });
    sessionStorage.removeItem("card");
  };
  const DELIVERY_CHARGES = 200;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const total = card.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="fullname"
            value={shippingInfo.fullname}
            placeholder="Enter Your Name"
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="123 Main St"
            value={shippingInfo.address}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingInfo.state}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={shippingInfo.phone}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full md:col-span-2"
          />
        </div>

        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <ul className="mb-4">
          {Array.isArray(card) && card.length > 0 ? (
            card.map((item) => {
              const { _id, name, price, quantity = 1 } = item;
              return (
                <li key={_id} className="flex justify-between text-gray-700">
                  <span>
                    {name} (x{quantity})
                  </span>
                  <span>Rs. {price * quantity}</span>
                </li>
              );
            })
          ) : (
            <tr>
              <p colSpan="8" className="text-center py-4">
                No data found
              </p>
            </tr>
          )}
        </ul>
        <div className="flex justify-between text-gray-700">
          <span>Delivery Charges:</span>
          <span>Rs. {DELIVERY_CHARGES}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-2 text-blue-600">
          <span>Total:</span>
          <span>Rs. {total + DELIVERY_CHARGES}</span>
        </div>

        <button
          onClick={Submit}
          className="mt-6 submit bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 "
        >
          Order Now
        </button>
      </div>
    </>
  );
};

export default Checkout;
