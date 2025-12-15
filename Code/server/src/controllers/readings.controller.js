const { prisma } = require("../db");

async function addReading(req, res) {
  const { deviceId, watts } = req.validated.body;

  const device = await prisma.device.findFirst({ where: { id: deviceId, userId: req.user.id } });
  if (!device) return res.status(404).json({ message: "Device not found" });

  const reading = await prisma.energyReading.create({
    data: { userId: req.user.id, deviceId, watts }
  });

  res.status(201).json({ reading });
}

async function currentUsage(req, res) {
  const userId = req.user.id;

  const devices = await prisma.device.findMany({
    where: { userId, isActive: true },
    select: { id: true }
  });

  const latestPerDevice = await Promise.all(
    devices.map(d =>
      prisma.energyReading.findFirst({
        where: { userId, deviceId: d.id },
        orderBy: { createdAt: "desc" },
        select: { watts: true, createdAt: true, deviceId: true }
      })
    )
  );

  const filtered = latestPerDevice.filter(Boolean);
  const totalWatts = filtered.reduce((sum, r) => sum + r.watts, 0);

  res.json({ totalWatts, latest: filtered });
}

async function dailyTotalsLastWeek(req, res) {
  const userId = req.user.id;
  const start = new Date();
  start.setDate(start.getDate() - 7);

  const readings = await prisma.energyReading.findMany({
    where: { userId, createdAt: { gte: start } },
    select: { watts: true, createdAt: true }
  });

  const map = {};
  for (const r of readings) {
    const day = r.createdAt.toISOString().slice(0, 10);
    map[day] = (map[day] || 0) + r.watts;
  }

  const days = Object.keys(map).sort().map(date => ({ date, totalWatts: map[date] }));
  res.json({ days });
}

module.exports = { addReading, currentUsage, dailyTotalsLastWeek };
