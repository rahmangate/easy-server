import express from "express";
import { CustomError } from "../utils/customError";

const router = express.Router();

router.get("/test-error", (req, res, next) => {
  next(new CustomError("This is a test error", 400));
});

export default router;
