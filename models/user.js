import mongoose from "mongoose";

// Define the UserSchema for the User model
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,  // Email is required
    unique: true,    // Email must be unique
  },
  password: {
    type: String,
    required: true,  // Password is required
  },
});

// Create the User model if it doesn't already exist
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
