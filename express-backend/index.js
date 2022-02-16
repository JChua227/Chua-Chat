const express = require("express");
const app = express();
const session = require("express-session");
var cors = require("cors");

app.use(express.json());
require("dotenv").config();

app.use(cors({ origin: "http://localhost:3000",credentials:true}));

app.use(
  session({
    secret: "s3cret kiys",
    resave: false,
    saveUninitialized: false
  })
);

const user = require("./endpoints/user.js");
app.use("/user", user);




app.listen(3001);
