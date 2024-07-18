const express = require("express");

const router = express.Router();
const authController = require("../../../controllers/authController");
const authValidation = require("../../../validations/auth.validation");

router.post("/register", authValidation.registerAuth, authController.register);

router.post("/login", authValidation.loginAuth, authController.login);

router.delete("/logout", authController.logout);

module.exports = router;
