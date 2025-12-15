const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { requireAuth } = require("../middleware/auth");
const { me, updateProfile, updateSettings, uploadProfilePicture } = require("../controllers/users.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "..", "uploads")),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`)
});
const upload = multer({ storage });

router.get("/me", requireAuth, me);
router.patch("/profile", requireAuth, updateProfile);
router.patch("/settings", requireAuth, updateSettings);
router.post("/profile-picture", requireAuth, upload.single("image"), uploadProfilePicture);

module.exports = router;
