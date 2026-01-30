const asyncHandler = require("../middleware/async");

// Upload profile picture
exports.uploadProfilePicture = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/profile_pictures/${req.file.filename}`;

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

  res.status(200).json({
    success: true,
    imageUrl,
  });
});
