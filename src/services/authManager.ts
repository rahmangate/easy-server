import Logger from "../utils/logger";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs").promises;

class AuthManager {
  static privateKey = null;

  static async initialize() {
    if (!this.privateKey) {
      const privateKeyPath = path.join(__dirname, "../../priv.key");
      this.privateKey = await fs.readFile(privateKeyPath, "utf8");
      Logger.info("pivate key loaded..");
    }
  }

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload: any) {
    return jwt.sign(payload, this.privateKey, { algorithm: "RS256" });
  }

  static verifyToken(token: any) {
    return jwt.verify(token, this.privateKey, { algorithm: "RS256" });
  }
}

export default AuthManager;
