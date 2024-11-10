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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidatesHandler = exports.loginHandler = exports.createUserHandler = void 0;
const Servise_1 = require("../services/Servise");
// import { JWT_SECRET } from '../config';
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required', success: false });
            return;
        }
        const user = yield (0, Servise_1.createUser)(username, password);
        if (!user) {
            res.status(400).json({ message: 'User existing ', success: false });
            return;
        }
        res.status(201).json({ message: 'User created successfully', user: user, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});
exports.createUserHandler = createUserHandler;
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required', success: false });
            return;
        }
        const user = yield (0, Servise_1.login)(username, password);
        if (!user) {
            res.status(400).json({ message: 'User not found', success: false });
            return;
        }
        res.status(200).json({ message: 'Login successful', user: user, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});
exports.loginHandler = loginHandler;
const getCandidatesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Candidates = yield (0, Servise_1.getAllCandidates)();
        if (!Candidates) {
            res.status(400).json({ message: 'Candidates not found', success: false });
            return;
        }
        res.status(200).json({ data: Candidates, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});
exports.getCandidatesHandler = getCandidatesHandler;
