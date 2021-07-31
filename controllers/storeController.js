const StoreModel = require("../models/storeModel");
const validator = require("../helper/validator");
const statusCode = require("../helper/statusCode");
const createStore = (req, res, next) => {
  const data = req.body;

  validator.validateCreateStore(data, async (err) => {
    if (err) return res.status(statusCode.BadRequest).json({ error: err });

    const newStore = new StoreModel({ ...data });
    await newStore.save();
    return res.status(statusCode.Created).json(newStore);
  });
};

module.exports = {
  createStore,
};
