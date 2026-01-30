const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { uploadImage, uploadVideo } = require("../middleware/upload");
const {
  uploadProfilePicture,
  uploadItemPhoto,
  uploadItemVideo,
} = require("../controllers/media_controller");

// Profile picture
router.post(
  "/profile-picture",
  protect,
  uploadImage.single("profilePicture"),
  uploadProfilePicture
);

// Item photo
router.post(
  "/item-photo",
  protect,
  uploadImage.single("itemPhoto"),
  uploadItemPhoto
);

// Item video
router.post(
  "/item-video",
  protect,
  uploadVideo.single("itemVideo"),
  uploadItemVideo
);

module.exports = router;
