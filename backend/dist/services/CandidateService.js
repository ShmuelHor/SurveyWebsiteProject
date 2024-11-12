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
exports.AddVote = exports.getAllCandidates = void 0;
const CandidateModel_1 = __importDefault(require("../models/CandidateModel"));
const utils_1 = require("../utils/utils");
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
const AddVote = (idCandidate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidate = yield (0, utils_1.getCandidateById)(idCandidate);
        if (!candidate) {
            throw new Error("Candidate not found");
        }
        candidate.votes += 1;
        yield candidate.save();
        const Candidates = yield (0, exports.getAllCandidates)();
        return Candidates;
    }
    catch (err) {
        throw err;
    }
});
exports.AddVote = AddVote;
