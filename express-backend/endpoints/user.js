const connection = require("../database/database.js");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) return res.sendStatus(400);
  if (username.length == 0 || password.length == 0) return res.sendStatus(405);

  const uniqueUser = await connection
    .promise()
    .query("SELECT * FROM user WHERE username=?", [username])
    .catch((err) => console.log(err));

  if (uniqueUser[0][0]) return res.sendStatus(401);

  await connection
    .promise()
    .query("INSERT INTO user(username,password) VALUES(?,?)", [
      username,
      password,
    ])
    .catch((err) => console.log(err));

  res.sendStatus(200);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await connection
    .promise()
    .query("SELECT * FROM user WHERE username=? AND password=?", [
      username,
      password,
    ])
    .catch((err) => console.log(err));

  if (!result[0][0]) return res.sendStatus(401);

  req.session.user = result[0][0];
  res.sendStatus(200);
});

module.exports = router;
