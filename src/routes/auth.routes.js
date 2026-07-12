const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
} = require("../validators/auth.validator");
const validate = require("../middleware/validate.middleware");
const router = Router();
router.post("/register", registerValidation, validate, authController.register);
router.post("/login", loginValidation, validate, authController.login);
module.exports = router;
