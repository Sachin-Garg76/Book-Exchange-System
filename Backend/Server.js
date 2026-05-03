const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 🔹 INIT APP (PEHLE)
const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(cors());

// 🔹 Routes import
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const exchangeRoutes = require("./routes/exchange");
const contactRoutes = require("./routes/contactRoutes");
const requestRoutes = require("./routes/requestRoutes");

// 🔹 Routes use
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/exchange", exchangeRoutes);
app.use("/api/exchange", requestRoutes); // ✅ ab yaha sahi hai
app.use("/api", contactRoutes);

// 🔹 MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// 🔹 Static folder
app.use("/uploads", express.static("uploads"));

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// 🔹 Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});