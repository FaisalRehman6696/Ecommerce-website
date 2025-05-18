import { Product, Order, Category } from "../models/Admin.js";

// export const AdminLogin=async(req,res)=>{
//   try{
//     if (!email || !password) {

//  return res.status(400).json({ msg: "Image is required" });
//     }
//     const User=await 

//   }catch{

//   }

// }

export const AddCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!req.file) {
    return res.status(400).json({ msg: "Image is required" });
  }

  const image = req.file.path.replace(/\\/g, "/");
  console.log(image);
  console.log(req.body);
  try {
    if (!name || !description || !image) {
      return res.status(400).json({ msg: "fields are required" });
    }
    const user = new Category({ name, description, image });
    await user.save();

    res.json({ msg: "Category added successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
export const GetCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    if (!category) {
      return res.json({ msg: "Category not found" });
    }
    console.log(category)
    return res.json(category);
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
export const GetCategoryById=async(req,res)=>{
 

try{
   const {_id}=req.params
  console.log(req.params)
  if(!_id){
  return res.json({ msg: "fields are required" });
  }
  const category=await Product.find({category:_id})
if (!category) {
      return res.json({ msg: "Category not found" });
    }
    console.log(category)
    res.json(category)
}catch(error){
console.log(error);
    return res.json({ msg: "Internal server error" });
}



}
export const DeleteCategory = async (req, res) => {
  const { _id } = req.params;

  console.log(_id);
  try {
    if (!_id) {
      return res.json({ msg: "fields are required" });
    }
    const category = await Category.findByIdAndDelete(_id);
    if (!category) {
      return res.json({ msg: "Category not found" });
    }
    res.json({ msg: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
export const UpdateCategory=async(req,res)=>{
 
 
  try {
     const { name, description } = req.body;
    const update = { name, description };

    if (req.file) {
      update.image = req.file.path.replace(/\\/g, "/"); // or `filename` if preferred
    }
  

    const updated = await Category.findByIdAndUpdate(
      req.params._id,
      update,
      { new: true }
  
    );
    if (!updated) {
      return res.json({ error: 'Category not found' });
    }
    res.json({ msg: 'Category updated successfully', category: updatedcategory });
  } catch (error) {
    res.json({ error: 'Failed to update category' });
  }
}
export const UpdateProduct=async(req,res)=>{

  try {
     const {
                        name,
                        category,
                        price,
                        status,
                        productType, } = req.body;
                        console.log(req.body)
    const findCategory = await Category.findOne({ name: category }); // or _id: category
    if (!findCategory) {
      return res.status(400).json({ error: "Invalid category" });
    }
    const update = {
                        name,
                        category:findCategory._id,
                        price,
                        status,
                        productType, };

console.log(req.body)
    if (req.file) {
      console.log(req.file.path)
      update.image = req.file.path.replace(/\\/g, "/"); // or `filename` if preferred
    }
  

    const updated = await Product.findByIdAndUpdate(
      req.params._id,
      update
  
    ).populate("category");
    if (!updated) {
      return res.json({ error: 'product not found' });
    }
    res.json({ msg: 'Product updated successfully', product: updated });
  } catch (error) {
    res.json({ error: 'Failed to update Product' });
  }
}
export const AddProduct = async (req, res) => {
  try {
     const { name,description, category, price, status, productType} = req.body;
  console.log(req.body);
    const update={name,description, category, price, status, productType}
    
    if (!name || !description|| !category || !price || !status || !productType) {
      return res.json({ msg: "fields are required" });
    }
    const findCategory = await Category.findOne({
      name: category,
    });
    if (!findCategory) {
      return res.json({ msg: "Category not found" });
    }
    console.log(findCategory);
    const productData = {
      name, category:findCategory._id, price, status, productType
    };
    if(req.file){
      console.log(req.file.path)
      productData.image=req.file.path.replace(/\\/g, "/")
    }
    const product=new Product(productData)
    await product.save();
    res.json({ msg: "Product added successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "internal server error" });
  }
};
export const GetProduct = async (req, res) => {
  try {
    const product = await Product.find({}).populate("category");
    if (!product) {
      return res.json({ msg: "Product not found" });
    }
    console.log(product);
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
export const GetActiveProduct = async (req, res) => {
  try {
    const product = await Product.find({ status: "active" }).populate(
      "category"
    );
    if (!product) {
      return res.json({ msg: "Product not found" });
    }
    console.log(product);
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
export const GetNewProduct = async (req, res) => {
  try {
    const product = await Product.find({ productType: "New" }).populate(
      "category"
    );
    if (!product) {
      return res.json({ msg: "Product not found" });
    }
    console.log(product);
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
export const SaveOrder = async (req, res) => {
  const {
    orderpic,
    fullname,
    totalamount,
    deliverycharges,
    address,
    phone,
    city,
    state,
    orderstatus,
  } = req.body;
  console.log(req.body);
  try {
    if (
      !orderpic ||
      !fullname ||
      !totalamount ||
      !deliverycharges ||
      !address ||
      !phone ||
      !city ||
      !state ||
      !orderstatus
    ) {
      return res.json({ msg: "fields are required" });
    }
    const order = new Order({
      orderpic,
      fullname,
      totalamount,
      deliverycharges,
      address,
      phone,
      city,
      state,

      orderstatus,
    });
    console.log(order);
    await order.save();
    res.json({ msg: "Order added successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "internal server error" });
  }
};
export const GetOrder = async (req, res) => {
  try {
    const order = await Order.find({}).populate("orderpic");
    if (!order) {
      return res.json({ msg: "order not found" });
    }
    console.log(order);
    return res.json(order);
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
export const GetOrderById = async (req, res) => {
  const product = await Order.findById(req.params._id).populate({
    path: "orderpic",
    populate: { path: "category", select: "name" },
  });
  if (!product) {
    return res.json({ msg: "order not found" });
  }
  console.log(product);
  return res.json(product);
};
export const DeleteProduct = async (req, res) => {
  const { _id } = req.params
  try {
    if (!_id) {
      return res.json({ msg: "fields are required" });
    }
    const product = await Product.findByIdAndDelete(_id);
    if (!product) {
      return res.json({ msg: "Product not found" });
    }
    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
export const EditProduct = async (req, res) => {
  const { id, image, name, category, price, status } = req.body;
  try {
    if (!id || !image || !name || !category || !price || !status) {
      return res.json({ msg: "fields are required" });
    }
    const product = await Product.findByIdAndUpdate(id, {
      image,
      name,
      category,
      price,
      status,
    });
    if (!product) {
      return res.json({ msg: "Product not found" });
    }
    res.json({ msg: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
export const ConfirmOrder = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.json({ msg: "fields are required" });
    }
    const order = await Order.findByIdAndUpdate(id, { status: "process" });
    if (!order) {
      return res.json({ msg: "Order not found" });
    }
    res.json({ msg: "Order confirmed successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
export const CancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.json({ msg: "fields are required" });
    }
    const order = await Order.findByIdAndUpdate(id, { status: "cancelled" });
    if (!order) {
      return res.json({ msg: "Order not found" });
    }
    res.json({ msg: "Order cancelled successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server error" });
  }
};
