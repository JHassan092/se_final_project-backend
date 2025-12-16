import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findbyId(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
