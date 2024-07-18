var express = require("express");
const userController = require("../../../controllers/user.controller");
const authMiddleware = require("../../../middlewares/authMiddleware");
var router = express.Router();

router.get("/profile", authMiddleware, userController.profile);

router.put("/refresh_token", userController.refreshToken);

module.exports = router;
