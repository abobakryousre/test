const express = require("express");
const app = express();
const mongoose = require("mongoose");
const configs = require("./config");
const cors = require("cors");

// get the enviornment configs
const ENV = process.env.NODE_ENV || "dev";
const { DB_URI, PORT } = configs["dev"];

// connect to data base
// mongoose
//   .connect(DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     app.listen(process.env.PORT || PORT, (err) => {
//       if (err) return console.log(err.message);
//       console.log("Server started on port: " + process.env.PORT || PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

app.listen(process.env.PORT || PORT, (err) => {
  if (err) return console.log(err.message);
  console.log("Server started on port: " + process.env.PORT || PORT);
});
app.use("/", (req, res) => {
  return res.json({ message: "hello montes" });
});

//  add middlewares
app.use(express.json());
app.use(cors());

// static files middleware
app.use("/public", express.static("public/"));

// add routes
app.use("/stores", require("./routes/stores"));
