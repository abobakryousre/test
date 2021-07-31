const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 200,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

const StoreModel = mongoose.model("Store", storeSchema);
module.exports = StoreModel;
