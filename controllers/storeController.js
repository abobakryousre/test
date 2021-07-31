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

const getAllStore = async (req, res, next) => {
  const allStores = await StoreModel.find({});

  if (allStores.length == 0) return res.status(statusCode.NoContent).end();
  return res.json(allStores);
};
module.exports = {
  createStore,
  getAllStore,
};
