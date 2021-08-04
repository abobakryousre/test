const sendResponse = (res, data, code) =>
  res.status(code).send({ data, message: {} });

const sendError = (res, message, code) =>
  res.status(code).send({ data: {}, message });

const statusCodes = {
  success: {
    ok: 200,
  },

  error: {
    badRequest: 400,
    notFound: 404,
    invalidMediaType: 415,
  },
};

const errorMessages = {
  notFound: "Not found",
};

module.exports = { errorMessages, sendError, sendResponse, statusCodes };
