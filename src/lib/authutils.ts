import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

// Creating JWT token
export const createToken = (user: { email: string; username: string; }) => {
  const payload = {
    email: user.email,
    username: user.username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
};
