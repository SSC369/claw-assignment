const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Session = require("../models/sessionModel");

module.exports.register = async (req, res, next) => {
  try {
    const { password, email, username } = req.body;
    //check that is there a same username exits
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({ message: "Username is already used!" });
    }

    //check that is there a same email exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    //create hashed pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const user = await User.findOne({ email });
    const userId = user._id;
    const ipAddress = req.ip;
    const newSession = new Session({
      userId,
      ipAddress,
    });

    await newSession.save();
    const secretKey = "SSC";
    const payload = {
      username,
      email,
      userId: user._id,
    };
    const jwtToken = await jwt.sign(payload, secretKey);

    return res.status(201).json({ jwtToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //authentication for user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Email is not registered!" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Incorrect Password :(" });
    const userId = user._id;
    const ipAddress = req.ip;
    const newSession = new Session({
      userId,
      ipAddress,
    });
    await newSession.save();
    const secretKey = "SSC";
    const payload = {
      username: user.username,
      email,
      userId: user._id,
    };
    const jwtToken = await jwt.sign(payload, secretKey);
    return res.status(200).json({ jwtToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.userProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, profileImage, email } = await User.findById(userId);

    return res
      .status(200)
      .json({ userDetails: { username, profileImage, userId, email } });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server issue :(" });
  }
};

module.exports.logout = async (req, res) => {
  try {
    const result = await Session.findByIdAndUpdate(
      req.body.sessionId,
      { $set: { logoutTime: Date.now() } },
      { new: true } // Option to return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({ message: "Session updated successfully", result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server issue :(" });
  }
};
