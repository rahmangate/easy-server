import express, { Application } from "express";
import * as dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import employeesRoutes from "./routes/employeeRoutes";
import settingsRoutes from "./routes/settingRoutes";
import locationRoutes from "./routes/locationRoutes";

import { errorHandler } from "./middlewares/errorHandler";
import DBClient from "./infrastructure/DBClient";

dotenv.config();

const app: Application = express();

app.use(express.json());

const dbClient = new DBClient(process.env.MONGO_URI as string);
dbClient.connect();

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/settings", settingsRoutes);

app.use(errorHandler);

export default app;
