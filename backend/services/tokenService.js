const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
const REFRESH_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000; 

if (!ACCESS_SECRET || !REFRESH_SECRET) {

  throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in .env');
}

class TokenService {
  generateAccessToken(user) {
    return jwt.sign({ sub: user._id.toString(), role: user.role }, ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRES_IN,
    });
  }

  generateRefreshToken(user) {

    const raw = jwt.sign(
      { sub: user._id.toString(), jti: crypto.randomUUID() },
      REFRESH_SECRET,
      { expiresIn: REFRESH_EXPIRES_IN }
    );
    return raw;
  }

  hashToken(rawToken) {
    return crypto.createHash('sha256').update(rawToken).digest('hex');
  }

  verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_SECRET);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_SECRET);
  }

  getRefreshTokenExpiryDate() {
    return new Date(Date.now() + REFRESH_EXPIRES_MS);
  }

  generateRawResetToken() {

    const raw = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHash('sha256').update(raw).digest('hex');
    return { raw, hash };
  }
}

module.exports = new TokenService();
