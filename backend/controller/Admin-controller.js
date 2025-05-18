import { AdminLog } from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const AdminLogin = async (req, res) => {
 const { email, password } = req.body;
 console.log(req.body);
 try {
   const user = await AdminLog.findOne({ email });
   if (!user) {
     return res.status(400).json({ msg: "User not found" });
   }
   const Match = bcrypt.compare(password, user.password);
   if (!Match) {
     return res.send({ msg: "invalid Credential" });
   }
   const token = jwt.sign(
     {
       id: user.id,
       email: user.email,
     },
     process.env.JWT_SECRET
   );
   res.send({ msg: "Login Success", token });
 } catch (error) {
   console.log(error);
   return res.send({ msg: "error in finding" });
  }
};
