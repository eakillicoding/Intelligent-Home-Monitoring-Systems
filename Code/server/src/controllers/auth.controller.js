const bcrypt = require("bcrypt");
const { prisma } = require("../db");
const { signJwt, randomToken, sha256 } = require("../utils/tokens");

async function signup(req, res) {
  const { email, password, name } = req.validated.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      settings: { create: {} }
    },
    select: { id: true, email: true, name: true }
  });

  const token = signJwt(user);
  res.status(201).json({ user, token });
}

async function login(req, res) {
  const { email, password } = req.validated.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signJwt(user);
  res.json({
    user: { id: user.id, email: user.email, name: user.name, profileImageUrl: user.profileImageUrl },
    token
  });
}

async function resetRequest(req, res) {
  const { email } = req.validated.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.json({ message: "If the account exists, you can reset your password." });

  const raw = randomToken();
  const tokenHash = sha256(raw);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash, expiresAt }
  });

  res.json({
    message: "Reset token generated.",
    resetToken: raw
  });
}

async function resetConfirm(req, res) {
  const { resetToken, newPassword } = req.validated.body;
  const tokenHash = sha256(resetToken);

  const record = await prisma.passwordResetToken.findFirst({
    where: { tokenHash, usedAt: null, expiresAt: { gt: new Date() } }
  });

  if (!record) return res.status(400).json({ message: "Invalid or expired reset token" });

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } })
  ]);

  res.json({ message: "Password updated" });
}

module.exports = { signup, login, resetRequest, resetConfirm };
