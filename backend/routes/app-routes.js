import express from "express";
import { AdminLogin } from "../controller/Admin-controller.js";
import {
  AddCategory,
  AddProduct,
  CancelOrder,
  ConfirmOrder,
  DeleteCategory,
  DeleteProduct,
  EditProduct,
  GetActiveProduct,
  GetCategory,
  GetOrder,
  GetOrderById,
  GetProduct,
  SaveOrder,
  UpdateCategory,
  UpdateProduct,
  GetCategoryById,
  GetNewProduct,
} from "../controller/User-controller.js";
import { upload } from "../controller/multer.js";

const router = express.Router();

router.get("/get-active-product", (req, res) => {
  res.json({ message: "Hello from backend" });
});

router.post("/admin-login", AdminLogin);
router.post("/add-category", upload.single("image"), AddCategory);
router.get("/get-category", GetCategory);
router.delete("/delete-category/:_id", DeleteCategory);
router.put("/update-category/:_id",  upload.single('image'), UpdateCategory);
router.put("/update-product/:_id",  upload.single('image'), UpdateProduct);
router.get("/get-new-product", GetNewProduct);

router.post("/add-product", upload.single('image'), AddProduct);
router.get("/get-product", GetProduct);
router.get("/get-category-by/:_id", GetCategoryById);

router.delete("/delete-product/:_id", DeleteProduct);

router.get("/get-active-product", GetActiveProduct);
router.post("/save-order",  upload.single('image'), SaveOrder)
router.delete("/delete-product", DeleteProduct);
router.put("/edit-product", EditProduct);
router.put("/confirm-order", ConfirmOrder);
router.put("/cancel-order", CancelOrder);
router.get("/get-order", GetOrder);
router.get("/get-order/:_id", GetOrderById);

export default router;
