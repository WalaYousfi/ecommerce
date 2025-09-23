import jwt from "jsonwebtoken";

export function generateToken(id, name) {
  return jwt.sign({ id, name }, process.env.SECRET_KEY);
}
