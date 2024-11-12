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
exports.initializeSocketServer = initializeSocketServer;
const socket_io_1 = require("socket.io");
const userService_1 = require("./services/userService");
const CandidateService_1 = require("./services/CandidateService");
const utils_1 = require("./utils/utils");
function initializeSocketServer(httpServer) {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);
        // עדכון מצב הצבעות המשתמש
        socket.on("updateUserVoteStatus", (idCandidate, idUser) => __awaiter(this, void 0, void 0, function* () {
            console.log(`User ${idUser} is updating vote status for candidate ${idCandidate}`);
            // עדכון מצב ההצבעה בשרת
            const users = yield (0, userService_1.updateUserVoteStatus)(idUser, idCandidate);
            // שלח את המצב המעודכן של המשתמשים לכל הלקוחות
            io.emit("userVoteStatusUpdated", users);
        }));
        // הוספת הצבעה למועמד
        socket.on("addVoteToCandidate", (idCandidate) => __awaiter(this, void 0, void 0, function* () {
            console.log(`Adding vote to candidate ${idCandidate}`);
            // הוספת הצבעה למועמד
            const candidates = yield (0, CandidateService_1.AddVote)(idCandidate);
            // שלח את המידע המעודכן על המועמדים לכל הלקוחות
            io.emit("candidateVoteUpdated", candidates);
        }));
        // בקשה לקבלת כל המועמדים
        socket.on("askForCandidates", () => __awaiter(this, void 0, void 0, function* () {
            console.log("Fetching candidates...");
            const candidates = yield (0, CandidateService_1.getAllCandidates)();
            socket.emit("getCandidates", candidates);
        }));
        // בקשה לקבלת כל המשתמשים
        socket.on("askForUsers", () => __awaiter(this, void 0, void 0, function* () {
            console.log("Fetching users...");
            const users = yield (0, utils_1.getAllUsers)();
            socket.emit("getUsers", users);
        }));
        // התנתקות
        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });
    return io;
}
