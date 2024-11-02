import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
const bcrypt = require("bcryptjs");

class AuthManager {
  private static instance: AuthManager;
  private privateKey: string | null = null;

  private constructor() {}

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  private async readKey(): Promise<string> {
    return new Promise((resolve, reject) => {
      const privateKeyPath = path.join(__dirname, "../../priv.key");
      fs.readFile(privateKeyPath, "utf8", (err, data) => {
        if (err) {
          reject(new Error("Failed to load private key: " + err.message));
        } else {
          resolve(data);
        }
      });
    });
  }

  async initialize() {
    if (!this.privateKey) {
      this.privateKey = await this.readKey();
    }
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(payload: any) {
    if (!this.privateKey) {
      throw new Error("Private key is not initialized.");
    }
    return jwt.sign(payload, this.privateKey, { algorithm: "RS256" });
  }

  verifyToken(token: string) {
    if (!this.privateKey) {
      throw new Error("Private key is not initialized.");
    }
    return jwt.verify(token, this.privateKey, { algorithms: ["RS256"] });
  }
}

export default AuthManager.getInstance();
