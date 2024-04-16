//Tous les imports nécessaires
import express from 'express';
import router from "./routers/router.js";
//fileUrlToPath sert a utiliser ensuite a configurer le filename pour configurer le path avec EJS (nécessaire en ES6)
import { fileURLToPath } from 'url';
import path from 'path';

//mise en place du path pour pouvoir utiliser EJS avec ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static('app/integration'));
app.use(router);

export default app;