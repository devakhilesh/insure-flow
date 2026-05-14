import mongoose from "mongoose";
import { IUser } from "~~/server/types/users/userAuth.types";

const UserAuth = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 16,
      trim: true,
    },

    role: {
      type: String,
      enum: ["Customer", "Broker"],
      default: "Customer",
    },

    is_varified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<IUser>("User", UserAuth);

export default UserModel;
