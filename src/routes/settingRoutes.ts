import { Router } from "express";
import {
  createSetting,
  getSetting,
  updateSetting,
} from "../controllers/settingController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", protect, createSetting);
router.get("/", getSetting);
router.put("/", protect, updateSetting);

export default router;
