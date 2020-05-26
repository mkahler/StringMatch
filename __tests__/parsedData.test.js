const { ParsedData, SearchTerms } = require('../modules/parsedData.js');

describe('Defaults meet expectations', () => {
  describe('ParsedData ctor', () => {
    test('should have default width when no paramter is provided', () => {
      const p = new ParsedData();
      expect(p.width).toEqual(0);
    });

    test('should have provided width when parameter is provided', () => {
      const expectedWidth = 15;
      const p = new ParsedData(expectedWidth);
      expect(p.width).toEqual(expectedWidth);
    });

    test('should have default height when no paramter is provided', () => {
      const p = new ParsedData();
      expect(p.height).toEqual(0);
    });

    test('should have provided height when parameter is provided', () => {
      const expectedHeight = 15;
      const p = new ParsedData(1, expectedHeight);
      expect(p.height).toEqual(expectedHeight);
    });

    test('should have default data (as empty array) when no paramter is provided', () => {
      const p = new ParsedData();
      expect(p.data).toEqual([]);
    });

    test('should have provided data array when parameter is provided', () => {
      const expectedData = ['A', 'R'];
      const p = new ParsedData(1, 2, expectedData);
      expect(p.data).toMatchObject(expectedData);
    });

    test('should have all full properties when they are all provided', () => {
      const expectedWidth = 20;
      const expectedHeight = 15;
      const expectedData = ['A', 'R', 'G'];
      const p = new ParsedData(expectedWidth, expectedHeight, expectedData);
      expect(p).toMatchObject({ width: expectedWidth, height: expectedHeight, data: expectedData });
    });
  });

  describe('SearchTerms ctor', () => {
    test('should have default exactMatch value if paramter is not provided', () => {
      const s = new SearchTerms();
      expect(s.exactMatch).toEqual([]);
    });

    test('should have provided exactMatch value if paramter is present', () => {
      const expectedExactSearchMatch = ['hello', 'world'];
      const s = new SearchTerms(expectedExactSearchMatch);
      expect(s.exactMatch).toEqual(expectedExactSearchMatch);
    });

    test('should have default fuzzyMatch value if paramter is not provided', () => {
      const s = new SearchTerms();
      expect(s.fuzzyMatch).toEqual([]);
    });

    test('should have provided fuzzyMatch value if paramter is present', () => {
      const expectedFuzzySearchMatch = ['brand'];
      const s = new SearchTerms([], expectedFuzzySearchMatch);
      expect(s.fuzzyMatch).toEqual(expectedFuzzySearchMatch);
    });

    test('should have both exactMatch and fuzzyMatch values if paramters are present', () => {
      const expectedExactSearchMatch = ['hello', 'world'];
      const expectedFuzzySearchMatch = ['brand'];
      const s = new SearchTerms(expectedExactSearchMatch, expectedFuzzySearchMatch);
      expect(s).toMatchObject({ exactMatch: expectedExactSearchMatch, fuzzyMatch: expectedFuzzySearchMatch });
    });
  });
});
