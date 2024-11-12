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
exports.IfUserExists = IfUserExists;
exports.getUSerById = getUSerById;
exports.getAllUsers = getAllUsers;
exports.getCandidateById = getCandidateById;
const CandidateModel_1 = __importDefault(require("../models/CandidateModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
function IfUserExists(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UserModel_1.default.find();
        const userFind = users.find((u) => u.username === username);
        if (userFind) {
            return { userExists: true, user: userFind };
        }
        else {
            return { userExists: false, user: null };
        }
    });
}
function getUSerById(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UserModel_1.default.find();
        const userFind = users.find((u) => u.id === idUser);
        if (userFind) {
            return userFind;
        }
        else {
            return null;
        }
    });
}
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UserModel_1.default.find();
        return users;
    });
}
function getCandidateById(idCandidate) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidate = yield CandidateModel_1.default.find();
        const candidateFind = candidate.find((c) => c.id === idCandidate);
        if (candidateFind) {
            return candidateFind;
        }
        else {
            return null;
        }
    });
}
