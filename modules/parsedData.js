class SearchTerms {
  constructor(exactMatches = [], fuzzyMatches = []) {
    this.exactMatch = exactMatches;
    this.fuzzyMatch = fuzzyMatches;
  }
}

class ParsedData {
  constructor(w = 0, h = 0, d = []) {
    this.width = w;
    this.height = h;
    this.data = d;
    this.searchTerms = new SearchTerms();
  }
}

module.exports = { SearchTerms, ParsedData };
