import express, { Router } from "express";
import { registerEmployee, loginEmployee } from "../controllers/authController";

const router: Router = express.Router();

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);

export default router;
