import React, { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { useSelector } from "react-redux";
import {
  fetchCandidates,
  selectCandidates,
  updateCandidate,
} from "../../../store/features/candidates/candidatesSlice";
import CandidatesCard from "../CandidatesCard/CandidatesCard";
import { selectUser } from "../../../store/features/users/usersSlice";
import { Link } from "react-router-dom";
import { LogOut } from "../../../store/features/users/usersSlice";
import { useSocket } from "../../../hooks/useSocket";
import "./VotingPage.css";

const VotingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useSelector(selectUser);
  const { getAllCandidates, candidateVotes, connected } = useSocket();
  const candidates = useSelector(selectCandidates);

  useEffect(() => {
    if (connected) {
      getAllCandidates();
    }
  }, [connected]);

  useEffect(() => {
    if (candidateVotes) {
      dispatch(updateCandidate(candidateVotes));
    }
  }, [candidateVotes, dispatch]);

  return (
    <div className="page-container">
      <div className="page-header">
        Vote for your favorite player for the Golden Ball!
      </div>

      <div className="buttons-container">
        {data.user?.data?.isAdmin === true && (
          <Link to="/statistics">
            <button className="statistics-button">Statistics</button>
          </Link>
        )}

        <Link to="/">
          <button className="logout-button" onClick={() => dispatch(LogOut())}>
            Logout
          </button>
        </Link>
      </div>

      <div className="card-container">
        {candidates.candidates && candidates.candidates.data?.length! > 0 ? (
          candidates.candidates.data!.map((candidate) => (
            <CandidatesCard key={candidate.id} candidate={candidate} />
          ))
        ) : (
          <p>No candidates available</p>
        )}
      </div>
    </div>
  );
};

export default VotingPage;
