const express = require('express');

const Auth = require("../../controllers/authController");

const router = express.Router();

router.post("/login", Auth.login);
router.post("/register", Auth.register);
router.post("/refreshToken", Auth.refreshToken);

module.exports = router;