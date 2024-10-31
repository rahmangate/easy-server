import express, { Application } from "express";
import * as dotenv from "dotenv";

import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import employeesRoutes from "./routes/employeeRoutes";
import settingsRoutes from "./routes/settingRoutes";
import locationRoutes from "./routes/locationRoutes";

//import dotenv from "dotenv";
import Logger from "./utils/logger";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Application = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => Logger.info("Connected to MongoDB"))
  .catch((err) => Logger.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/settings", settingsRoutes);

app.use(errorHandler);

export default app;
