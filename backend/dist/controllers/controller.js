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
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error('Username and password are required');
        }
        const user = yield (0, Servise_1.createUser)(username, password);
        if (!user) {
            throw new Error('User existing ');
        }
        res.status(201).json({ message: 'User created successfully', data: user, success: true });
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
            throw new Error('Username and password are required');
        }
        const token = yield (0, Servise_1.login)(username, password);
        if (!token) {
            throw new Error('Incorrect user or password');
        }
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIORMENT === 'production',
            maxAge: 3600000,
            sameSite: 'none',
        });
        res.status(200).json({ message: 'Login successful', data: token, success: true });
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
            throw new Error('Candidates not found');
        }
        res.status(200).json({ data: Candidates, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});
exports.getCandidatesHandler = getCandidatesHandler;
