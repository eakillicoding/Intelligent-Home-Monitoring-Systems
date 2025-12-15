const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const { validate } = require("../utils/validate");
const { addReadingSchema } = require("../schemas/reading.schemas");
const { addReading, currentUsage, dailyTotalsLastWeek } = require("../controllers/readings.controller");

router.post("/", requireAuth, validate(addReadingSchema), addReading);
router.get("/current", requireAuth, currentUsage);
router.get("/daily-last-week", requireAuth, dailyTotalsLastWeek);

module.exports = router;
