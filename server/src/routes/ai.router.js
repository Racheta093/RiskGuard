import { Router } from "express";

import {
  summary,
  explain,
  quiz,
  flashcards, 
  viva,
  keypoints,
} from "../controllers/ai.controller.js";

const router = Router();

router.post("/summary", summary);

router.post("/explain", explain);

router.post("/quiz", quiz);

router.post("/flashcards", flashcards);

router.post("/viva", viva);

router.post("/keypoints", keypoints);

export default router;
