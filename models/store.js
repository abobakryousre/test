const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const storeSchema = new Schema(
  {
    storeName: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Store Name is required",
      minLength: [3, "Store Name must be at least 3 chars"],
      unique: true,
    },
    storeDescription: {
      type: String,
      trim: true,
      required: "Store Description is required",
      minLength: [15, "Store Description must be at least 15 chars"],
    },
    storeLogo: {
      type: String,
      default: "default.png",
    },
  },
  {
    timestamps: true,
  }
);
// add pagination on store model
storeSchema.plugin(mongoosePaginate);

const storeModel = model("Store", storeSchema);

module.exports = storeModel;
