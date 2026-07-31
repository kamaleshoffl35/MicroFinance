const tokenService = require('../services/tokenService');

const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');


exports.protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new ApiError(401, 'Not authenticated');
  }

  let payload;
  try {
    payload = tokenService.verifyAccessToken(token);
  } catch {
    throw new ApiError(401, 'Session expired, please log in again');
  }

  const user = await userRepository.findById(payload.sub);
  if (!user || !user.isActive) {
    throw new ApiError(401, 'Not authenticated');
  }

  req.user = { id: user._id.toString(), role: user.role, email: user.email, name: user.name };
  next();
});


exports.authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'));
  }
  next();
};
