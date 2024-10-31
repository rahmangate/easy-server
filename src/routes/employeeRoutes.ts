import { Router } from "express";
import {
  createEmployee,
  getEmployees,
} from "../controllers/employeeController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", protect, createEmployee);
router.get("/", protect, getEmployees);

export default router;
