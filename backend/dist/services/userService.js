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
exports.getAllUsers = exports.getAllCandidates = exports.login = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const CandidateModel_1 = __importDefault(require("../models/CandidateModel"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../utils/utils");
dotenv_1.default.config();
const Jwt_Secret = process.env.JWT_SECRET;
const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }
        const user = yield (0, utils_1.IfUserExists)(username);
        if (user.userExists) {
            throw new Error('User existing ');
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new UserModel_1.default({
            id: (0, uuid_1.v4)(),
            username,
            password: hashedPassword,
            isAdmin: false,
            hasVoted: false,
            votedFor: null,
        });
        const userCreated = yield newUser.save();
        return userCreated;
    }
    catch (err) {
        throw err;
    }
});
exports.createUser = createUser;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }
        const userFind = yield (0, utils_1.IfUserExists)(username);
        if (!userFind.userExists) {
            throw new Error("One of the details is wrong");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, userFind.user.password);
        if (!isPasswordValid) {
            throw new Error("One of the details is wrong");
        }
        const token = jsonwebtoken_1.default.sign({ userId: userFind.user.id }, Jwt_Secret, { expiresIn: "1h" });
        return { token: token, user: userFind.user };
    }
    catch (err) {
        throw err;
    }
});
exports.login = login;
const getAllCandidates = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidate = yield CandidateModel_1.default.find();
        if (!candidate) {
            throw new Error("No candidates found");
        }
        return candidate;
    }
    catch (err) {
        throw err;
    }
});
exports.getAllCandidates = getAllCandidates;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.find();
        if (!user) {
            throw new Error("No users found");
        }
        return user;
    }
    catch (err) {
        throw err;
    }
});
exports.getAllUsers = getAllUsers;
