import {
  getEquation as getEquation,
  prepareInput as prepareInput,
  solveLinearEq as solveLinearEq,
} from "./1";

const hailList = prepareInput();

it("solveLinearEq", () => {
  //@ts-ignore
  const eq1 = getEquation(hailList[0]);
  //@ts-ignore
  const eq2 = getEquation(hailList[3]);
  expect(solveLinearEq([[...eq1], [...eq2]])).toBe([]);
});
