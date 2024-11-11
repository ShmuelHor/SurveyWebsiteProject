"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCandidates = exports.login = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const CandidateModel_1 = __importDefault(require("../models/CandidateModel"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new UserModel_1.default({
            id: (0, uuid_1.v4)(),
            username,
            password: hashedPassword,
            isAdmin: false,
            hasVoted: false,
            votedFor: null,
        });
        const user = yield newUser.save();
        return user;
    }
    catch (err) {
        throw err;
    }
});
exports.createUser = createUser;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find();
        const userFind = users.find((u) => u.username === username);
        if (!userFind) {
            throw new Error("Identification error");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, userFind.password);
        if (!isPasswordValid) {
            throw new Error("Identification error");
        }
        const token = jsonwebtoken_1.default.sign({ userId: userFind.id }, JWT_SECRET ? JWT_SECRET : "dsbvouyfcds", { expiresIn: "1h" });
        return token;
    }
    catch (err) {
        throw err;
    }
});
exports.login = login;
const getAllCandidates = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidate = yield CandidateModel_1.default.find();
        return candidate;
    }
    catch (err) {
        throw err;
    }
});
exports.getAllCandidates = getAllCandidates;
