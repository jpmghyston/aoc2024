import run from "aocrunner";

const parseInput = (rawInput: string): number[][] => {
  return rawInput.split("\n").map((line) => line.split(" ").map(Number));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.filter(reportIsSafePart1).length;
};

const reportIsSafePart1 = (report: number[]): Boolean => {
  if (report[1] - report[0] === 0) {
    return false;
  }
  let isIncreasing = report[1] - report[0] > 0;
  for (let i = 0; i < report.length - 1; i++) {
    let change = report[i+1] - report[i]
    if (Math.abs(change) < 1 || Math.abs(change) > 3) {
      return false;
    }
    if ((change > 0) !== isIncreasing) {
      return false
    } 

  }
  return true;
}

const reportIsSafePart2 = (report: number[]): Boolean => {
  if (reportIsSafePart1(report)) {
    return true;
  }
  for (let i = 0; i < report.length; i++) {
    if (reportIsSafePart1(removeElementAt(report, i))) {
      return true;
    }
  }
  return false;
}

const removeElementAt = (arr: number[], idx: number) => {
  let copy = [...arr];
  copy.splice(idx, 1);
  return copy;
} 

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.filter(reportIsSafePart2).length;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
