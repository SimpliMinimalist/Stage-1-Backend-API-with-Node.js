const { Router } = require("express");
const userController = require("../controllers/user.controller");
const authenticate = require("../middleware/auth.middleware");
const router = Router();
router.get("/:id", authenticate, userController.getUser);
module.exports = router;
