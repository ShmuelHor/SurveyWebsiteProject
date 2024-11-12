import React, { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { useSelector } from "react-redux";
import { updateCandidate } from "../../../store/features/candidates/candidatesSlice";
import { selectUser } from "../../../store/features/users/usersSlice";
import { updateUsres } from "../../../store/features/users/usersSlice";
import { useSocket } from "../../../hooks/useSocket";
import { Candidates } from "../../../types";
import "./CandidatesCard.css";

interface CandidatesCardProps {
  candidate: Candidates;
}

const CandidatesCard: React.FC<CandidatesCardProps> = ({ candidate }) => {
  const {
    userVoteStatus,
    candidateVotes,
    updateUserVoteStatus,
    addVoteToCandidate,
  } = useSocket();
  const dispatch = useAppDispatch();
  const data = useSelector(selectUser);

  useEffect(() => {
    if (userVoteStatus) {
      console.log(userVoteStatus);
      dispatch(updateUsres(userVoteStatus));
    }
  }, [userVoteStatus, dispatch]);

  useEffect(() => {
    if (candidateVotes) {
      dispatch(updateCandidate(candidateVotes));
    }
  }, [candidateVotes, dispatch]);

  const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem("Token");

    if (token) {
      try {
        const parts = token.split(".");

        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));

          return payload.userId || null;
        } else {
          console.error("The token is not in a valid JWT format");
          return null;
        }
      } catch (error) {
        console.error("Error decoding the token:");
        console.error("The token was:", token);
        return null;
      }
    } else {
      console.log("Token not found in localStorage");
      return null;
    }
  };

  const handleVote = () => {
    const IdUser = getUserIdFromToken();
    if (!IdUser) {
      return;
    }
    const user = data.users.find((user) => user.id === IdUser);
    if (user?.hasVoted === true) {
      return;
    }
    updateUserVoteStatus(IdUser, candidate.id!);
    addVoteToCandidate(candidate.id!);
  };

  return (
    <div className="player-card">
      <div className="votes">
        <span>{candidate.votes} Votes</span>
      </div>

      <div className="player-image">
        <img src={candidate.image} alt={candidate.name} />
      </div>

      <div className="player-name">
        <p>{candidate.name}</p>
      </div>
      <button className="vote-button" onClick={() => handleVote()}>
        Vote
      </button>
    </div>
  );
};

export default CandidatesCard;
