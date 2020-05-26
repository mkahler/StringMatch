// setup mocked functionality for the 'fs' module to be able to pass in test data instead of hitting the file system
jest.mock('fs', () => {
  const originalFs = jest.requireActual('fs');
  const stream = jest.requireActual('stream');

  return {
    ...originalFs,
    __setData: function (data) {
      this.testData = data;
    },
    createReadStream: function () {
      if (this.testData.length > 0) {
        const bufferStream = new stream.PassThrough();
        const buffer = Buffer.from(this.testData);
        bufferStream.end(buffer);
        return bufferStream;
      } else {
        return originalFs.createReadStream.apply(null, arguments);
      }
    }
  };
});

const fs = require('fs'); // used to setup the test data
const parser = require('../modules/parser.js');

describe('Parser tests', () => {
  beforeEach(() => {
    // reset the test data before each test
    fs.__setData('');
  });

  test('should parse the input when in the expected format ', () => {
    // stub out input data for this test
    fs.__setData(`2, 2
ASDF
LKJH
Black, Sheep
Plane`);

    return expect(parser.parseFileAsync('fileName.txt')).resolves.toMatchObject({
      width: 2,
      height: 2,
      data: [
        ['A', 'S', 'D', 'F'],
        ['L', 'K', 'J', 'H']
      ],
      searchTerms: { exactMatch: ['Black', 'Sheep'], fuzzyMatch: ['Plane'] }
    });
  });

  test('should throw an error when it cannot find the file', () => {
    const fielName = 'dummyFile.txt';
    return expect(parser.parseFileAsync(fielName)).rejects.toThrow();
  });
});
