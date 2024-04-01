import fs from "fs";

//const TEST_AREA_MIN = 7;
//const TEST_AREA_MAX = 27;
const TEST_AREA_MIN = 200000000000000;
const TEST_AREA_MAX = 400000000000000;

function main() {
  const hailList = prepareInput();

  let numberOfIntersecting = 0;

  for (let i = 0; i < hailList.length; i++) {
    for (let a = i + 1; a < hailList.length; a++) {
      //@ts-ignore
      const isIntersecting = getIsIntersecting(hailList[i], hailList[a]);
      if (isIntersecting) {
        numberOfIntersecting++;
      }
    }
  }

  console.log(numberOfIntersecting);
}

main();

function getIsIntersecting(
  hail1: Record<string, number>,
  hail2: Record<string, number>
) {
  const eq1 = getEquation(hail1);
  const eq2 = getEquation(hail2);

  const [x, y] = solveLinearEq([[...eq1], [...eq2]]);

  if (!x || !y) {
    return false;
  }

  return isWithinTestArea(x, y) && isFuture(x, hail1) && isFuture(x, hail2);
}

export function getEquation(
  hail: Record<string, number>
): [number, number, number] {
  //@ts-ignore
  if (hail.dy === 0 || hail.dx === 0) {
    console.log("ooops");
  }
  //@ts-ignore
  const k = hail.dy / hail.dx;
  //@ts-ignore
  const m = -k * hail.x + hail.y;

  return [-k, 1, m];
}

export function prepareInput() {
  const input = fs.readFileSync("puzzles/day-24/input.txt", "utf8").split("\n");
  const hailList = input.map((hailString: string) => {
    const posAndSpeeds = hailString.split("@");
    const positions = (posAndSpeeds[0] as string).split(",");
    const speeds = (posAndSpeeds[1] as string).split(",");

    const x = Number(positions[0]);
    const y = Number(positions[1]);
    const z = Number(positions[2]);
    const dx = Number(speeds[0]);
    const dy = Number(speeds[1]);
    const dz = Number(speeds[2]);

    return {
      x,
      y,
      z,
      dx,
      dy,
      dz,
    };
  });

  return hailList as Record<string, number>[];
}

function isWithinTestArea(x: number, y: number) {
  return (
    x >= TEST_AREA_MIN &&
    x <= TEST_AREA_MAX &&
    y >= TEST_AREA_MIN &&
    y <= TEST_AREA_MAX
  );
}

function isFuture(x: number, eq: Record<string, number>) {
  //@ts-ignore
  const t = ((x - eq.x) / eq.dx) as number;

  return t > 0;
}

export function solveLinearEq(
  mat: [[number, number, number], [number, number, number]]
) {
  const originalMat = [[...mat[0]], [...mat[1]]] as [
    [number, number, number],
    [number, number, number]
  ];

  getEcholonForm(mat);

  const y = getYFromEq(mat[1]);

  const xFromFirst = getXWithY(originalMat[0], y);
  const xFromSecond = getXWithY(originalMat[1], y);

  return [xFromFirst, y];
}

function getYFromEq(eq: [number, number, number]) {
  const m = eq[2];
  const yCoef = eq[1];
  const y = m / yCoef;

  return y;
}

function getXWithY(eq: [number, number, number], y: number) {
  const yCoefTimesY = eq[1] * y;
  const newM = eq[2] - yCoefTimesY;
  const xCoef = eq[0];
  const x = newM / xCoef;

  return x;
}

//@ts-ignore
function change(mat, index, pivot) {
  if (index + 1 >= mat.length) {
    return;
  }
  let newMat = Object.assign([], mat);
  for (let i = index + 1; i < newMat.length; i++) {
    const multiplier = newMat[i][pivot] * -1;
    for (let j = 0; j < newMat[i].length; j++) {
      newMat[i][j] = newMat[i][j] + newMat[index][j] * multiplier;
    }
  }
  return newMat;
}

//@ts-ignore
function normalize(mat, index, pivot) {
  let newMat = Object.assign([], mat);
  let multiplier = 1 / newMat[index][pivot];
  for (let i = 0; i < newMat[index].length; i++) {
    if (newMat[index][i] != 0) {
      newMat[index][i] *= multiplier;
    }
  }
  return newMat;
}

//@ts-ignore
function getEcholonForm(
  //@ts-ignore
  mat
): [[number, number, number], [number, number, number]] {
  let pivots = mat.length - 1;
  for (let pivot = 0; pivot < pivots; pivot++) {
    mat = normalize(mat, pivot, pivot);
    mat = change(mat, pivot, pivot);
  }
  return mat;
}

//@ts-ignore
function areApproximatelyEqual(a, b, tolerance) {
  return Math.abs(a - b) <= tolerance;
}
