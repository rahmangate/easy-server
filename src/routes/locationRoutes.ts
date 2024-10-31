import { Router } from "express";
import {
  createLocation,
  getLocations,
} from "../controllers/locationController";

const router = Router();

router.post("/", createLocation); // CREATE endpoint
router.get("/", getLocations); // READ endpoint

export default router;
