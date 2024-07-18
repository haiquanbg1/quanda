const express = require("express");

const authApi = require("./apis/auth/authApi");
const userApi = require("./apis/user/userApi");

const router = express.Router();

router.use("/auth", authApi);

router.use("/user", userApi);

module.exports = router;
