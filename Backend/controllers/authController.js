const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ REGISTER
exports.signup = async (req, res) => {
  const { name, email, phone, password, address } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Required fields missing ❌" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      address
    });

    res.json({
      message: "User Registered Successfully ✅"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secretKey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful ✅",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};