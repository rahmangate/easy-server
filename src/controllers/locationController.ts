import { Request, Response, NextFunction } from "express";
import { Location } from "../models/Location";

export const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, address } = req.body;
    const location = new Location({ name, address });
    await location.save();
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

export const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locations = await Location.find();
    res.status(200).json({ success: true, data: locations });
  } catch (error) {
    next(error);
  }
};
