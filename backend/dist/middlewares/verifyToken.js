"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Jwt_Secret = process.env.JWT_SECRET;
function verifyToken(req, res, next) {
    if (!Jwt_Secret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({
            message: "Access denied, no token provided",
            success: false,
        });
    }
    const tokenWithoutBearer = token.startsWith("Bearer ")
        ? token.slice(7)
        : token;
    console.log("Token received:", tokenWithoutBearer);
    jsonwebtoken_1.default.verify(tokenWithoutBearer, Jwt_Secret, (err, decoded) => {
        if (err) {
            console.log("JWT verification failed:", err);
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false,
            });
        }
        next();
    });
}
