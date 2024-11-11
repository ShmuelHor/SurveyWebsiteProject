import React, { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { useSelector } from "react-redux";
import {
  fetchCandidates,
  selectCandidates,
} from "../../../store/features/candidates/candidatesSlice";
import CandidatesCard from "../CandidatesCard/CandidatesCard";
import { selectUser } from "../../../store/features/users/usersSlice";
import { Link } from "react-router-dom";
import { LogOut } from "../../../store/features/users/usersSlice";

const VotingPage = () => {
  const dispatch = useAppDispatch();
  const data = useSelector(selectUser);

  const candidates = useSelector(selectCandidates);
  useEffect(() => {
    dispatch(fetchCandidates());
  }, []);
  return (
    <div>
      <div>
        {data.user?.data?.isAdmin === true ? (
          <Link to={"/statistics"}>
            <button>statistics</button>
          </Link>
        ) : null}
        {candidates.candidates.success &&
          candidates.candidates.data!.map((candidate) => (
            <CandidatesCard key={candidate.id} candidate={candidate} />
          ))}
        <Link to={"/"}>
          <button onClick={() => dispatch(LogOut())}>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default VotingPage;
