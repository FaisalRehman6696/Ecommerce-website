import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Eccommerce from "./front/Eccommerce";

import Products from "./User/Products";
import AdminDashboard from "./admin/pages/AdminDashboard";
import Category from "./admin/pages/Category";
import Createcategory from "./admin/pages/Createcategory";
import Navbar from "./User/Navbar";
import Product from "./admin/pages/Product";
import CreateProduct from "./admin/pages/CreateProduct";
import Checkout from "./User/Checkout";
import Order from "./admin/pages/Order";
import OrderView from "./admin/pages/OrderView";
import ViewProduct from "./User/ViewProduct";
import ViewCategory from "./User/ViewCategory";
import Login from "./admin/pages/Login";
import Preloader from "./admin/components/Preloader";

const AppWrapper = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000); // simulate delay
    return () => clearTimeout(timeout);
  }, [location]);
  if (loading) {
    return <Preloader />;
  }
  return (
    <>
      {loading && <Preloader />}

      <Routes>
        <Route path="/" element={<Eccommerce />} />
        <Route path="/admin-login" element={<Login />} />

        <Route path="/admindashboard" element={<AdminDashboard />} />

        <Route path="/products" element={<Products />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/category" element={<Category />} />
        <Route path="/create-category" element={<Createcategory />} />
        <Route path="/product" element={<Product />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orderview/:_id" element={<OrderView />} />
        <Route path="/view-product/:_id" element={<ViewProduct />} />
        <Route path="/view-category/:_id" element={<ViewCategory />} />
      </Routes>
    </>
  );
};
function App() {
  return (
    <>
      <Router>
        <AppWrapper />
      </Router>
    </>
  );
}
export default App;
