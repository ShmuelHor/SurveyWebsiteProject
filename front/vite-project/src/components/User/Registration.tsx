import React from "react";
import { useForm } from "../../hooks/hoekForm";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchRegisterUser,
  selectUser,
} from "../../store/features/users/usersSlice";
import { useAppDispatch } from "../../store/hooks";

const Registration: React.FC = () => {
  const { formData, handleChange, resetForm } = useForm({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const data = useSelector(selectUser);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(fetchRegisterUser(formData));

    if (data.status === "succeeded") {
      setTimeout(() => {
        navigate("/");
      }, 100);
    }

    resetForm();
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} onReset={resetForm}>
        <label>
          Username:
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
        <button type="submit">Submit</button>
      </form>
      <Link to={"/"}>
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Registration;
