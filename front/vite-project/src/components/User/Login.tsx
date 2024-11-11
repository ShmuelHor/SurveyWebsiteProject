import React from "react";
import { useForm } from "../../hooks/hoekForm";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import {
  fetchLoginUser,
  selectUser,
} from "../../store/features/users/usersSlice";
import { useSelector } from "react-redux";

const Login: React.FC = () => {
  const { formData, handleChange, resetForm } = useForm({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const data = useSelector(selectUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(fetchLoginUser(formData));

    if (data.status === "succeeded") {
      await setTimeout(() => {
        navigate("/votes");
      }, 100);
    }

    resetForm();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} onReset={resetForm}>
        <label>
          username:
          <input
            name="username"
            type="text"
            value={formData?.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={formData?.password || ""}
            onChange={handleChange}
          />
        </label>
        <button type="reset">Reset</button>
        <button type="submit">Login</button>
      </form>
      <Link to={"/register"}>
        <button>Sign up</button>
      </Link>
    </div>
  );
};
export default Login;
