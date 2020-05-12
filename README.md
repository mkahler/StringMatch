# StringMatch

StringMatch is a simple programming exercise to test out ways to find strings in a given block of characters. There are exact matches and fuzzy matches.

## Implementation

The solution is a NodeJS console application that needs to be provided with the a name that contains parameters and data for the exercise.

#### Preparing the source code to run

Navigate to the source code location.
```
$ cd StringMatch
```

Restore the dependencies.
```
$ npm install 
```

#### Run Application (Command line usage):
Available command line parameters are:<br />
-f, --file to specify a file name as input<br />

**Example:**

```
node app.js -f inputFile.txt
```

#### Future Enhancements
* Add unit test converage
* Convert code to use TypeScript
* Use Trie structure for the search words

## Scenario

#### Given a text file with rows in the following format:

|Contents|Description|
|:---------|:---------|
|Width, Height|Positive integers. <br /> Values are separated by a comma.|
|Data Row 1<br /> Data Row 2<br /> ...<br /> Data Row (Height)<br />|Character data [A-Z]. <br /> Number of chars == Width|
|Search word 1, Search word 2, ..., Search word N| Character data [A-z]. <br /> Number of chars and words == variable. <br /> Words are separated by commas.|
|Fuzzy search word 1, Fuzzy search word 2, …, Fuzzy search word N|Character data [A-z]. <br /> Number of chars and words == variable. <br /> Words are separated by commas.|

Each row in the table above represents a row in the file.  There can be many data rows, there can only be one each of the other rows.  

#### Sample Input
```
15,10
ADESFJRASLXDFRT
QBRAINOUEWHGYED
RIRURLKUNGEASDV
NAOBXCSTACHUIOL
OJKDGKJGHJUINHR
AHRHOAIDFSETRGH
RXANOGSYEROGATS
TOUDOGSDSAVFTRY
UORTUOFRHRJUIKO
BTIARTHYEUVFGQA
Dogs, Cats
Train
```

#### Part 1

**Output the following:**

Return the number of times you find each search word in the data.  Words go forwards, backwards, horizontal, vertical   and diagonal.  Perform case insensitive matching.

**Example:**

If you ran your program on the sample input file, this is the output expected:

```
Part 1:
-------
Dogs: 2
Cats: 1
```

#### Part 2

**Output the following:**

Return all permutations of the fuzzy word with zero or one incorrect letters.  All other rules from Part 1 apply.  For instance, a fuzzy search word of “Food” would match these strings in the data: “food”, “foot”, “frod”, “lood”, etc.  Matching strings will mostly be nonsense words not found in a dictionary.

**Example:**

If you ran your program on the sample input file, this is the output expected:

```
Part 2:
-------
Train: brain, trait, traon
```
