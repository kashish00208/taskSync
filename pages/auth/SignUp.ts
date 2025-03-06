import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { hashPassword, createToken } from '@/lib/authutils';

const signUPHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, username, password, role } = req.body;

    // Checking if all fields are provided
    if (!email || !username || !password || !role) {
      return res.status(400).json({ message: "Please provide all fields." });
    }

    try {
      // Connect database
      await dbConnect();

      // Check if the email already exists
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists. Try another email." });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create the new user
      const newUser = await User.create({
        email,
        username,
        password: hashedPassword,  
        role,
      });

      const token = createToken({ email: newUser.email, username: newUser.username });

      return res.status(201).json({ message: "User created successfully!", token });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Server error. Please try again later." })
    }
  } else {
    
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default signUPHandler;
