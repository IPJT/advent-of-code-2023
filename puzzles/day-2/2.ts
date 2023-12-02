import fs from "fs";

console.log(getSumOfPower());

function getSumOfPower() {
  const input = fs.readFileSync("puzzles/day-2/1-input.txt", "utf8");
  const games = input.split("\n");

  return games.reduce((sumOfPower, currentGame) => {
    const parsedGame = parseGame(currentGame);
    return sumOfPower + getPowerOfGame(parsedGame);
  }, 0);
}

function getPowerOfGame(game: Game): number {
  const maxValues = game.sets.reduce<{
    maxGreen: number;
    maxRed: number;
    maxBlue: number;
  }>(
    (acc, set) => {
      return {
        maxGreen: Math.max(set.green, acc.maxGreen),
        maxRed: Math.max(set.red, acc.maxRed),
        maxBlue: Math.max(set.blue, acc.maxBlue),
      };
    },
    { maxGreen: 0, maxRed: 0, maxBlue: 0 }
  );

  return maxValues.maxBlue * maxValues.maxGreen * maxValues.maxRed;
}

type Game = {
  id: string;
  sets: Set[];
};

type Set = {
  red: number;
  green: number;
  blue: number;
};

function parseGame(game: string): Game {
  //Game 1: 13 green, 3 red; 4 red, 9 green, 4 blue; 9 green, 10 red, 2 blue

  const regex = /Game\s(\d+)/;
  const match = game.match(regex);
  if (!match) {
    throw new Error("No Game id was found");
  }
  const id = match[1] as string;

  const setsStrings = game.split(";");
  const sets = setsStrings.map((setString) => parseSetString(setString));

  return {
    id,
    sets,
  };
}

function parseSetString(setString: string): Set {
  const regexGreen = /(\d+)\sgreen/;
  const matchGreen = setString.match(regexGreen);
  const green = matchGreen ? Number(matchGreen[1]) : 0;

  const regexRed = /(\d+)\sred/;
  const matchRed = setString.match(regexRed);
  const red = matchRed ? Number(matchRed[1]) : 0;

  const regexBlue = /(\d+)\sblue/;
  const matchBlue = setString.match(regexBlue);
  const blue = matchBlue ? Number(matchBlue[1]) : 0;

  return {
    red,
    green,
    blue,
  };
}
