import express from 'express';
import router from "./routers/router.js"



const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views','./views');
app.use(router);

export default app;