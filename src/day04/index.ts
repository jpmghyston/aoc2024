import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((row) => row.split(""));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const xmasesInRows = getAllRowsOfArray(input).map(row => row.match(/XMAS/g)?.length || 0).reduce((acc, curr) => acc + curr, 0);
  const xmasesInColumns = getAllColumnsOfArray(input).map(column => column.match(/XMAS/g)?.length || 0).reduce((acc, curr) => acc + curr, 0);
  const xmasesInDiagonals = getAllDiagonalsOfArray(input).map(diagonal => diagonal.match(/XMAS/g)?.length || 0).reduce((acc, curr) => acc + curr, 0);


  return xmasesInRows + xmasesInColumns + xmasesInDiagonals;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const squares = getThreeByThreeSquaresInArray(input);
  const isXmasSquareRegex = /M.S.A.M.S|M.M.A.S.S|S.M.A.S.M|S.S.A.M.M/g;
  const xmasesInSquares = squares.map(square => square.match(isXmasSquareRegex)?.length || 0).reduce((acc, curr) => acc + curr, 0);
  return xmasesInSquares;
};

const getAllDiagonalsOfArray = (array: string[][]) => {
  const diagonals = [];
  const rowCount = array.length;
  const columnCount = array[0].length;

  // Get first direction of diagonals
  for (let i = 0; i < rowCount + columnCount - 1; i++) {
    const diagonal = [];
    for (let j = 0; j < rowCount; j++) {
      const k = i - j;
      if (k >= 0 && k < columnCount) {
        diagonal.push(array[j][k]);
      }
    }
    if (diagonal.length > 0) {
      diagonals.push(diagonal.join(""));
      diagonals.push(diagonal.reverse().join(""));
    }
  }

  // Get the other direction
  for (let i = 0; i < rowCount + columnCount - 1; i++) {
    const diagonal = [];
    for (let j = 0; j < rowCount; j++) {
      const k = i - (rowCount - j);
      if (k >= 0 && k < columnCount) {
        diagonal.push(array[j][k]);
      }
    }
    if (diagonal.length > 0) {
      diagonals.push(diagonal.join(""));
      diagonals.push(diagonal.reverse().join(""));
    }
  }

  return diagonals;
}

const getAllColumnsOfArray = (array: string[][]) => {
  const columns = [];
  for (let i = 0; i < array[0].length; i++) {
    const column = [];
    for (let j = 0; j < array.length; j++) {
      column.push(array[j][i]);
    }
    columns.push(column.join(""));
    columns.push(column.reverse().join(""));
  }
  return columns;
}

const getAllRowsOfArray = (array: string[][]) => {
  const rows = [];
  for (let i = 0; i < array.length; i++) {
    rows.push(array[i].join(""));
    rows.push(array[i].reverse().join(""));
  }
  return rows;
}

const getThreeByThreeSquaresInArray = (array: string[][]) => {
  const squares = [];
  for (let i = 0; i < array.length - 2; i++) {
    for (let j = 0; j < array[0].length - 2; j++) {
      const square = [];
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          square.push(array[i + k][j + l]);
        }
      }
      squares.push(square.join(""));
    }
  }
  return squares;
}



run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
