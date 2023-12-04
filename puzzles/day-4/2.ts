import fs from "fs";
import { parse } from "path";

console.log(getTotalScratchCards());

function getTotalScratchCards() {
  const input = fs.readFileSync("puzzles/day-4/input.txt", {
    encoding: "utf-8",
  });
  const cards = input.split("\n");

  let numberOfCards: Record<number, number> = {};

  for (let i = 0; i < cards.length; i++) {
    numberOfCards[i] = 1;
  }

  for (let i = 0; i < cards.length; i++) {
    const parsedCard = parseCard(cards[i] as string);
    const pointsForCard = getPointsForCard(parsedCard);

    for (let k = 0; k < pointsForCard; k++) {
      if (numberOfCards[i + 1 + k]) {
        numberOfCards[i + 1 + k] =
          (numberOfCards[i + 1 + k] as number) +
          1 * (numberOfCards[i] as number);
      }
    }
  }

  const numberOfCardsArray = Object.values(numberOfCards);

  return numberOfCardsArray.reduce((sum, numberOfCards) => sum + numberOfCards);
}

function getPointsForCard(card: Card): number {
  return card.winningNumbers.reduce((sum, winningNumber) => {
    if (card.myNumbers.includes(winningNumber)) {
      return sum + 1;
    }
    return sum;
  }, 0);
}

type Card = {
  winningNumbers: string[];
  myNumbers: string[];
};

function parseCard(card: string): Card {
  const regexWin = /Card\s+\d+:\s+((?:\d+\s+)+\d+)/;

  const matchWin = card.match(regexWin);

  if (!matchWin?.[1]) {
    throw new Error("No match found");
  }

  const winningNumbers = matchWin[1]
    .split(" ")
    .filter((number) => number !== "");

  const regexMy = /\|\s+((?:\d+\s+)+\d+)/;

  const matchMy = card.match(regexMy);

  if (!matchMy?.[1]) {
    throw new Error("No match found");
  }

  const myNumbers = matchMy[1].split(" ").filter((number) => number !== "");

  return { winningNumbers, myNumbers };
}
