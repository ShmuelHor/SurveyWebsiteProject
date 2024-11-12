import React from "react";
import { useForm } from "../../hooks/hoekForm";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import {
  fetchLoginUser,
  selectUser,
} from "../../store/features/users/usersSlice";
import { useSelector } from "react-redux";
import "./Login.css";

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
        navigate("/votes");
     

    resetForm();
  };

  return (
    <div className="login-container">
    <h2 className="login-header">Login</h2>
    <form className="login-form" onSubmit={handleLogin} onReset={resetForm}>
      <label className="input-label">
        username:
        <input
          className="input-field"
          name="username"
          type="text"
          value={formData?.username || ""}
          onChange={handleChange}
        />
      </label>
      <label className="input-label">
        Password:
        <input
          className="input-field"
          name="password"
          type="password"
          value={formData?.password || ""}
          onChange={handleChange}
        />
      </label>
      <button className="reset-button" type="reset">Reset</button>
      <button className="login-button" type="submit">Login</button>
    </form>
    <Link to={"/register"}>
      <button className="signup-button">Sign up</button>
    </Link>
  </div>
  
  );
};
export default Login;
