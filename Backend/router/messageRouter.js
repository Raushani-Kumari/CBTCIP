import express from "express";
import { login, sendMessage, signup } from "../controller/messageController.js";
import {loginValidation, signupValidation} from '../Middlewares/AuthValidation.js'

const router = express.Router();

router.post("/send", sendMessage);

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);

export default router;