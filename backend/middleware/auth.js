import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Store user data for further requests

    if (!req.user.id) {
      return res.status(401).json({ success: false, message: "Invalid token: No user ID" });
    }

    next();
  } catch (error) {
    console.error("JWT Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
    }

    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
