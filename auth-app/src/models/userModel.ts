import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      //role
      type: Boolean,
      default: false,
    },
    verifyUserToken: String,
    verifyUserExpiry: Date, //so user have to do it within time, not like 30day after he/she do
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
  },
  { timestamps: true },
);

//imp point, same as db
const User = mongoose.models.users || mongoose.model("User", userSchema);
//by default mongodb create collection with name "users", "User"= "users", naming convension mongodb => lowercase + prural
export default User;
