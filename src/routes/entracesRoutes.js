import { postEntraces, getEntraces } from "../controllers/entracesController.js";
import {Router} from "express"

const router = Router();

router.post("/entraces", postEntraces);

router.get("/entraces", getEntraces);

export default router;