const express = require("express");
const storeController = require("../controllers/storeController");
const Router = express.Router();

Router.route("/")
  .post(storeController.createStore)
  .get(storeController.getAllStore);

Router.route("/:id").delete(storeController.deleteStore);
module.exports = Router;
