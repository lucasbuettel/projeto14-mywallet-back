import { postSingUp, getLogin } from "../controllers/authController.js";
import {Router} from "express"

const router = Router();

router.post("/signUp", postSingUp);

router.get("/login", getLogin);

export default router;