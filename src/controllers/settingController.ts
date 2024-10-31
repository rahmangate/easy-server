// controllers/settingController.ts
import { Request, Response, NextFunction } from "express";
import { Setting } from "../models/Setting";
import { AppError } from "../utils/appError";

// Create setting
export const createSetting = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { isGlobalTrackingEnabled } = req.body;

    const newSetting = new Setting({ isGlobalTrackingEnabled });
    await newSetting.save();

    return res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Get setting
export const getSetting = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const setting = await Setting.findOne();
    if (!setting) {
      throw new AppError("Setting not found", 404);
    }

    return res.status(200).json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
};

// Update setting
export const updateSetting = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { isGlobalTrackingEnabled } = req.body;

    const setting = await Setting.findOne();
    if (!setting) {
      return res
        .status(404)
        .json({ success: false, message: "Setting not found" });
    }

    setting.isGlobalTrackingEnabled = isGlobalTrackingEnabled;
    await setting.save();

    return res.status(200).json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
};
