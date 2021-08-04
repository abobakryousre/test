const fs = require("fs");
const deleteFile = (path) => {
  return fs.unlink(path, (err) => {
    if (err) {
      return;
    }
  });
};

module.exports = deleteFile;
