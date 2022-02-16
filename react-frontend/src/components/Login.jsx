import { useState } from "react";
import "../styles/Login.css";
const axios = require("axios");


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const checkLogin = async () => {
    await axios
      .post(
        "http://localhost:3001/user/validate",
        { username: username, password: password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <div className="username">
          <label className="username-input">Username</label>
          <br />
          <input
            className="username-input"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>

        <br />

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
    </div>
  );
};

export default Login;
