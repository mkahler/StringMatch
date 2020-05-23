const { ParsedData } = require('../modules/parsedData.js');
const MatchMaker = require('../modules/matchMaker.js');

describe('MatchMaker tests', () => {
  describe('findExactMachesAsync tests', () => {
    test('should return empty results for call to get exact matches, when not initialized first', () => {
      const m = new MatchMaker();

      return expect(m.findExactMachesAsync()).resolves.toHaveLength(0);
    });

    test('should return exact match result, but no matches, when there is no data but exactMatch search terms are provided and not initialized first', () => {
      const parsedData = new ParsedData();
      parsedData.searchTerms.exactMatch.push('Dogs');

      const m = new MatchMaker(parsedData);
      // explicitly NOT calling m.init()
      return expect(m.findExactMachesAsync()).resolves.toMatchObject([{ key: 'Dogs', numberOfMatches: 0 }]);
    });

    test('should return exact match result, but no matches, when there is no data but exactMatch search terms are provided', () => {
      const parsedData = new ParsedData();
      parsedData.searchTerms.exactMatch.push('Dogs');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findExactMachesAsync()).resolves.toMatchObject([{ key: 'Dogs', numberOfMatches: 0 }]);
    });

    test('should return exact match results for search data provided', () => {
      const data = [
        ['A', 'D', 'E', 'S', 'F', 'J', 'R', 'A', 'S', 'L', 'X', 'D', 'F', 'R', 'T'],
        ['Q', 'B', 'R', 'A', 'I', 'N', 'O', 'U', 'E', 'W', 'H', 'G', 'Y', 'E', 'D'],
        ['R', 'I', 'R', 'U', 'R', 'L', 'K', 'U', 'N', 'G', 'E', 'A', 'S', 'D', 'V'],
        ['N', 'A', 'O', 'B', 'X', 'C', 'S', 'T', 'A', 'C', 'H', 'U', 'I', 'O', 'L'],
        ['O', 'J', 'K', 'D', 'G', 'K', 'J', 'G', 'H', 'J', 'U', 'I', 'N', 'H', 'R'],
        ['A', 'H', 'R', 'H', 'O', 'A', 'I', 'D', 'F', 'S', 'E', 'T', 'R', 'G', 'H'],
        ['R', 'X', 'A', 'N', 'O', 'G', 'S', 'Y', 'E', 'R', 'O', 'G', 'A', 'T', 'S'],
        ['T', 'O', 'U', 'D', 'O', 'G', 'S', 'D', 'S', 'A', 'V', 'F', 'T', 'R', 'Y'],
        ['U', 'O', 'R', 'T', 'U', 'O', 'F', 'R', 'H', 'R', 'J', 'U', 'I', 'K', 'O'],
        ['B', 'T', 'I', 'A', 'R', 'T', 'H', 'Y', 'E', 'U', 'V', 'F', 'G', 'Q', 'A']
      ];
      const parsedData = new ParsedData(15, 10, data);
      parsedData.searchTerms.exactMatch.push('Dogs', 'Cats');

      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findExactMachesAsync()).resolves.toMatchObject([
        { key: 'Dogs', numberOfMatches: 2 },
        { key: 'Cats', numberOfMatches: 1 }
      ]);
    });
  });

  describe('match in all directions tests', () => {
    test('should return exact match results along horizontal data', () => {
      const parsedData = new ParsedData(4, 1, [['D', 'O', 'G', 'S']]);
      parsedData.searchTerms.exactMatch.push('Dogs');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findExactMachesAsync()).resolves.toMatchObject([{ key: 'Dogs', numberOfMatches: 1 }]);
    });

    test('should return exact match results along horizontal data - in reverse', () => {
      const parsedData = new ParsedData(4, 1, [['S', 'G', 'O', 'D']]);
      parsedData.searchTerms.exactMatch.push('Dogs');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findExactMachesAsync()).resolves.toMatchObject([{ key: 'Dogs', numberOfMatches: 1 }]);
    });

    test('should return exact match results along vertical data', () => {
      const parsedData = new ParsedData(1, 4, [['D'], ['O'], ['G'], ['S']]);
      parsedData.searchTerms.exactMatch.push('Dogs');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findExactMachesAsync()).resolves.toMatchObject([{ key: 'Dogs', numberOfMatches: 1 }]);
    });

    test('should return exact match results along vertical data - in reverse', () => {
      const parsedData = new ParsedData(1, 4, [['S'], ['G'], ['O'], ['D']]);
      parsedData.searchTerms.exactMatch.push('Dogs');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findExactMachesAsync()).resolves.toMatchObject([{ key: 'Dogs', numberOfMatches: 1 }]);
    });

    test('should return exact match results for diagonal left-to-right data', () => {
      const data = [
        ['D', 'D', 'E', 'S'],
        ['Q', 'O', 'R', 'A'],
        ['R', 'I', 'G', 'U'],
        ['N', 'A', 'O', 'S']
      ];
      const parsedData = new ParsedData(4, 4, data);
      parsedData.searchTerms.exactMatch.push('Dogs');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findExactMachesAsync()).resolves.toMatchObject([{ key: 'Dogs', numberOfMatches: 1 }]);
    });

    test('should return exact match results for diagonal left-to-right data - in reverse', () => {
      const data = [
        ['S', 'D', 'E', 'S'],
        ['Q', 'G', 'R', 'A'],
        ['R', 'I', 'O', 'U'],
        ['N', 'A', 'O', 'D']
      ];
      const parsedData = new ParsedData(4, 4, data);
      parsedData.searchTerms.exactMatch.push('Dogs');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findExactMachesAsync()).resolves.toMatchObject([{ key: 'Dogs', numberOfMatches: 1 }]);
    });

    test('should return exact match results for diagonal right-to-left data', () => {
      const data = [
        ['F', 'D', 'E', 'D'],
        ['Q', 'K', 'O', 'A'],
        ['R', 'G', 'P', 'U'],
        ['S', 'A', 'O', 'M']
      ];
      const parsedData = new ParsedData(4, 4, data);
      parsedData.searchTerms.exactMatch.push('Dogs');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findExactMachesAsync()).resolves.toMatchObject([{ key: 'Dogs', numberOfMatches: 1 }]);
    });

    test('should return exact match results for diagonal right-to-left data - in reverse', () => {
      const data = [
        ['F', 'D', 'E', 'S'],
        ['Q', 'K', 'G', 'A'],
        ['R', 'O', 'P', 'U'],
        ['D', 'A', 'O', 'M']
      ];
      const parsedData = new ParsedData(4, 4, data);
      parsedData.searchTerms.exactMatch.push('Dogs');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findExactMachesAsync()).resolves.toMatchObject([{ key: 'Dogs', numberOfMatches: 1 }]);
    });
  });

  describe('findFuzzyMatchesAsync tests', () => {
    test('should return empty results for call to get fuzzy matches, when not initialized first', () => {
      const m = new MatchMaker();

      return expect(m.findFuzzyMatchesAsync()).resolves.toHaveLength(0);
    });

    test('should return fuzzy match result, but no matches, when there is no data but fuzzyMatch search terms are provided and not initialized first', () => {
      const parsedData = new ParsedData();
      parsedData.searchTerms.fuzzyMatch.push('Train');
      const m = new MatchMaker(parsedData);
      // explicitly NOT calling m.init()
      return expect(m.findFuzzyMatchesAsync()).resolves.toMatchObject([{ key: 'Train', found: [] }]);
    });

    test('should return fuzzy match result, but no matches, when there is no data but fuzzyMatch search terms are provided', () => {
      const parsedData = new ParsedData();
      parsedData.searchTerms.fuzzyMatch.push('Train');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findFuzzyMatchesAsync()).resolves.toMatchObject([{ key: 'Train', found: [] }]);
    });

    test('should return fuzzy match results for search data provided', () => {
      const data = [
        ['A', 'D', 'E', 'S', 'F', 'J', 'R', 'A', 'S', 'L', 'X', 'D', 'F', 'R', 'T'],
        ['Q', 'B', 'R', 'A', 'I', 'N', 'O', 'U', 'E', 'W', 'H', 'G', 'Y', 'E', 'D'],
        ['R', 'I', 'R', 'U', 'R', 'L', 'K', 'U', 'N', 'G', 'E', 'A', 'S', 'D', 'V'],
        ['N', 'A', 'O', 'B', 'X', 'C', 'S', 'T', 'A', 'C', 'H', 'U', 'I', 'O', 'L'],
        ['O', 'J', 'K', 'D', 'G', 'K', 'J', 'G', 'H', 'J', 'U', 'I', 'N', 'H', 'R'],
        ['A', 'H', 'R', 'H', 'O', 'A', 'I', 'D', 'F', 'S', 'E', 'T', 'R', 'G', 'H'],
        ['R', 'X', 'A', 'N', 'O', 'G', 'S', 'Y', 'E', 'R', 'O', 'G', 'A', 'T', 'S'],
        ['T', 'O', 'U', 'D', 'O', 'G', 'S', 'D', 'S', 'A', 'V', 'F', 'T', 'R', 'Y'],
        ['U', 'O', 'R', 'T', 'U', 'O', 'F', 'R', 'H', 'R', 'J', 'U', 'I', 'K', 'O'],
        ['B', 'T', 'I', 'A', 'R', 'T', 'H', 'Y', 'E', 'U', 'V', 'F', 'G', 'Q', 'A']
      ];
      const parsedData = new ParsedData(15, 10, data);
      parsedData.searchTerms.fuzzyMatch.push('Train');
      const m = new MatchMaker(parsedData);
      m.init();

      return expect(m.findFuzzyMatchesAsync()).resolves.toMatchObject([{ key: 'Train', found: ['brain', 'trait', 'traon'] }]);
    });
  });
});

// TODO: add edge case tests for when the height/width are less than the parsed data contains
// TODO: add edge case tests for when the height/width are greater than the parsed data contains
