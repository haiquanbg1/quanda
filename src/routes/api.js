const express = require("express");

const authApi = require("./apis/auth/authApi");
const userApi = require("./apis/user/userApi");
const questionApi = require("./apis/question/questionApi");

const router = express.Router();

router.use("/auth", authApi);

router.use("/user", userApi);

router.use("/question", questionApi);

module.exports = router;
