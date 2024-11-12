import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { updateUserVoteStatus } from "./services/userService";
import { AddVote, getAllCandidates } from "./services/CandidateService";
import { getAllUsers } from "./utils/utils";

export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // עדכון מצב הצבעות המשתמש
    socket.on("updateUserVoteStatus", async (idCandidate: string, idUser: string) => {
      console.log(`User ${idUser} is updating vote status for candidate ${idCandidate}`);

      // עדכון מצב ההצבעה בשרת
      const users = await updateUserVoteStatus(idUser, idCandidate);
      
      // שלח את המצב המעודכן של המשתמשים לכל הלקוחות
      io.emit("userVoteStatusUpdated", users);  
    });

    // הוספת הצבעה למועמד
    socket.on("addVoteToCandidate", async (idCandidate: string) => {
      console.log(`Adding vote to candidate ${idCandidate}`);
      
      // הוספת הצבעה למועמד
      const candidates = await AddVote(idCandidate);

      // שלח את המידע המעודכן על המועמדים לכל הלקוחות
      io.emit("candidateVoteUpdated", candidates);  
    });

    // בקשה לקבלת כל המועמדים
    socket.on("askForCandidates", async () => {
      console.log("Fetching candidates...");
      const candidates = await getAllCandidates();
      socket.emit("getCandidates", candidates); 
    });


    // בקשה לקבלת כל המשתמשים
    socket.on("askForUsers", async () => {
        console.log("Fetching users...");
        const users = await getAllUsers();
        socket.emit("getUsers", users); 
      });

    // התנתקות
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  return io;
}
