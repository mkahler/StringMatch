const yargs = require('yargs');
const parser = require('./modules/parser.js');
const { extractMatchesAsync, makePurdy } = require('./modules/appRunner.js');

yargs.option('file', {
  alias: 'f',
  describe: 'File to process',
  demandOption: true,
  type: 'string'
});

const fileName = yargs.argv.file;

parser
  .parseFileAsync(fileName)
  .then(extractMatchesAsync)
  .then(makePurdy)
  .catch((error) => {
    console.log("Oops, something didn't happen as expected during processing.");
    console.log(error);
  })
  .finally(() => {
    console.log();
    console.log('Done.');
  });
