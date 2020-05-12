const yargs = require('yargs');
const parser = require('./modules/parser.js');
const MatchMaker = require('./modules/matchMaker.js');
const matchPrinter = require('./modules/matchPrinter.js');

yargs.option('file', {
        alias: 'f',
        describe: 'File to process',
        demandOption: true,
        type: 'string'
    }
);

const fileName = yargs.argv.file;

const extractMatches = async (parsedFileData) => {
    const matchMaker = new MatchMaker(parsedFileData);
    await matchMaker.initAsync();
    console.log();
    console.log('Finding matches...');
    return Promise
        .all([
            matchMaker.findExactMachesAsync(),
            matchMaker.findFuzzyMatchesAsync()
        ]);
};

const makePurdy = ([exactMatchInfo, fuzzyMatchInfo]) => {
    matchPrinter.printExactMatches(exactMatchInfo);
    matchPrinter.printFuzzyMatches(fuzzyMatchInfo);
};

parser.parseFileAsync(fileName)
    .then(extractMatches)
    .then(makePurdy)
    .catch((error) => {
        console.log('Oops, something didn\'t happen as expected during processing.');
        console.log(error);
    })
    .finally(() => {
        console.log();
        console.log('Done.');
    });

