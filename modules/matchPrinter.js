const printExactMatches = (matches) => {
  console.log(`
Part 1:
-------`);

  if (matches.length === 0) {
    console.log('There are no items for part 1');
  } else {
    matches.forEach((element) => {
      console.log(`${element.key} : ${element.numberOfMatches}`);
    });
  }
};

const printFuzzyMatches = (matches) => {
  console.log(`
Part 2:
-------`);

  if (matches.length === 0) {
    console.log('There are no items for part 2');
  } else {
    matches.forEach((element) => {
      console.log(`${element.key} : ${element.found.join(', ')}`);
    });
  }
};

module.exports = { printExactMatches, printFuzzyMatches };
