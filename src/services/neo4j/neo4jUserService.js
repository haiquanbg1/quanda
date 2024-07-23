const { driver } = require('../../utils/neo4j');

const neo4jUser = {
    create: async (user_id) => {
        const session = driver.session();
        const userName = "user" + user_id;
        try {
            const result = await session.run(
                `CREATE (a:User {name: $name}) RETURN a`,
                { name: userName }
            );

            const singleRecord = result.records[0];
            const node = singleRecord.get(0);
            return node.properties;
        } finally {
            await session.close();
        }
    },
};

module.exports = neo4jUser;