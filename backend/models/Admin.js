import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
});
const ProductSchema = new mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  price: Number,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  productType: {
    type: String,
    enum: ["All", "Featured", "New"],
    default: "All",
  },
  image: String,
});

const OrderSchema = new mongoose.Schema({
  fullname: String,
  orderpic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    quantity: String,
  },
  totalamount: Number,
  deliverycharges: Number,
  address: String,
  phone: String,
  city: String,
  state: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  orderstatus: {
    type: String,
    enum: ["pending", "process", "completed", "cancelled"],
    default: "pending",
  },
});

const AdminLog = mongoose.model("AdminLog", AdminSchema);
const Category = mongoose.model("Category", CategorySchema);
const Product = mongoose.model("Product", ProductSchema);
const Order = mongoose.model("Order", OrderSchema);

export { Category, Product, Order ,AdminLog};
