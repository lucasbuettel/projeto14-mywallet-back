import { postOutputs, getOutputs } from "../controllers/outputsControllers.js"
import {Router} from "express"

const router = Router();


router.post("/outputs", postOutputs);

router.get("/outputs", getOutputs);

export default router;