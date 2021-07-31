const errorMessages = {
  name: "Store name is required",
  description: "the store should has a short description",
  logo: "Store Logo is required ",
};

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const validateCreateStore = (data, callback) => {
  let errors = {};
  const chechedAttributes = ["name", "description", "logo"];

  chechedAttributes.forEach((attribute) => {
    errors[attribute] = errorMessages[attribute];
    if (!data[attribute] || typeof data[attribute] !== "string") {
    }
  });

  // check if no errors
  if (isEmptyObject(errors)) errors = null;
  return callback(errors);
};

module.exports = {
  validateCreateStore,
};
