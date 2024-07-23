const express = require("express");

const { upload } = require("../../../middlewares/uploadMiddleware");
const authMiddleware = require("../../../middlewares/authMiddleware");
const roleMiddleware = require("../../../middlewares/roleMiddleware");
const Question = require("../../../controllers/questionController");

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), Question.create);
router.get("/", Question.getMany);
router.delete("/", roleMiddleware.admin, Question.deleteById);

module.exports = router;