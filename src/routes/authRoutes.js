import { postSingUp, postLogin, getLogin } from "../controllers/authController.js";
import {Router} from "express"

const router = Router();

router.post("/signUp", postSingUp);

router.post("/login", postLogin);

router.get("/login", getLogin);

export default router;