import mongoose from "mongoose";
import Logger from "../utils/logger";

class DBClient {
  uri: string;
  constructor(uri: string) {
    this.uri = uri;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri);
      Logger.info("MongoDB connected");
    } catch (err) {
      Logger.error("Could not connect to MongoDB", err);
    }
  }
}

export default DBClient;
