const express = require("express");
const storeController = require("../controllers/storeController");
const Router = express.Router();
const { upload } = require("../middleware/fileUploader");

/**
 * @url /stroe
 * @methods get, post
 */

Router.route("/")
  .post(upload.single("logo"), storeController.createStore)
  .get(storeController.getAllStore);

/**
 * @url /stroe/id
 * @params storeId
 * @methods delete, patch
 */

Router.route("/:id")
  .delete(storeController.deleteStore)
  .patch(upload.single("logo"), storeController.updateStore);

module.exports = Router;
