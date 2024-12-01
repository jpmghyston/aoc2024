import run from "aocrunner";

const parseInput = (rawInput: string): number[][] => {
  let firstList: number[] = [];
  let secondList: number[] = [];
  let qq = rawInput.split("\n").map((line) => {
    let [first, second] = line.split("   ");
    firstList.push(parseInt(first));
    secondList.push(parseInt(second));
  });
  return [firstList, secondList];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sortedInput = input.map((x) => x.sort());
  let distanceTotal = 0;
  for (let i = 0; i < sortedInput[0].length; i++) {
    distanceTotal += Math.abs(sortedInput[0][i] - sortedInput[1][i]);
  }
  return distanceTotal;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let similarityTotal = 0;
  for (let i = 0; i < input[0].length; i++) {
    let leftNum = input[0][i];
    let countOfLeftNumInRightArray = input[1].filter((x) => x == leftNum).length;
    similarityTotal += leftNum * countOfLeftNumInRightArray;
  }

  return similarityTotal;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: "",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
