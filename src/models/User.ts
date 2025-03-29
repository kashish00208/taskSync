import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  role: string;
  password: string;
}

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  username: {
    type: String,
    required: [true, "Name is required"],
  },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Member"],
    required: [true, "Role is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

export default (mongoose.models.User as mongoose.Model<User>) || (mongoose.model("User",UserSchema))
