const asyncHandler = require("../middleware/async");
const User = require("../models/user_model"); // <-- import User model

// Upload profile picture
exports.uploadProfilePicture = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/profile_pictures/${req.file.filename}`;

  // Save to MongoDB
  req.user.profilePicture = imageUrl;
  await req.user.save();

  res.status(200).json({
    success: true,
    imageUrl,
  });
});

// Upload item photo
exports.uploadItemPhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/item_photos/${req.file.filename}`;

  // Optionally, save item photos to MongoDB if you have an "items" model
  // Example: req.user.items.push({ photo: imageUrl });

  res.status(200).json({
    success: true,
    imageUrl,
  });
});
