const questionService = require("../services/questionService");
const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../utils/response");
const minioService = require("../services/minioService");
const neo4jQuestion = require("../services/neo4j/neo4jQuestionService");
const fs = require("fs");

const create = async (req, res) => {
    const { userId } = req.jwtDecoded;
    const fileUpload = req.file;
    const { title, content } = req.body;

    // create new question
    const question = await questionService.create({
        user_id: userId,
        title,
        content
    }).catch((err) => {
        console.log(err);
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    });

    await neo4jQuestion.create(question.id, question.user_id);

    // check and upload image
    if (fileUpload) {
        await minioService.upload("qanda", "ques" + question.id, fileUpload.path)
            .catch((err) => {
                console.log(err);
                return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, err.message);
            });

        // Xóa file tạm thời
        fs.unlinkSync(fileUpload.path, (unlinkErr) => {
            if (unlinkErr) {
                return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, unlinkErr.message);
            }
        });
    }

    return successResponse(res, StatusCodes.CREATED, "Create question successfully.");
}

const getMany = async (req, res) => {
    const { page } = req.query;

    const limit = 10;
    const offset = limit * page;

    // Lấy data từ db
    let questions = await questionService.findWithLimit(offset, limit);

    // Lấy link ảnh
    for (let i = 0; i < questions.length; i++) {
        questions[i].image = await minioService.getUrl("qanda", "ques" + questions[i].id);
    }

    return successResponse(res, StatusCodes.OK, "Get question successfully.", questions);
}

const deleteById = async (req, res) => {
    const questionId = req.query.questionId;

    await questionService.drop(questionId)
        .catch((err) => {
            console.log(err);
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, err.message);
        });

    const checkDelete = await minioService.deleteFile("qanda", "ques" + questionId);

    if (checkDelete) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, checkDelete.message);
    }

    await neo4jQuestion.drop(questionId)
        .catch((err) => {
            console.log(err);
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, err.message);
        });

    return successResponse(res, StatusCodes.OK, "Delete question successfully.");
}



module.exports = {
    create,
    getMany,
    deleteById,
}