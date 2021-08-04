const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + "/dist/app"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/app/index.html"));
});

app.listen(process.env.PORT || 8080, (err) => {
  if (!err)
    return console.log(`server runging on port ${process.env.PORT || 8080}`);
  console.log(err);
});
