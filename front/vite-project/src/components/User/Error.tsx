import React from "react";
import { selectUser } from "../../store/features/users/usersSlice";
import { useSelector } from "react-redux";

const Error: React.FC = () => {
  const data = useSelector(selectUser);

  return (
    <div>
      <div style={{ color: "red" }}>
        {data.status === "failed" ? <h2>{data.error}</h2> : null}
      </div>
    </div>
  );
};

export default Error;
