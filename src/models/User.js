import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: false,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    my_list:{
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);


export default mongoose.models.User || mongoose.model("User", userSchema);