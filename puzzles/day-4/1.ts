import fs from "fs";

console.log(getTotalPoints());

function getTotalPoints() {
  const input = fs.readFileSync("puzzles/day-4/input.txt", {
    encoding: "utf-8",
  });
  const cards = input.split("\n");

  return cards.reduce((total, card) => {
    const parsedCard = parseCard(card);
    return total + getPointsForCard(parsedCard);
  }, 0);
}

function getPointsForCard(card: Card): number {
  return card.winningNumbers.reduce((sum, winningNumber) => {
    if (card.myNumbers.includes(winningNumber)) {
      if (sum === 0) {
        return 1;
      } else {
        return sum * 2;
      }
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
