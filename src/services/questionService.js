const { Question, Sequelize, sequelize } = require("../models/index");

const findAll = async (whereClause) => {
    return await Question.findAll({
        where: whereClause,
    });
};

const findOne = async (whereClause) => {
    return await Question.findOne({
        where: whereClause,
    });
};

const create = async (insertClause) => {
    return await Question.create(insertClause);
};

const findWithLimit = async (offset, limit) => {
    // return await Question.findAll({
    //     attributes: [
    //         'id',
    //         'title',
    //         'content',
    //         'vote',
    //         'createdAt',
    //         [Sequelize.fn('COUNT', Sequelize.col('Answers.id')), 'answer_count']
    //     ],
    //     include: [{
    //         model: Answer,
    //         as: 'Answers',
    //         attributes: []
    //     }],
    //     group: ['Question.id'],
    //     order: [
    //         ['vote', 'DESC'],
    //         [sequelize.literal('answer_count'), 'DESC'],
    //         ['createdAt', 'DESC']
    //     ],
    //     limit: limit,
    //     offset: offset
    // });
    const sql = `
      SELECT "Question"."id", "Question"."user_id", "Question"."title", "Question"."content", "Question"."vote", "Question"."created_at", "Question"."updated_at", COUNT("Answers"."id") AS "answer_count" FROM "questions" AS "Question" LEFT OUTER JOIN "answers" AS "Answers" ON "Question"."id" = "Answers"."question_id" GROUP BY "Question"."id" ORDER BY "Question"."vote" DESC, "answer_count" DESC, "Question"."created_at" DESC LIMIT :limit OFFSET :offset;
    `;

    const questions = await sequelize.query(sql, {
        replacements: { limit, offset },
        type: Sequelize.QueryTypes.SELECT
    });

    return questions;
};

const update = async (id, updateClause) => {

}

const drop = async (id) => {
    return await Question.destroy({
        where: {
            id
        }
    });
}

module.exports = {
    findAll,
    findOne,
    create,
    findWithLimit,
    update,
    drop
};
