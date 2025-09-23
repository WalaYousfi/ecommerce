import jwt from "jsonwebtoken";

export async function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "unauthorized" });
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    return res.status(403).json({ message: "forbidden" });
    req.user = decoded;
    next();
  });
}
