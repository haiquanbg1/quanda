const { driver } = require("../../utils/neo4j");

const create = async (question_id, user_id) => {

}

const drop = async (question_id) => {
    const session = driver.session();
    const questionName = "ques" + question_id;
    try {
        await session.run(
            `MATCH (n:Question {name: $name}) DETACH DELETE n;`,
            { name: questionName }
        );
    } finally {
        await session.close();
    }
}

module.exports = {
    create,
    drop
}