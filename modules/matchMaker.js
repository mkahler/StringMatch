const extractVerticalStringsAsync = (data, height) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const temp = [];
            for (let row = 0; row < height; row++) {
                temp.push(data[row].join('').toLowerCase());
                temp.push(data[row].slice().reverse().join('').toLowerCase());
            }
            resolve(temp);
        }, 0);
    });
};

const extractHorizontalStringsAsync = (data, width, height) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const temp = [];
            for (let column = 0; column < width; column++) {
                const builder = [];
                for (let row = 0; row < height; row++) {
                    builder.push(data[row][column]);
                }

                temp.push(builder.join('').toLowerCase());
                temp.push(builder.reverse().join('').toLowerCase()); // don't need a copy of the array since it will be thrown away
            }
            resolve(temp);
        }, 0);
    });
};

const extractLeftToRightStringsAsync = (data, width, height) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const temp = [];

            // the max amount of strings that can be taken from the data is (width + height - 1)
            const maxIterationsForDiagonal = width + height - 1;
            let currentIteration = 0;

            // initial states for the indexes of the data
            let row = 0;
            let col = 0;

            const builder = [];

            // loop through the  characters in the data to get the strings
            while (currentIteration < maxIterationsForDiagonal) {

                let r = row;

                // parse over the top of the data from left to right
                while (r < height && col >= 0) {
                    builder.push(data[r++][col--]);
                }

                // check the current state of things, if the current interation is greater that the width of the data, 
                // then need to start parsing down the right side of the data
                if (currentIteration++ >= (width - 1)) {
                    col = width - 1;
                    row++;
                }
                else {
                    col = currentIteration;
                }

                // add the new string(s) to the list
                temp.push(builder.join('').toLocaleLowerCase());
                if (builder.length > 1) {
                    temp.push(builder.reverse().join('').toLowerCase());
                }

                // clear it out for the next interation
                builder.length = 0;
            }

            resolve(temp);
        }, 0);
    });
};

const extractRightToLeftStringsAsync = (data, width, height) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const temp = [];

            // the max amount of strings that can be taken from the data is (width + height - 1)
            const maxIterationsForDiagonal = width + height - 1;
            let currentIteration = 0;

            // initial states for the indexes of the data
            let row = 0;
            let col = width - 1;

            const builder = [];

            // loop through the  characters in the data to get the strings
            while (currentIteration < maxIterationsForDiagonal) {
                let c = col;
                let r = row;

                // parse over the top of the data from right to left
                while (r < height && c < width) {
                    builder.push(data[r++][c++]);
                }

                // check the current state of things, if the current interation is greater that the width of the data, 
                // then need to start parsing down the left side of the data
                if (currentIteration++ >= (width - 1)) {
                    row++;
                }
                else {
                    col--;
                }

                // add the new string(s) to the list
                temp.push(builder.join('').toLocaleLowerCase());
                if (builder.length > 1) {
                    temp.push(builder.reverse().join('').toLowerCase());
                }

                // clear it out for the next interation
                builder.length = 0;
            }
            resolve(temp);
        }, 0);
    });;
}

const createFuzzyString = (source, currentPosition) => {
    const adjustedLength = source.length - 1;
    const beforeCurrentPosition = (currentPosition > 0)
        ? source.substring(0, currentPosition)
        : '';
    const afterCurrentPosition = (currentPosition < adjustedLength)
        ? source.substring(currentPosition + 1)
        : '';
    return `${beforeCurrentPosition}[a-z]${afterCurrentPosition}`;
};

const createFuzzySearchExpression = (source = '') => {
    const variations = [];

    // Create a regular expression that will be something like this.
    //      Given source string: 'truck'
    //      Resulting regular expression: /[a-z]ruck|t[a-z]uck|tr[a-z]ck|tru[a-z]k|truc[a-z]]/gi
    for (let currentCharacterPos = 0; currentCharacterPos < source.length; currentCharacterPos++) {
        variations.push(createFuzzyString(source, currentCharacterPos));
    }

    return new RegExp(variations.join('|'), 'gi');
};

class MatchMaker {
    constructor(parsedFileData) {
        this.#parsedFileData = parsedFileData;
        this.#searchList = [];
    }

    #parsedFileData

    #searchList

    initAsync() {
        return Promise.all([
            // extract all vertical from the data (and reverse)
            extractVerticalStringsAsync(this.#parsedFileData.data, this.#parsedFileData.height),

            // extract all horizontal from the data (and reverse)
            extractHorizontalStringsAsync(this.#parsedFileData.data, this.#parsedFileData.width, this.#parsedFileData.height),

            // extract left-to-right diagnal (and reverse)
            extractLeftToRightStringsAsync(this.#parsedFileData.data, this.#parsedFileData.width, this.#parsedFileData.height),

            // extract right-to-left diagnal (and reverse)
            extractRightToLeftStringsAsync(this.#parsedFileData.data, this.#parsedFileData.width, this.#parsedFileData.height)
        ])
            .then(([vertical, horizontal, leftToRight, rightToLeft]) => {
                this.#searchList.push(...vertical, ...horizontal, ...leftToRight, ...rightToLeft);
            })
            .catch((error) => {
                console.log('There was a problem while initializing the search conditions');
                console.log(error);
            });
    }

    findExactMachesAsync() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const results = [];
                this.#parsedFileData.searchTerms.exactMatch.forEach((term) => {
                    const termResult = { key: term, numberOfMatches: 0 };
                    results.push(termResult);
                    this.#searchList.forEach((item) => {
                        if (item.includes(term.toLowerCase())) {
                            termResult.numberOfMatches++;
                        }
                    });
                });
                resolve(results);
            }, 0);
        });
    }

    findFuzzyMatchesAsync() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const results = [];
                this.#parsedFileData.searchTerms.fuzzyMatch.forEach((term) => {
                    const termResult = { key: term, found: [] };
                    results.push(termResult);
                    const fuzzyExpression = createFuzzySearchExpression(term);

                    this.#searchList.forEach((item) => {
                        termResult.found.push(...item.matchAll(fuzzyExpression));
                    });
                });
                resolve(results);
            }, 0);
        });
    }
}

module.exports = MatchMaker;