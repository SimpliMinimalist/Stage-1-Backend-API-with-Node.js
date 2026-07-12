const { Router } = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const router = Router();
router.use("/api", authRoutes);
router.use("/api/users", userRoutes);
module.exports = router;
