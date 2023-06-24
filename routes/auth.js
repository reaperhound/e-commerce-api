const express = require("express")
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ success: false , error: "Enter User Credentials" });
      }
  
      const userExist = await User.findOne({ email: email });
  
      if (userExist) {
        return res.status(400).json({ success: false ,error: "User already exists" });
      }
  
      const user = new User({
        username,
        email,
        password,
      });
      await user.save();
  
      res.status(200).json({ sucess: true, data :user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ sucess: false ,error: "Registration failed", error });
    }
  });
  
  // auth Login
  router.post('/login', async (req, res) => {
      try {
          const { email, password } = req.body
  
          const user = await User.findOne({email: email })
  
          if (!user) {
              return res.status(401).json({ success: false, message: "User doesn't exist" });
            }
  
          if(user.password !== password ){
              return res.status(401).json({success : false , message: "Password doesn't match"})
          }
  
          res.status(201).json({data: user})
  
      } catch (error) {
          res.status(500).json({success: false ,message: "Login failed", error})
      }
  });

  module.exports = router