import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // not returned in queries by default
    },
    avatarUrl: {
      type: String,
    },

    // ---------------------------
    // Authorization
    // ---------------------------
    role: {
      type: String,
      enum: ["viewer", "producer", "admin"],
      default: "viewer",
      index: true,
    },

})


export const User = mongoose.model("User", userSchema);