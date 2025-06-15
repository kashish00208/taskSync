import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
import { hashPassword, createToken } from "../../lib/authutils";

const signUPHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Sign-up started")
  const { email, username, password } = req.body;
  console.log("Fteched data from user")

  // Checking if all fields are provided
  if (!email || !username || !password) {
    return res.status(400).json({ message: "Please provide all fields." });
  }
  console.log("check 1")
  try {
    // Connect database
    await dbConnect();
    console.log("database connected")
    // Check if the email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists. Try another email." });
    }

    // Hash the password
    console.log("Creating hashed passward for new User and ragistering into tha database")
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    console.log("New user created")

    const token = createToken({
      email: newUser.email,
      username: newUser.username,
    });
    console.log("token created for authentication")

    return res
      .status(201)
      .json({ message: "User created successfully!", token });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export default signUPHandler;