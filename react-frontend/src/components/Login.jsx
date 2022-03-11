import { useState } from "react";
import "../styles/Login-Register.css";
import { Link, useNavigate } from "react-router-dom";
const axios = require("axios");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const checkLogin = async () => {
    const result = await axios
      .post(
        "http://localhost:3001/user/login",
        { username: username, password: password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then()
      .catch((err) => alert("Invalid Login"));

    if (result.status === 200) navigate("/search-room");
  };

  return (
    <div>
      <h2 className="page-title">
        <u>Login</u>
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

        <button type="button" className="btn btn-primary" onClick={checkLogin}>
          Login
        </button>
      </form>

      <div className="register-account">
        <p className="register-new-account">Need an account?</p>
        <div className="redirect-register">
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
