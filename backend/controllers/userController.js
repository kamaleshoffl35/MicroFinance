const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

exports.getUsers = asyncHandler(async (req, res) => {
  const { search, role } = req.query;

  let filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },

      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (role) {
    filter.role = role.toLowerCase();
  }

  const users = await User.find(filter)
    .populate("permissions", "name")
    .select("-password -refreshTokens")
    .sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("permissions", "name")
    .select("-password -refreshTokens");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, permissions } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    throw new ApiError(400, "Email already exists");
  }

  const bcrypt = require("bcrypt");

  const hash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,

    email,

    password: hash,

    role,
    permissions,
  });

  res.status(201).json({
    success: true,

    message: "User created successfully",

    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, permissions, isActive } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,

    {
      name,

      email,

      role,
      permissions,

      isActive,
    },

    {
      new: true,
    },
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,

    message: "User updated successfully",

    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,

    message: "User deleted successfully",
  });
});
