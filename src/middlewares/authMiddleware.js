const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from request headers
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next(); // Continue to the next middleware/controller
  } catch (error) {
    res.status(401).json({ message: "Invalid Token. Authentication failed." });
  }
};

module.exports = authMiddleware;
