const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function signJwt(user) {
  return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    subject: String(user.id),
    expiresIn: "7d"
  });
}

function randomToken() {
  return crypto.randomBytes(32).toString("hex");
}

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

module.exports = { signJwt, randomToken, sha256 };
