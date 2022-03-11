const express = require("express");
const app = express();
const session = require("express-session");
const connection = require("./database/database.js");
const cors = require("cors");

app.use(express.json());
require("dotenv").config();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "s3cret kiys",
    resave: false,
    saveUninitialized: false,
  })
);

const user = require("./endpoints/user.js");
app.use("/user", user);

app.use(async (req, res, next) => {
  try {
    const username = req.session.user.username;
    const password = req.session.user.password;

    const result = await validUser(username);
    if (result.password !== password) res.sendStatus(401);

    next();
  } catch (err) {
    res.sendStatus(401);
  }
});

const validUser = async (username) => {
  const result = await connection
    .promise()
    .query("SELECT * FROM user WHERE username=?", [username])
    .then();
  return result[0][0];
};

const chatRoom = require("./endpoints/chatRoom.js");
app.use("/chatRoom", chatRoom);

app.listen(3001);
