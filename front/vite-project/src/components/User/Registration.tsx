import React, { ReactNode } from "react";
import { useForm } from "../../hooks/hoekForm";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchRegisterUser,
  selectUser,
} from "../../store/features/users/usersSlice";
import { useAppDispatch } from "../../store/hooks";
import "./Registration.css";
interface RegistrationProps {
    children: ReactNode;
}

const Registration: React.FC<RegistrationProps> = ({children}) => {
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
    <div className="registration-container">
  <h2 className="registration-header">Registration</h2>
  <form className="registration-form" onSubmit={handleSubmit} onReset={resetForm}>
    <label className="input-label">
      Username:
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
      {children}
    </label>
    <button className="reset-button" type="reset">Reset</button>
    <button className="submit-button" type="submit">Submit</button>
  </form>
  <Link to={"/"} className="login-link">
    <button className="login-button">Login</button>
  </Link>
  
</div>

  );
};

export default Registration;
