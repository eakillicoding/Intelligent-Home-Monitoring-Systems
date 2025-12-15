const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const { validate } = require("../utils/validate");
const { createDeviceSchema, updateDeviceSchema } = require("../schemas/device.schemas");
const { listDevices, createDevice, updateDevice, deleteDevice } = require("../controllers/devices.controller");

router.get("/", requireAuth, listDevices);
router.post("/", requireAuth, validate(createDeviceSchema), createDevice);
router.patch("/:id", requireAuth, validate(updateDeviceSchema), updateDevice);
router.delete("/:id", requireAuth, deleteDevice);

module.exports = router;
