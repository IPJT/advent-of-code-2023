import fs from "fs";

const BAG_CONTENT: Set = {
  red: 12,
  green: 13,
  blue: 14,
};

console.log(getSumOfPossibleGameIds());

function getSumOfPossibleGameIds() {
  const input = fs.readFileSync("puzzles/day-2/1-input.txt", "utf8");
  const games = input.split("\n");

  return games.reduce((sumOfPossibleGameIds, currentGame) => {
    const parsedGame = parseGame(currentGame);
    const isGamePossible = getIsGamePossible(parsedGame);
    if (isGamePossible) {
      return sumOfPossibleGameIds + Number(parsedGame.id);
    } else {
      return sumOfPossibleGameIds;
    }
  }, 0);
}

function getIsGamePossible(game: Game) {
  for (const set of game.sets) {
    if (!getIsSetPossible(set)) {
      return false;
    }
  }
  return true;
}

function getIsSetPossible(set: Set) {
  return (
    set.blue <= BAG_CONTENT.blue &&
    set.red <= BAG_CONTENT.red &&
    set.green <= BAG_CONTENT.green
  );
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
