import { userModel } from "../../../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../../utils/helpers.js";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    let token = generateToken(user._id, user.name);
    return res.status(201).json({ message: "success", token });
  } else return res.status(400).json({ error: "user already exists" });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    let token = generateToken(user._id, user.name);
    return res.status(200).json({ message: "success", token });
  } else
    return res
      .status(404)
      .json({ error: "wrong credentials or user do not exist" });
};

export { signUp, signIn };
