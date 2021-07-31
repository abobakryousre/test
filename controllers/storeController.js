const StoreModel = require("../models/storeModel");
const validator = require("../helper/validator");
const statusCode = require("../helper/statusCode");
const fs = require("fs");

const createStore = (req, res, next) => {
  const data = req.body;

  // attach the image to data object, after the file uploader middleware work
  data.logo = req.file?.path;

  // validate data before create a new store
  validator.validateCreateStore(data, async (err) => {
    if (err) return res.status(statusCode.BadRequest).json({ error: err });
    const newStore = new StoreModel({ ...data });
    await newStore.save();
    return res.status(statusCode.Created).json(newStore);
  });
};

const getAllStore = async (req, res, next) => {
  const allStores = await StoreModel.find({});

  // if no document in the database
  if (allStores.length == 0) return res.status(statusCode.NoContent).end();
  return res.json(allStores);
};

const deleteStore = async (req, res, next) => {
  const storeId = req.params.id;
  try {
    const storeExist = await StoreModel.exists({ _id: storeId });
    // if not exist return
    if (!storeExist) {
      return res
        .status(statusCode.BadRequest)
        .json({ errors: "store does not exist!" });
    }
    const store = await StoreModel.findOne({ _id: storeId });

    // remove the logo from the public file
    await fs.unlinkSync(store.logo);

    // delete the document from database
    await store.remove();
    return res.status(statusCode.Success).end();
  } catch (error) {
    return res
      .status(statusCode.BadRequest)
      .json({ errors: "store id not correct !" });
  }
};

const updateStore = async (req, res, next) => {
  const storeId = req.params.id;
  const data = req.body;

  try {
    const storeExist = await StoreModel.exists({ _id: storeId });

    // if not exist return with error
    if (!storeExist)
      return res
        .status(statusCode.BadRequest)
        .json({ errors: "store does not exist!" });

    // replace the new logo if updated
    if (req.file?.path) {
      data = {
        ...data,
        logo: req.file.path,
      };
    }

    // validate the updated body
    validator.validateCreateStore(data, async (err) => {
      if (err) return res.status(statusCode.BadRequest).json({ error: err });

      const updatedStore = await StoreModel.findOneAndUpdate(
        { _id: storeId },
        { ...data },
        { new: true }
      );
      return res.status(statusCode.Success).json(updatedStore);
    });
  } catch (error) {
    return res
      .status(statusCode.BadRequest)
      .json({ errors: "store id not correct !" });
  }
};

module.exports = {
  createStore,
  getAllStore,
  deleteStore,
  updateStore,
};
