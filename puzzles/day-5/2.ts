import fs from "fs";
import { getNumberOfPossibilities } from "./1";

function main() {
  const timesAndDistances = prepareData();

  const possibilities = getNumberOfPossibilities(timesAndDistances);

  console.log(possibilities);
}

function prepareData() {
  const input = fs.readFileSync("puzzles/day-5/input.txt", "utf8").split("\n");
  const time = (input[0]?.match(/(\d+)/g) as string[]).join("");
  const distance = (input[1]?.match(/(\d+)/g) as string[]).join("");
  return {
    time: Number(time),
    previousRecord: Number(distance as string),
  };
}

main();
