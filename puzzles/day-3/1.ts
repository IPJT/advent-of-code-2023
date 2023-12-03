import fs from "fs";

console.log(getSumOfPartNumbers());

function getSumOfPartNumbers() {
  const input = fs.readFileSync("puzzles/day-3/input.txt", {
    encoding: "utf8",
  });

  const rows = input.split("\n");

  return rows.reduce((sum, row, index) => {
    return (
      sum + getSumOfPartNumbersForRow(row, rows[index - 1], rows[index + 1])
    );
  }, 0);
}

function getSumOfPartNumbersForRow(
  currRow: string,
  prevRow?: string,
  nextRow?: string
): number {
  //get all numbers in row and the startIndex and endIndex
  const numberWithPositionArray = getNumbersArray(currRow);

  if (numberWithPositionArray.length === 0) {
    return 0;
  }

  //decide if a number is a part number
  return numberWithPositionArray.reduce((sum, numberWithPosition) => {
    if (isPartNumber(numberWithPosition, currRow, prevRow, nextRow)) {
      return sum + numberWithPosition.number;
    } else {
      return sum;
    }
  }, 0);
}

function isPartNumber(
  numberWithPosition: NumberWithPosition,
  currRow: string,
  prevRow?: string,
  nextRow?: string
): boolean {
  return (
    hasSymbolOnSameRow(numberWithPosition, currRow) ||
    (prevRow ? hasSymbolOnAdjRow(numberWithPosition, prevRow) : false) ||
    (nextRow ? hasSymbolOnAdjRow(numberWithPosition, nextRow) : false)
  );
}

function hasSymbolOnSameRow(
  numberWithPosition: NumberWithPosition,
  currRow: string
) {
  return (
    isSymbol(currRow[numberWithPosition.startIndex - 1]) ||
    isSymbol(currRow[numberWithPosition.endIndex + 1])
  );
}

function hasSymbolOnAdjRow(
  numberWithPosition: NumberWithPosition,
  adjRow: string
) {
  for (
    let i = numberWithPosition.startIndex - 1;
    i <= numberWithPosition.endIndex + 1;
    i++
  ) {
    if (isSymbol(adjRow[i])) {
      return true;
    }
  }

  return false;
}

function isSymbol(char?: string) {
  if (!char) {
    return false;
  }

  return char !== ".";
}

type NumberWithPosition = {
  number: number;
  startIndex: number;
  endIndex: number;
};

function getNumbersArray(row: string): NumberWithPosition[] {
  const regex = /\d+/g;
  const numbersArray = [] as NumberWithPosition[];
  let match;

  while ((match = regex.exec(row)) !== null) {
    const number = Number(match[0]);
    const startIndex = match.index;
    const endIndex = match.index + match[0].length - 1;
    numbersArray.push({ number, startIndex, endIndex });
  }

  return numbersArray;
}
