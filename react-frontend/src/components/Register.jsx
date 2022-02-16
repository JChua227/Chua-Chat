import { useState } from "react";
const axios = require("axios");

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    axios
      .post(
        "http://localhost:3001/user/register",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log(err);
        alert("Username is already taken.");
      });
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

        <button type="button" className="btn btn-primary" onClick={register}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
