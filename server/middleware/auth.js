const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ success: false, message: "not authorized" });
  }
  try {
    const userId = jwt.decode(token, process.env.JWT_SECRET);
    if (!userId) {
      return res.json({ success: false, message: "Not authorized" });
    }
    req.user = await User.findById(userId).select("-password");
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
