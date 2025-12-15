const path = require("path");
const { prisma } = require("../db");

async function me(req, res) {
  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      profileImageUrl: true,
      settings: { select: { darkMode: true, widgetsJson: true } }
    }
  });

  res.json({ user });
}

async function updateProfile(req, res) {
  const userId = req.user.id;
  const { name } = req.body;

  const user = await prisma.user.update({
    where: { id: userId },
    data: { ...(typeof name === "string" ? { name } : {}) },
    select: { id: true, email: true, name: true, profileImageUrl: true }
  });

  res.json({ user });
}

async function updateSettings(req, res) {
  const userId = req.user.id;
  const { darkMode, widgetsJson } = req.body;

  const settings = await prisma.userSettings.upsert({
    where: { userId },
    update: {
      ...(typeof darkMode === "boolean" ? { darkMode } : {}),
      ...(typeof widgetsJson === "string" ? { widgetsJson } : {})
    },
    create: { userId, darkMode: !!darkMode, widgetsJson: widgetsJson || "[]" },
    select: { darkMode: true, widgetsJson: true }
  });

  res.json({ settings });
}

async function uploadProfilePicture(req, res) {
  const userId = req.user.id;
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const publicUrl = `/uploads/${path.basename(req.file.path)}`;

  const user = await prisma.user.update({
    where: { id: userId },
    data: { profileImageUrl: publicUrl },
    select: { id: true, email: true, name: true, profileImageUrl: true }
  });

  res.json({ user });
}

module.exports = { me, updateProfile, updateSettings, uploadProfilePicture };
