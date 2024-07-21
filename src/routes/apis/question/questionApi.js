const express = require("express");

const { upload } = require("../../../middlewares/uploadMiddleware");
const authMiddleware = require("../../../middlewares/authMiddleware");
const Question = require("../../../controllers/questionController");

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), Question.create);
router.get("/", Question.getMany);

module.exports = router;