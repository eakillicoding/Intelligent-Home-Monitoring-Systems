const { prisma } = require("../db");

async function listDevices(req, res) {
  const devices = await prisma.device.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" }
  });
  res.json({ devices });
}

async function createDevice(req, res) {
  const { name, location, isActive } = req.validated.body;

  const device = await prisma.device.create({
    data: {
      userId: req.user.id,
      name,
      location,
      isActive: isActive ?? true
    }
  });

  res.status(201).json({ device });
}

async function updateDevice(req, res) {
  const id = Number(req.validated.params.id);

  const exists = await prisma.device.findFirst({ where: { id, userId: req.user.id } });
  if (!exists) return res.status(404).json({ message: "Device not found" });

  const device = await prisma.device.update({
    where: { id },
    data: req.validated.body
  });

  res.json({ device });
}

async function deleteDevice(req, res) {
  const id = Number(req.params.id);

  const exists = await prisma.device.findFirst({ where: { id, userId: req.user.id } });
  if (!exists) return res.status(404).json({ message: "Device not found" });

  await prisma.device.delete({ where: { id } });
  res.json({ message: "Device deleted" });
}

module.exports = { listDevices, createDevice, updateDevice, deleteDevice };
