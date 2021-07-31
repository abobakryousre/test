"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// loading enviroment variables
require("dotenv").config();

// loacl developemnt cnofiguration
const config = require("./config");

// adding body parser middleware
app.use(express.json());

// accepte different origin
app.use(cors());

const storeRouter = require("./routes/storeRouter");

app.use("/", storeRouter);

// database connection
mongoose.connect(
  process.env.MONGODB_CONNECTION_URL || config.MONGODB_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.log(`Database Connection Error: ${err}`);

    // lanuch the application
    app.listen(process.env.APP_PORT || config.APP_PORT, (err) => {
      if (!err)
        console.log(
          `app listen on port ${process.env.APP_PORT || config.APP_PORT}`
        );
    });
  }
);
