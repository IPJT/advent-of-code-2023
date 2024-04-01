import fs from "fs";

function main() {
  const timesAndDistances = prepareData();

  const possibilities = timesAndDistances.reduce((acc, curr) => {
    return acc * getNumberOfPossibilities(curr);
  }, 1);

  console.log(possibilities);
}

function prepareData() {
  const input = fs.readFileSync("puzzles/day-5/input.txt", "utf8").split("\n");
  const times = input[0]?.match(/(\d+)/g) as string[];
  const distances = input[1]?.match(/(\d+)/g) as string[];
  return times.map((time, index) => ({
    time: Number(time),
    previousRecord: Number(distances[index] as string),
  }));
}

export function getNumberOfPossibilities(timeAndDistance: {
  time: number;
  previousRecord: number;
}) {
  let minButtonPressTime =
    (timeAndDistance.time -
      Math.sqrt(
        timeAndDistance.time ** 2 - 4 * timeAndDistance.previousRecord
      )) /
    2;

  let maxButtonPressTime =
    (timeAndDistance.time +
      Math.sqrt(
        timeAndDistance.time ** 2 - 4 * timeAndDistance.previousRecord
      )) /
    2;

  if (minButtonPressTime % 1 === 0) {
    minButtonPressTime += 1;
  }

  if (maxButtonPressTime % 1 === 0) {
    maxButtonPressTime -= 1;
  }

  const numberOfPossibilities =
    Math.floor(maxButtonPressTime) - Math.ceil(minButtonPressTime) + 1;

  return numberOfPossibilities;
}

main();

// speed = buttonPressTime
// traveledTime = raceTime - buttonPressTime
// distanceTraveled = traveledTime * speed
// distanceTraveled = (raceTime - buttonPressTime) * buttonPressTime = raceTime * buttonPressTime - buttonPressTime^2
// distanceTraveled = raceTime * buttonPressTime - buttonPressTime^2
// c = -x^2 + bx
// x^2 - bx + c = 0
// x = (b +- sqrt(b^2 - 4c)) / 2
// buttonPressTime = (raceTime +- sqrt(raceTime^2 - 4 * distanceTraveled)) / 2

// 10 = -x^2 + 7x
// 0 = -x^2 + 7x - 10
// 0 = x^2 - 7x + 10
// 0 = (x - 2)(x - 5)
// x = 2 or x = 5
