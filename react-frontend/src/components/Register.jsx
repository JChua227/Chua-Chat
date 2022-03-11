import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const axios = require("axios");

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  const register = async () => {
    const result = await axios
      .post(
        "http://localhost:3001/user/register",
        { username, password, confirmPassword },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .catch((err) => {
        if (err.response.status === 400)
          return alert("Passwords do not match. Please try again.");
        if (err.response.status === 405)
          return alert("Username and/or Password may not be empty.");
        return alert("Username taken.");
      });
    if (result.status === 200) navigate("/login");
  };

  return (
    <div>
      <h2 className="page-title">
        <u>Register</u>
      </h2>

      <form>
        <div className="username">
          <label className="username-input">Username</label>
          <br />
          <input
            className="username-input"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>

        <div className="password">
          <label className="password-input">Password</label>
          <br />
          <input
            type="password"
            className="password-input"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="confirm-password">
          <label className="confirm-password-input">Confirm Password</label>
          <br />
          <input
            type="password"
            className="confirm-password-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

        <button type="button" className="btn btn-primary" onClick={register}>
          Create Account
        </button>
      </form>

      <div className="have-account">
        <p className="already-have-account">Already have an account? </p>
        <div className="redirect-login">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
