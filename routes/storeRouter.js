const express = require("express");
const storeController = require("../controllers/storeController");
const Router = express.Router();
/**
 * @url /stroe
 * @methods get, post
 */

Router.route("/")
  .post(storeController.createStore)
  .get(storeController.getAllStore);

/**
 * @url /stroe/id
 * @params storeId
 * @methods delete, patch
 */

Router.route("/:id")
  .delete(storeController.deleteStore)
  .patch(storeController.updateStore);

module.exports = Router;
