const Store = require("../models/store");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");
const uploadImage = require("../middlewares/uploadImage");
const extractPaginationInfo = require("../utils/extractPaginationInfo");
const deleteFile = require("../utils/deleteFile");

const getStores = async (req, res) => {
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);
  if (filter.storeName) {
    filter.storeName = { $regex: filter.storeName.toLowerCase() };
  }

  const options = {
    sort: { createdAt: -1 },
    page,
    limit,
  };

  try {
    const stores = await Store.paginate(filter, options);
    sendResponse(res, stores, statusCodes.success.ok);
  } catch (error) {
    sendError(res, error.message, statusCodes.error.badRequest);
  }
};

const getStore = async (req, res) => {
  try {
    const store = await Store.findOne({ _id: req.params.id });
    if (!store)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    sendResponse(res, store, statusCodes.success.ok);
  } catch (error) {
    sendError(res, error.message, statusCodes.error.badRequest);
  }
};

const createStore = async (req, res) => {
  const upload = uploadImage.single("storeLogo");
  upload(req, res, async (err) => {
    if (err)
      return sendError(res, err.message, statusCodes.error.invalidMediaType);
    if (req.file) req.body.storeLogo = req.file.destination + req.file.filename;
    try {
      const createdStore = await Store.create(req.body);
      sendResponse(res, createdStore, statusCodes.success.ok);
    } catch (error) {
      sendError(res, error.message, statusCodes.error.badRequest);
    }
  });
};

const updateStore = async (req, res) => {
  const upload = uploadImage.single("storeLogo");
  upload(req, res, async (err) => {
    if (err)
      return sendError(res, err.message, statusCodes.error.invalidMediaType);
    if (req.file) req.body.storeLogo = req.file.destination + req.file.filename;
    try {
      const updatedStore = await Store.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          runValidators: true,
        }
      );
      if (!updatedStore)
        return sendError(
          res,
          errorMessages.notFound,
          statusCodes.error.notFound
        );
      req.file && deleteFile(updatedStore.storeLogo);
      sendResponse(res, updatedStore, statusCodes.success.ok);
    } catch (error) {
      sendError(res, error.message, statusCodes.error.badRequest);
    }
  });
};

const deleteStore = async (req, res) => {
  try {
    const deletedStore = await Store.findOneAndDelete({ _id: req.params.id });
    if (!deletedStore)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    deleteFile(deletedStore.storeLogo);
    sendResponse(res, deletedStore, statusCodes.success.ok);
  } catch (error) {
    sendError(res, error.message, statusCodes.error.badRequest);
  }
};

module.exports = {
  getStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
};
