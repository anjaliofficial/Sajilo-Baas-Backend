const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { uploadImage } = require("../middleware/upload");

const {
  uploadProfilePicture,
  uploadItemPhoto,
} = require("../controllers/media_controller");

// Upload profile picture
router.post(
  "/profile-picture",
  protect,
  uploadImage.single("profilePicture"),
  uploadProfilePicture
);

// Upload item photo
router.post(
  "/item-photo",
  protect,
  uploadImage.single("itemPhoto"),
  uploadItemPhoto
);

module.exports = router;
