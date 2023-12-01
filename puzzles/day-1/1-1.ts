import fs from "fs";

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
  for (let i = 0; i <= line.length; i++) {
    const char = line[i] as string;
    if (isCharANumber(char)) {
      return char;
    }
  }
  throw new Error(`No number found in line: ${line}`);
}

function getLastNumberOfLine(line: string): string {
  for (let i = line.length - 1; i >= 0; i--) {
    const char = line[i] as string;
    if (isCharANumber(char)) {
      return char;
    }
  }
  throw new Error(`No number found in line: ${line}`);
}

function isCharANumber(char: string) {
  const charCode = char.charCodeAt(0);
  return charCode >= 48 && charCode <= 57;
}
