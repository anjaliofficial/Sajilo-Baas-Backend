const asyncHandler = require("../middleware/async");
const User = require("../models/user_model");

// Register
exports.createUser = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, address, password, role } = req.body;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    password,
    role,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(201).json({ success: true, data: userResponse });
});

// Login
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = user.getSignedJwtToken();

  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(200).json({
    success: true,
    token,
    data: userResponse,
  });
});
