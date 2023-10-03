const csvParser = require("csv-parser");
const fs = require("fs");

const readCsvFile = async function (filePath, callback) {
  let csvData = [];
  let count = 0;
  console.log('Importing ' + filePath.replace(/^.*[\\\/]/, ''));
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      count++;
      csvData.push(row);
      if (count % 1000 == 0) {
        callback(csvData);
        count = 0;
        csvData = [];
      }
    })
    .on('end', () => {
      callback(csvData);
    });
};

exports.readCsvFile = readCsvFile;
