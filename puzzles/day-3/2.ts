import fs from "fs";

console.log(getSumOfGearRatios());

function getSumOfGearRatios() {
  const input = fs.readFileSync("puzzles/day-3/input.txt", {
    encoding: "utf8",
  });

  const rows = input.split("\n");

  return rows.reduce((sum, row, index) => {
    return (
      sum + getSumOfGearRatiosForRow(row, rows[index - 1], rows[index + 1])
    );
  }, 0);
}

function getSumOfGearRatiosForRow(
  currRow: string,
  prevRow?: string,
  nextRow?: string
): number {
  //get the indices of the potential gears in the array
  const potentialGearArray = getPotentialGearArray(currRow);

  if (potentialGearArray.length === 0) {
    return 0;
  }

  //decide if a potential gear is actually a gear (2 adjacent numbers)
  //if it is calculate the gear ratio and add these together
  return potentialGearArray.reduce((sum, potentialGearPosition) => {
    return sum + getGearRatio(potentialGearPosition, currRow, prevRow, nextRow);
  }, 0);
}

function getGearRatio(
  potentialGearPosition: number,
  currRow: string,
  prevRow?: string,
  nextRow?: string
): number {
  const adjNumbersOnCurrRow = getAdjNumbersOnCurrRow(
    potentialGearPosition,
    currRow
  );

  const adjNumbersOnPrevRow = prevRow
    ? getAdjNumbersOnAdjRow(potentialGearPosition, prevRow)
    : [];

  const adjNumbersOnNextRow = nextRow
    ? getAdjNumbersOnAdjRow(potentialGearPosition, nextRow)
    : [];

  const adjNumbers = [
    ...adjNumbersOnCurrRow,
    ...adjNumbersOnPrevRow,
    ...adjNumbersOnNextRow,
  ];

  const gearRatio =
    adjNumbers.length === 2
      ? (adjNumbers[0] as number) * (adjNumbers[1] as number)
      : 0;

  return gearRatio;
}

function getAdjNumbersOnCurrRow(
  potentialGearPosition: number,
  currRow: string
): number[] {
  const numberWithPositionArray = getNumbersArray(currRow);

  const precedingValue = numberWithPositionArray.find(
    (numberWithPosition) =>
      numberWithPosition.endIndex === potentialGearPosition - 1
  )?.number;

  const succeedingValue = numberWithPositionArray.find(
    (numberWithPosition) =>
      numberWithPosition.startIndex === potentialGearPosition + 1
  )?.number;

  return [precedingValue, succeedingValue].filter((value) => value) as number[];
}

function getAdjNumbersOnAdjRow(
  potentialGearPosition: number,
  adjRow: string
): number[] {
  const numberWithPositionArray = getNumbersArray(adjRow);

  const minValue = potentialGearPosition - 1;
  const maxValue = potentialGearPosition + 1;

  const adjNumbersWithPositionArray = numberWithPositionArray.filter(
    (numberWithPosition) =>
      numberWithPosition.endIndex >= minValue &&
      numberWithPosition.startIndex <= maxValue
  );

  return adjNumbersWithPositionArray.map(
    (numberWithPosition) => numberWithPosition.number
  );
}

function getPotentialGearArray(row: string): number[] {
  const regex = /\*/g;
  const potentialGearsArray = [] as number[];
  let match;

  while ((match = regex.exec(row)) !== null) {
    const index = match.index;
    potentialGearsArray.push(index);
  }

  return potentialGearsArray;
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
