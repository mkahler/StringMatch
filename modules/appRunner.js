const MatchMaker = require('./matchMaker.js');
const matchPrinter = require('./matchPrinter.js');

const extractMatchesAsync = async (parsedFileData) => {
  const matchMaker = new MatchMaker(parsedFileData);
  const isInitialized = await matchMaker.init();

  if (isInitialized) {
    console.log();
    console.log('Finding matches...');
    return Promise.all([matchMaker.findExactMachesAsync(), matchMaker.findFuzzyMatchesAsync()]);
  } else {
    return Promise.reject('Init failed.');
  }
};

const makePurdy = ([exactMatchInfo, fuzzyMatchInfo]) => {
  matchPrinter.printExactMatches(exactMatchInfo);
  matchPrinter.printFuzzyMatches(fuzzyMatchInfo);
};

module.exports = { extractMatchesAsync, makePurdy };
