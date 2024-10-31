const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const bodyParser = require('body-parser');

const { readFileSync } = require('fs');
const { join } = require('path');

const resolvers = require('./src/graphql/resolvers');
const middlewares = require('./src/middlewares');

const schema = require('./src/schema');
const { sequelize } = require('./src/models');
const { HOST, PORT } = require('./src/constants');
const Logger = require('./logger');

const rabbitLogger = new Logger('RABBIT_MQ');
const serverLogger = new Logger('SERVER');

const app = express();
const jsonParser = bodyParser.json();

sequelize.sync().catch(
    error => console.log(`DB wasn't resolved, master! ${error.message}`)
);

middlewares.forEach(middleware => app.use(middleware));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

Object.entries(schema).forEach(([path, { mode, handler }]) => {
    try {
        app[mode](path, jsonParser, handler);
    } catch (error) {
        // Сейвит если мод у ручки указан кривой.
        console.log(`[ERROR]: ${path} ${mode} is not supported.`);
    }
});

const TYPEDEF_SCHEMA_PATH = join(__dirname, 'schema.graphql');
const typeDefs = readFileSync(TYPEDEF_SCHEMA_PATH, 'utf8');

const GRAPHQL_SCHEMA = makeExecutableSchema({
    typeDefs,
    resolvers,
});

app.use('/graphql', graphqlHTTP({
    schema: GRAPHQL_SCHEMA,
    graphiql: true,
}));

const initClient = require('./src/rabbitmq/client');
const initPublisher = require('./src/rabbitmq/publisher');

(async function() {
    const client = await initClient();
    const publisher = await initPublisher(client);
    
    app.post('/send_to_rabbit', jsonParser, async (req, res) => {
        let data = req.body;

        if (!data) {
            return res.status(400).json({
                error: 'BAD_BODY',
                message: 'No data was detected in request.'
            })
        }

        try {
            data = JSON.stringify(data);

            rabbitLogger.log("Sending a message...");
            await publisher.send(Buffer.from(data));
        } catch (error) {
            rabbitLogger.log("NOT_JSON_BODY")
            rabbitLogger.log(error)
            res.status(400).json({
                error: 'BAD_BODY',
                message: 'Body is not a valid JSON.'
            })
        }
    });

    // Отладочное, наверное потом выпилить
    app.post('/fatality', async () => {
        rabbitLogger.log("Force connection reset was called..");
        await client.close();
        rabbitLogger.log("EXpected connection reset was accomplished, hooray :c");

    })
})().then(
    () => rabbitLogger.log("Initializated the main source!")
).catch(error => rabbitLogger.log('[Oops! Initialization failed:', error))

app.listen(PORT, () => {
    serverLogger.log(`Service runs at ${HOST}:${PORT}`);
});