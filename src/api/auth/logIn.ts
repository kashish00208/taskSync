import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import User from "@/models/User";
import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken';  
const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, email, password, role } = req.body;

    if (req.method === 'POST') {
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            await dbConnect();

            const existingUser = await User.findOne({ email });
            
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }

            // password matching
            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: existingUser._id, email: existingUser.email, role: existingUser.role },
                process.env.JWT_SECRET!,  
                { expiresIn: '1h' }       
            );

            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: existingUser._id,
                    email: existingUser.email,
                    username: existingUser.username,
                    role: existingUser.role
                }
            });

        } catch (error) {
            console.error("Error during login", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        console.error("Method not allowed, use POST request here");
        return res.status(405).json({ message: "Method not allowed" });
    }
};

export default login;
