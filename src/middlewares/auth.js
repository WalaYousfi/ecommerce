import jwt from "jsonwebtoken";
import { userModel } from "../../models/user.model";

export async function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "unauthorized" });
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    return res.status(403).json({ message: "forbidden" });
    req.user = decoded;
    next();
  });
}

export async function authenticateAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "unauthorized" });
  const user = await userModel.findById(req.user.id);
  if (user.role != "admin")
    return res.status(403).json({ message: "forbidden" });
  next();
}
