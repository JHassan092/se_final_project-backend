import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCurrentUser = async (req, res) => {
  try {
    const { username, profileImage } = req.body;

    const updateFields = {};
    if (username && username.trim() !== "") {
      updateFields.username = username.trim();
    }
    if (profileImage && profileImage.trim() !== "") {
      updateFields.profileImage = profileImage.trim();
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
