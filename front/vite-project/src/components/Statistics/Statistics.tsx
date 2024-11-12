import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { LogOut, updateUsres } from "../../store/features/users/usersSlice";
import { useSelector } from "react-redux";
import {
  selectCandidates,
  updateCandidate,
} from "../../store/features/candidates/candidatesSlice";
import { selectUser } from "../../store/features/users/usersSlice";
import UserTable from "./UserTable";
import { useSocket } from "../../hooks/useSocket";

const Statistics = () => {
  const dispatch = useAppDispatch();
  const dataCandidates = useSelector(selectCandidates);
  const dataUsers = useSelector(selectUser);
  const {
    getAllUsers,
    userVoteStatus,
    connected,
    getAllCandidates,
    candidateVotes,
  } = useSocket();

  useEffect(() => {
    if (connected) {
      getAllUsers();
    }
  }, [connected]);

  useEffect(() => {
    if (userVoteStatus) {
      dispatch(updateUsres(userVoteStatus));
    }
  }, [userVoteStatus, dispatch]);

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

  const updatedItems = [...dataUsers.users].sort((a, b) => {
    if (a.hasVoted === true && b.hasVoted !== true) {
      return -1;
    }
    if (a.hasVoted !== true && b.hasVoted === true) {
      return 1;
    }
    return 0;
  });
  

  return (
    <div>
      {updatedItems.map((user) => (
        <UserTable key={user.id} user={user} />
      ))}

      {dataCandidates.candidates.data?.map((candidate) => (
        <div style={{ backgroundColor: "black", color: "white" }}>
          <p>{candidate.name}</p>
          <p>{candidate.votes}</p>
        </div>
      ))}
      <Link to={"/"}>
        <button onClick={() => dispatch(LogOut())}>Logout</button>
      </Link>
      <Link to={"/votes"}>
        <button>Voting Page</button>
      </Link>
    </div>
  );
};

export default Statistics;
