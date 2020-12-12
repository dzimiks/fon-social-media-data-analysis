const path = require('path');
const fs = require('fs');

/**
 * Writes data to file.
 *
 * @param {string} filename Name of the file we want to write to.
 * @param {*} data The data we want to write into the file.
 */
module.exports.writeFile = (filename, data) => {
  const dirname = path.dirname(filename);

  if (!fs.existsSync(dirname)) {
    console.log(`Directory ${dirname} does not exist! Creating directory ${dirname}...`);
    fs.mkdirSync(dirname);
  }

  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`The file ${filename} has been written successfully!`);
    }
  });
};
