const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // ❌ No token
    if (!authHeader) {
      return res.status(401).json({ msg: "No token, access denied ❌" });
    }

    // ✅ "Bearer TOKEN" → TOKEN nikaalo
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Token missing ❌" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, "secretKey");
req.user = decoded;

    next();

  } catch (err) {
    res.status(401).json({ msg: "Invalid token ❌" });
  }
};

module.exports = authMiddleware;