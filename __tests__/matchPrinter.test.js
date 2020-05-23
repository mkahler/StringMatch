const os = require('os');
// set conditions for mocked console functionality
let capturedMessage = null;

jest.spyOn(console, 'log').mockImplementation((msg) => {
  capturedMessage = `${capturedMessage ? `${capturedMessage}${msg}` : msg}${os.EOL}`;
});

// reset the logged message before each test to make sure it is a clean slate
beforeEach(() => {
  capturedMessage = null;
});

const matchPrinter = require('../modules/matchPrinter.js');

describe('MatchPrinter tests', () => {
  describe('Exact match output', () => {
    test('should display a section heading and no results message when nothing was provided', () => {
      const matches = [];
      const expectedData = new RegExp(`^${os.EOL}Part 1:${os.EOL}-------${os.EOL}There are no items for part 1${os.EOL}\$`);

      matchPrinter.printExactMatches(matches);
      expect(capturedMessage).toMatch(expectedData);
    });

    test('should print result for single word match', () => {
      const matches = [{ key: 'word1', numberOfMatches: 1 }];
      const expectedData = new RegExp(`^${os.EOL}Part 1:${os.EOL}-------${os.EOL}word1 : 1${os.EOL}\$`);

      matchPrinter.printExactMatches(matches);
      expect(capturedMessage).toMatch(expectedData);
    });

    test('should print multiple lines of results for multiple word matches', () => {
      const matches = [
        { key: 'word1', numberOfMatches: 1 },
        { key: 'word2', numberOfMatches: 15 }
      ];
      const expectedData = new RegExp(`^${os.EOL}Part 1:${os.EOL}-------${os.EOL}word1 : 1${os.EOL}word2 : 15${os.EOL}\$`);

      matchPrinter.printExactMatches(matches);
      expect(capturedMessage).toMatch(expectedData);
    });
  });

  describe('Fuzzy match output', () => {
    test('should display a section heading and no results message when nothing was provided', () => {
      const matches = [];
      const expectedData = new RegExp(`^${os.EOL}Part 2:${os.EOL}-------${os.EOL}There are no items for part 2${os.EOL}\$`);

      matchPrinter.printFuzzyMatches(matches);
      expect(capturedMessage).toMatch(expectedData);
    });

    test('should print result for single fuzzy word match', () => {
      const matches = [{ key: 'fuzzyWord1', found: ['fuzzyBord1', 'wuzzyWord1'] }];
      const expectedData = new RegExp(`^${os.EOL}Part 2:${os.EOL}-------${os.EOL}fuzzyWord1 : fuzzyBord1, wuzzyWord1${os.EOL}\$`);

      matchPrinter.printFuzzyMatches(matches);
      expect(capturedMessage).toMatch(expectedData);
    });

    test('should print multiple lines of results for multiple fuzzy word matches', () => {
      const matches = [
        { key: 'fuzzyWord1', found: ['fuzzyBord1', 'wuzzyWord1'] },
        { key: 'fuzzyWord2', found: [] }
      ];
      const expectedData = new RegExp(
        `^${os.EOL}Part 2:${os.EOL}-------${os.EOL}fuzzyWord1 : fuzzyBord1, wuzzyWord1${os.EOL}fuzzyWord2 : ${os.EOL}\$`
      );

      matchPrinter.printFuzzyMatches(matches);
      expect(capturedMessage).toMatch(expectedData);
    });
  });
});
