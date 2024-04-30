import express from "express";
import mainController from "../controllers/mainController.js"

const router = express.Router();


router.get('/', mainController.homePage);
router.get('/contact', mainController.contact);
router.post('/send-email', mainController.sendMail);

export default router;