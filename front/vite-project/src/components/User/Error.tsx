import React, { useEffect } from "react";
import { selectUser } from "../../store/features/users/usersSlice";
import { useSelector } from "react-redux";
import "./Error.css";

const Error: React.FC = () => {
  const data = useSelector(selectUser);
  const [errorTimer, setErrorTimer] = React.useState<string | null>((data.error)?.toString() || null);

      setTimeout(() => {
        setErrorTimer(null);
      }, 2000);

  return (
    <div className="error-container">
  {data.status === "failed"  ? <h2 className="error-message">{errorTimer} </h2> :null}
</div>

  );
};

export default Error;
