import run from "aocrunner";

type Equation = {
  testValue: number;
  numbers: number[]
}

type Operation = 
  | "Add"
  | "Multiply"
  | "Concatenate"

const possiblePermutationsOfOperationsPartOne = (length: number): Operation[][] => {
  const operations: Operation[] = ["Add", "Multiply"];
  const permutations: Operation[][] = [];
  for (let i = 0; i < Math.pow(2, length); i++) {
    const permutation: Operation[] = [];
    for (let j = 0; j < length; j++) {
      permutation.push(operations[(i >> j) & 1]);
    }
    permutations.push(permutation);
  }
  return permutations;
}

const possiblePermutationsOfOperationsPartTwo = (length: number): Operation[][] => {
  const operations: Operation[] = ["Add", "Multiply", "Concatenate"];
  const permutations: Operation[][] = [];
  for (let i = 0; i < Math.pow(3, length); i++) {
    const permutation: Operation[] = [];
    for (let j = 0; j < length; j++) {
      permutation.push(operations[Math.floor(i / Math.pow(3, j)) % 3]);
    }
    permutations.push(permutation);
  }
  return permutations;
}

const parseInput = (rawInput: string): Equation[] => {
  return rawInput.split("\n").map(line => {
    const [testValue, equation] = line.split(":").map(x => x.trim())
    return {
      testValue: parseInt(testValue),
      numbers: equation.split(" ").map(x => parseInt(x))
    }
  })

};

const equationCouldBeTruePartOne = (equation: Equation): Boolean => {
  const permutations = possiblePermutationsOfOperationsPartOne(equation.numbers.length - 1);
  for (const permutation of permutations) {
    let total = equation.numbers[0];
    for (let i = 0; i < permutation.length; i++) {
      switch (permutation[i]) {
        case "Add":
          total += equation.numbers[i + 1];
          break;
        case "Multiply":
          total *= equation.numbers[i + 1];
          break;
      }
    }
    if (total === equation.testValue) {
      return true;
    }
  }

  return false;
}

const equationCouldBeTruePartTwo = (equation: Equation): Boolean => {
  const permutations = possiblePermutationsOfOperationsPartTwo(equation.numbers.length - 1);
  for (const permutation of permutations) {
    let total = equation.numbers[0];
    for (let i = 0; i < permutation.length; i++) {
      switch (permutation[i]) {
        case "Add":
          total += equation.numbers[i + 1];
          break;
        case "Multiply":
          total *= equation.numbers[i + 1];
          break;
        case "Concatenate":
          total = parseInt(total.toString() + equation.numbers[i + 1].toString());
          break;
      }
    }
    if (total === equation.testValue) {
      return true;
    }
  }

  return false;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.filter(equationCouldBeTruePartOne).map(equation => equation.testValue).reduce((acc, cur) => acc + cur, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.filter(equationCouldBeTruePartTwo).map(equation => equation.testValue).reduce((acc, cur) => acc + cur, 0);
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
