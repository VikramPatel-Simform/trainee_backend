const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String , unique: true},
  password: String,
});

const User = mongoose.model("users", UserSchema);
// Post API for the signup a
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Error signing up" });
  }
});

//Post API for login which return 
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json({ user: { id:user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: "Error logging in" });
  }
});

//Get API for fetching user using it's Id
app.get("/user/:id",async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from the URL parameter
    const objectId = new mongoose.Types.ObjectId(userId);
    // Find the user by their MongoDB ObjectId
    const user = await User.findById(objectId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    // Return the user if found
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//PUT API for updating the specific user
app.put('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from the URL parameter
    const { name, email, password } = req.body; // Get updated user data from the request body
    const objectId = new mongoose.Types.ObjectId(userId);

    
    // Find the user by ID and update the user with the new values
    const updatedUser = await User.findByIdAndUpdate(
      objectId, // The ID of the user to update
      { name, email, password }, // The new data to update
      { new: true} // Return the updated user 
    );
    
    // If the user is not found, return a 404 error
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user data
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));