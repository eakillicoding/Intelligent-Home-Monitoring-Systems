const router = require("express").Router();
const { validate } = require("../utils/validate");
const { signupSchema, loginSchema, resetRequestSchema, resetConfirmSchema } = require("../schemas/auth.schemas");
const { signup, login, resetRequest, resetConfirm } = require("../controllers/auth.controller");

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/reset/request", validate(resetRequestSchema), resetRequest);
router.post("/reset/confirm", validate(resetConfirmSchema), resetConfirm);

module.exports = router;
