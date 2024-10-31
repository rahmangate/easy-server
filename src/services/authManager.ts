const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

class AuthManager {
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload: any) {
    const privateKeyPath = path.join(__dirname, "../priv.key");
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    return jwt.sign(payload, privateKey, { algorithm: "RS256" });
  }

  static verifyToken(token: string) {
    const privateKeyPath = path.join(__dirname, "../priv.key");
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    return jwt.verify(token, privateKey, { algorithm: "RS256" });
  }
}

export default AuthManager;
