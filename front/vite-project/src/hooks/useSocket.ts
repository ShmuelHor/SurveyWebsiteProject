import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Candidates, User } from "../types";

const SOCKET_SERVER_URL = "http://localhost:3000";

interface UserVoteStatus {
  users: User[];
}

interface CandidateVotes {
  candidates: Candidates[];
}

type CallbackResponse = { status: string };
type Message = string | Record<string, unknown>;

export function useSocket() {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [userVoteStatus, setUserVoteStatus] = useState<UserVoteStatus | null>(
    null
  );
  const [candidateVotes, setCandidateVotes] = useState<CandidateVotes | null>(
    null
  );

  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL);
    setSocket(socketInstance);
    console.log("Socket instance:", socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected:", socketInstance.id);
      setConnected(true);
    });

    socketInstance.on("disconnect", (reason: string) => {
      console.log("Disconnected:", reason);
      setConnected(false);
    });

    // מאזין למצב ההצבעות של המשתמשים
    socketInstance.on("userVoteStatusUpdated", (users: UserVoteStatus) => {
      console.log("userVoteStatusUpdated", users);
      console.log("Users socket : ", users);
      setUserVoteStatus(users);
    });

    // מאזין לעדכון הצבעות המועמד
    socketInstance.on("candidateVoteUpdated", (candidates: CandidateVotes) => {
      console.log("Candidate vote updated:", candidates);
      setCandidateVotes(candidates);
    });

    socketInstance.on("getCandidates", (candidates: CandidateVotes) => {
      console.log("Received candidates:", candidates);
      setCandidateVotes(candidates);
    });

    socketInstance.on("getUsers", (users: UserVoteStatus) => {
      console.log("Received users:", users);
      setUserVoteStatus(users);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const updateUserVoteStatus = (idUser: string, idCandidate: string) => {
    if (socket) {
      socket.emit("updateUserVoteStatus", idCandidate, idUser);
      console.log(`User ${idUser} voted for candidate ${idCandidate}`);

      socket.on("userVoteStatusUpdated", (users: UserVoteStatus) => {
        console.log("userVoteStatusUpdated", users);
        setUserVoteStatus(users);
      });
    }
  };

  const addVoteToCandidate = (idCandidate: string) => {
    if (socket) {
      socket.emit("addVoteToCandidate", idCandidate);
      console.log(`Vote added to candidate ${idCandidate}`);

      socket.on("candidateVoteUpdated", (candidates: CandidateVotes) => {
        console.log("Candidate vote updated:", candidates);
        setCandidateVotes(candidates);
      });
    }
  };

  const getAllCandidates = () => {
    if (socket) {
      socket.emit("askForCandidates", (candidates: CandidateVotes) => {
        console.log("Received candidates:", candidates);
        setCandidateVotes(candidates);
      });
    }
  };
  const getAllUsers = () => {
    if (socket) {
      socket.emit("askForUsers", (users: UserVoteStatus) => {
        console.log("Received users:", users);
        setUserVoteStatus(users);
      });
    }
  };

  const sendRequest = (
    data: Message,
    callback: (response: CallbackResponse) => void
  ) => {
    if (socket) {
      socket.emit("request", data, (response: CallbackResponse) => {
        callback(response);
      });
    }
  };

  return {
    connected,
    userVoteStatus,
    candidateVotes,
    updateUserVoteStatus,
    addVoteToCandidate,
    sendRequest,
    getAllCandidates,
    getAllUsers,
  };
}
