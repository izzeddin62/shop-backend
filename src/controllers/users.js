import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../db/models";

dotenv.config();

export async function createUser(req, res) {
  const { firstName, lastName, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: encryptedPassword,
  });

  console.log(user);
  const returnedUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  const token = jwt.sign(returnedUser, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  res.status(201).json({
    message: "User created successfully",
    user: returnedUser,
    token,
  });
}

export function getUser(req, res) {
  const { user } = req;
  res.status(200).json({
    message: "User retrieved successfully",
    user,
  });
}
