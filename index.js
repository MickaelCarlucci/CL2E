import dotenv from 'dotenv';
dotenv.config();

import {createServer} from "node:http";

import expressApp from "./app/index.app.js";
const PORT = process.env.PORT || 8080;
const httpServer = createServer(expressApp);
httpServer.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port ${PORT}` )
});