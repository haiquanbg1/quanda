require("dotenv").config();

const express = require("express");
const cors = require("cors");

const serverConfig = require("./config/serverConfig");
const api = require("./routes/api");

const app = express();
const port = process.env.server_port;

serverConfig(app);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(
    "/api/ver1/",
    api
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})