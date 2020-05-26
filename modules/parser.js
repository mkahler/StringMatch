const { once } = require('events');
const fs = require('fs');
const readLine = require('readline');
const { ParsedData } = require('./parsedData.js');

const parseFileAsync = (fileName) => {
  return new Promise(async (resolve, reject) => {
    const results = new ParsedData();

    let isFirstLineRead = false;
    let dataRowsConsumed = 0;
    let allDataRowsConsumed = false;
    let exactMatchRowConsumed = false;
    let fuzzyMatchRowConsumed = false;

    // open file and get out the paramters to process the file.
    const readStream = fs.createReadStream(fileName);
    readStream.on('error', (error) => {
      console.log(`Failed to process file: ${fileName}`);
      reject(error);
    });

    const rli = readLine.createInterface({
      input: readStream,
      crlfDelay: Infinity
    });

    console.log('Reading input data...');

    rli.on('line', (line) => {
      if (!isFirstLineRead) {
        const [width, height] = line.split(',').map((n) => parseInt(n));
        results.width = width;
        results.height = height;

        isFirstLineRead = true;
      } else if (!allDataRowsConsumed) {
        const [...chars] = line;
        results.data[dataRowsConsumed] = chars;
        dataRowsConsumed++;

        allDataRowsConsumed = dataRowsConsumed >= results.height;
      } else if (!exactMatchRowConsumed) {
        results.searchTerms.exactMatch = line.split(',').map((item) => item.trim());
        exactMatchRowConsumed = true;
      } else if (!fuzzyMatchRowConsumed) {
        results.searchTerms.fuzzyMatch = line.split(',').map((item) => item.trim());
        fuzzyMatchRowConsumed = true;
      }
    });

    await once(rli, 'close');

    console.log('Done parsing file.');

    resolve(results);
  });
};

module.exports = { parseFileAsync };
