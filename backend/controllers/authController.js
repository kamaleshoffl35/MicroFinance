const bcrypt = require("bcrypt");
const User = require("../models/User");
const tokenService = require("../services/tokenService");
const emailService = require("../services/emailService");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const SALT_ROUNDS = 12;
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000;
const MAX_ACTIVE_REFRESH_TOKENS = 5;

const isProd = process.env.NODE_ENV === "production";

const REFRESH_COOKIE_NAME = "refreshToken";
const refreshCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "strict",
  path: "/api/auth",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function sendAuthResponse(
  res,
  statusCode,
  { accessToken, rawRefreshToken, user },
) {
  res.cookie(REFRESH_COOKIE_NAME, rawRefreshToken, refreshCookieOptions);
  res.status(statusCode).json({
    success: true,
    data: { accessToken, user },
  });
}

async function findByEmail(email, withPassword = false) {
  const query = User.findOne({ email: email.toLowerCase() });
  if (withPassword) query.select("+password");
  return query.exec();
}

async function findById(id, withResetFields = false) {
  const query = User.findById(id);
  if (withResetFields)
    query.select("+passwordResetTokenHash +passwordResetExpires");
  return query.exec();
}

async function addRefreshToken(userId, tokenRecord) {
  return User.findByIdAndUpdate(
    userId,
    { $push: { refreshTokens: tokenRecord } },
    { new: true },
  );
}

async function removeRefreshToken(userId, tokenHash) {
  return User.findByIdAndUpdate(
    userId,
    { $pull: { refreshTokens: { tokenHash } } },
    { new: true },
  );
}

async function clearAllRefreshTokens(userId) {
  return User.findByIdAndUpdate(
    userId,
    { $set: { refreshTokens: [] } },
    { new: true },
  );
}

async function incrementFailedAttempts(userId, updates) {
  return User.findByIdAndUpdate(userId, updates, { new: true });
}

async function resetFailedAttempts(userId) {
  return User.findByIdAndUpdate(
    userId,
    {
      $set: { failedLoginAttempts: 0, lockUntil: null },
      $currentDate: { lastLoginAt: true },
    },
    { new: true },
  );
}

async function setPasswordResetToken(userId, tokenHash, expires) {
  return User.findByIdAndUpdate(
    userId,
    {
      $set: {
        passwordResetTokenHash: tokenHash,
        passwordResetExpires: expires,
      },
    },
    { new: true },
  );
}

async function findByResetTokenHash(tokenHash) {
  return User.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+passwordResetTokenHash +passwordResetExpires +password");
}

async function clearPasswordReset(userId) {
  return User.findByIdAndUpdate(
    userId,
    { $unset: { passwordResetTokenHash: "", passwordResetExpires: "" } },
    { new: true },
  );
}

async function issueTokenPair(user, { ip, userAgent }) {
  const accessToken = tokenService.generateAccessToken(user);
  const rawRefreshToken = tokenService.generateRefreshToken(user);
  const tokenHash = tokenService.hashToken(rawRefreshToken);
  const expiresAt = tokenService.getRefreshTokenExpiryDate();

  await addRefreshToken(user._id, {
    tokenHash,
    expiresAt,
    ip,
    userAgent,
  });

  const fresh = await findById(user._id);
  if (fresh.refreshTokens.length > MAX_ACTIVE_REFRESH_TOKENS) {
    const sorted = [...fresh.refreshTokens].sort(
      (a, b) => a.createdAt - b.createdAt,
    );
    const removeTokens = sorted.slice(
      0,
      sorted.length - MAX_ACTIVE_REFRESH_TOKENS,
    );
    for (const token of removeTokens) {
      await removeRefreshToken(user._id, token.tokenHash);
    }
  }

  return {
    accessToken,
    rawRefreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await findByEmail(email);
  if (existing) {
    throw new ApiError(
      409,
      "Unable to create account with the provided details",
    );
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role === "admin" ? "staff" : role || "staff",
  });

  const result = await issueTokenPair(user, {});
  sendAuthResponse(res, 201, result);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const genericError = () => new ApiError(401, "Invalid email or password");

  const user = await findByEmail(email, true);
  if (!user) throw genericError();

  if (user.isLocked) {
    throw new ApiError(
      423,
      "Account temporarily locked due to multiple failed login attempts. Try again later.",
    );
  }
  if (!user.isActive) throw new ApiError(403, "Account is deactivated");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const attempts = (user.failedLoginAttempts || 0) + 1;
    const updates = { failedLoginAttempts: attempts };
    if (attempts >= MAX_FAILED_ATTEMPTS) {
      updates.lockUntil = new Date(Date.now() + LOCK_TIME_MS);
    }
    await incrementFailedAttempts(user._id, updates);
    throw genericError();
  }

  await resetFailedAttempts(user._id);

  const result = await issueTokenPair(user, {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });
  sendAuthResponse(res, 200, result);
});

exports.refresh = asyncHandler(async (req, res) => {
  const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
  if (!rawRefreshToken) throw new ApiError(401, "Refresh token missing");

  let payload;
  try {
    payload = tokenService.verifyRefreshToken(rawRefreshToken);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await findById(payload.sub);
  if (!user) throw new ApiError(401, "Invalid refresh token");

  const tokenHash = tokenService.hashToken(rawRefreshToken);
  const stored = user.refreshTokens.find((t) => t.tokenHash === tokenHash);
  if (!stored || stored.expiresAt < new Date()) {
    await clearAllRefreshTokens(user._id);
    throw new ApiError(401, "Refresh token invalid — please log in again");
  }

  await removeRefreshToken(user._id, tokenHash);
  const result = await issueTokenPair(user, {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });
  sendAuthResponse(res, 200, result);
});

exports.logout = asyncHandler(async (req, res) => {
  const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
  if (req.user && rawRefreshToken) {
    const tokenHash = tokenService.hashToken(rawRefreshToken);
    await removeRefreshToken(req.user.id, tokenHash);
  }
  res.clearCookie(REFRESH_COOKIE_NAME, { path: "/api/auth" });
  res.status(200).json({ success: true, message: "Logged out" });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await findByEmail(email);

  if (user) {
    const { raw, hash } = tokenService.generateRawResetToken();
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    await setPasswordResetToken(user._id, hash, expires);

    const baseResetUrl = `${process.env.CLIENT_URL}/reset-password`;
    const resetUrl = `${baseResetUrl}?token=${raw}&email=${encodeURIComponent(user.email)}`;
    await emailService.sendPasswordResetEmail(user.email, resetUrl);
  }

  res.status(200).json({
    success: true,
    message: "If an account with that email exists, a reset link has been sent",
  });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, token, password } = req.body;

  const tokenHash = tokenService.hashToken(token);
  const user = await findByResetTokenHash(tokenHash);

  if (!user || user.email !== email.toLowerCase()) {
    throw new ApiError(400, "Reset token is invalid or has expired");
  }

  user.password = await bcrypt.hash(password, SALT_ROUNDS);
  await user.save();
  await clearPasswordReset(user._id);

  await clearAllRefreshTokens(user._id);

  res
    .status(200)
    .json({ success: true, message: "Password has been reset, please log in" });
});

exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
});
