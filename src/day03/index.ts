import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const pattern: RegExp = /mul\((\d+)\,(\d+)\)/g;
  const matches = input.matchAll(pattern);
  let total = 0;
  for (const match of matches) {
    total += parseInt(match[1]) * parseInt(match[2])
  }

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const pattern = /mul\((\d+)\,(\d+)\)|do\(\)|don't\(\)/g;
  const matches = input.matchAll(pattern);
  let multiplicationOn = true;
  let total = 0;
  for (const match of matches) {
    switch (match[0]) {
      case "do()":
        multiplicationOn = true;
        break;
      case "don't()":
        multiplicationOn = false;
        break
      default:
        if (multiplicationOn) {
          total += parseInt(match[1]) * parseInt(match[2])
        }
        break;
    }
  }

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
