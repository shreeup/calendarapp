import mongoose from "mongoose";

enum role {
  normal,
  premium,
}
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: role,
    default: role.normal,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
