const { once } = require('events');
const fs = require('fs');
const readLine = require('readline');

const generateEmptyResult = () => {
  return {
    width: 0,
    height: 0,
    data: [],
    searchTerms: {
      exactMatch: [],
      fuzzyMatch: []
    }
  };
};

const parseFileAsync = async (file) => {
  const results = generateEmptyResult();

  try {
    console.log('Reading input data...');

    let isFirstLineRead = false;
    let dataRowsConsumed = 0;
    let allDataRowsConsumed = false;
    let exactMatchRowConsumed = false;
    let fuzzyMatchRowConsumed = false;

    // open file and get out the paramters to process the file.
    const readStream = fs.createReadStream(file);
    const rli = readLine.createInterface({
      input: readStream,
      crlfDelay: Infinity
    });

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
    return results;
  } catch (e) {
    console.log(`Failed to process file: ${file} \n ${e}`);
  }
};

module.exports = { parseFileAsync };
