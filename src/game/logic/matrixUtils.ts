export const createMatrix = (gridSize: number, initialValue: number): number[][] =>
    Array.from({ length: gridSize }, () => Array(gridSize).fill(initialValue));

export const copyMatrix = (matrix: number[][]): number[][] =>
    matrix.map(row => [...row]);


export const getRow = (matrix: number[][], rowIndex: number): number[] => [...matrix[rowIndex]];

export const getCol = (matrix: number[][], colIndex: number): number[] =>
  matrix.map(row => row[colIndex]);

export const arrayFlip = (row: number[]): number[] => [...row].reverse();

export const clockwiseBoardRotation = (board: number[][]): number[][] => {
  const size = board.length;
  const newBoard = Array.from({ length: size }, () => Array(size).fill(0));

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      newBoard[col][size - row - 1] = board[row][col];
    }
  }

  return newBoard;
};

export const horizontalBoardFlip = (board: number[][]): number[][] =>
  board.map(row => [...row].reverse());

export const getRowString = (row: number[], header?: string) => {
  const prefix = header ? `${header}\n` : "";
  return prefix + row.join(" ");
};

export const printRow = (row: number[], header?: string) => console.log(getRowString(row, header));

export const getMatrixString = (matrix: number[][], header?: string) => {
    const prefix = header ? `${header}\n` : "";
    const output = matrix.map((row) => getRowString(row)).join("\n");
    return prefix + output;
}

export const printMatrix = (matrix: number[][], header?: string) => console.log(getMatrixString(matrix, header));

export const getNumZeros = (matrix: number[][]) => {

    let count = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] === 0) {
                count++;
            }
        }
    }
    return count;
}

export const appendRows = (a: number[], b: number[]): number[] => [...a, ...b];