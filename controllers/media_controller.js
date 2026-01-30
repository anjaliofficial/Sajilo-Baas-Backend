const asyncHandler = require("../middleware/async");
const User = require("../models/user_model");
const Item = require("../models/item_model");

// Upload profile picture
exports.uploadProfilePicture = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  const imageUrl = `${req.protocol}://${req.get("host")}/profile_pictures/${req.file.filename}`;

  // Save to MongoDB (User)
  req.user.profilePicture = imageUrl;
  await req.user.save();

  res.status(200).json({ success: true, imageUrl });
});

// Upload item photo
exports.uploadItemPhoto = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  const imageUrl = `${req.protocol}://${req.get("host")}/item_photos/${req.file.filename}`;

  // Save to MongoDB (Item)
  const item = await Item.create({ user: req.user._id, photo: imageUrl });
  
  res.status(200).json({ success: true, imageUrl, itemId: item._id });
});

// Upload item video
exports.uploadItemVideo = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No video uploaded" });

  const videoUrl = `${req.protocol}://${req.get("host")}/item_videos/${req.file.filename}`;

  // Save to MongoDB (Item)
  const item = await Item.create({ user: req.user._id, video: videoUrl });

  res.status(200).json({ success: true, videoUrl, itemId: item._id });
});
