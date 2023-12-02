import fs from "fs";

const numberAsStringRecord = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

sumOfCalibrationValues();

function sumOfCalibrationValues() {
  const input = fs.readFileSync("puzzles/day-1/1-1-input.txt", {
    encoding: "utf8",
  });

  const lines = input.split("\n");

  const sumOfCalibrationValues = lines.reduce((sum, currLine) => {
    return sum + calibrationValueForLine(currLine);
  }, 0);

  console.log(`The sumOfCalibrationValues is ${sumOfCalibrationValues}`);
}

function calibrationValueForLine(line: string): number {
  const firstNumber = getFirstNumberOfLine(line);
  const lastNumber = getLastNumberOfLine(line);

  const calibrationValueAsString = firstNumber + lastNumber;

  return Number(calibrationValueAsString);
}

function getFirstNumberOfLine(line: string): string {
  for (let i = 0; i < line.length; i++) {
    const char = line[i] as string;
    if (isCharANumber(char)) {
      return char;
    }
    const charFirstCharInNumberAsString = getNumberAsString(line.substring(i));
    if (charFirstCharInNumberAsString) {
      return numberAsStringRecord[charFirstCharInNumberAsString].toString();
    }
  }
  throw new Error(`No number found in line: ${line}`);
}

function getLastNumberOfLine(line: string): string {
  let lastNumber: undefined | string;

  for (let i = 0; i < line.length; i++) {
    const char = line[i] as string;
    if (isCharANumber(char)) {
      lastNumber = char;
    }
    const charFirstCharInNumberAsString = getNumberAsString(line.substring(i));
    if (charFirstCharInNumberAsString) {
      lastNumber =
        numberAsStringRecord[charFirstCharInNumberAsString].toString();
    }
  }
  if (lastNumber) {
    return lastNumber;
  }
  throw new Error(`No number found in line: ${line}`);
}

function isCharANumber(char: string) {
  const charCode = char.charCodeAt(0);
  return charCode >= 48 && charCode <= 57;
}

function getNumberAsString(string: string) {
  const numberAsStringArray = Object.keys(numberAsStringRecord) as Array<
    keyof typeof numberAsStringRecord
  >;
  return numberAsStringArray.find((value) => {
    return string.startsWith(value);
  });
}
