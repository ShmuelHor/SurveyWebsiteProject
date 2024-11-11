import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { LogOut } from "../../store/features/users/usersSlice";
import { useSelector } from "react-redux";
import { selectCandidates } from "../../store/features/candidates/candidatesSlice";
import { selectUser ,fetchUsers} from "../../store/features/users/usersSlice";
import UserTable from "./UserTable";

const Statistics = () => {
  const dispatch = useAppDispatch();
  const dataCandidates = useSelector(selectCandidates);
  const dataUsers = useSelector(selectUser);

    useEffect(() => {
        dispatch(fetchUsers());
    })
  return (
    <div>
        {dataUsers.users.map((user) => (
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
