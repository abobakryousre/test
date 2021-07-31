"use strict";
const express = require("express");
const cors = require("cors");
const app = express();

// loading enviroment variables
require("dotenv").config();

// loacl developemnt cnofiguration
const config = require("./config");

// adding body parser midelware
app.use(express.json());

// accepte different origin
app.use(cors());

app.listen(process.env.APP_PORT || config.APP_PORT, (err) => {
  if (!err)
    console.log(
      `app listen on port ${process.env.APP_PORT || config.APP_PORT}`
    );
});
