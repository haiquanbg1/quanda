const express = require('express');

const authApi = require("./apis/authApi");

const router = express.Router();

router.use("/auth", authApi);

module.exports = router;