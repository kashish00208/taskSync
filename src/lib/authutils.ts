import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashedPasswoed = async(password:string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt)
} 

export const comparePass = async(password:string,hashedPasswoed:string) =>{
    return bcrypt.compare(password,hashedPasswoed)
}

//creating jsonwebtoken
export const createToken = (userID:string) =>{
    return jwt.sign({userID},process.env.JWT_KEY,{expiresin:'1h'});
} 