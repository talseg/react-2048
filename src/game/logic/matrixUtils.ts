// import { Board } from "../conponents/board/Board";

export const createMatrix = (gridSize: number, initialValue: number): number[][] =>
    Array.from({ length: gridSize }, () => Array(gridSize).fill(initialValue));

export const mapMatrix = (matrix: number[][]): number[][] =>
    matrix.map(row => [...row]);

export const getRow = (matrix: number[][], rowIndex: number): number[] => {
    const row = [];
    for (let col = 0; col < matrix[rowIndex].length; col++) {
        row.push(matrix[rowIndex][col]);
    }
    return row;
}

export const getCol = (matrix: number[][], colIndex: number): number[] => {

    const row = new Array(matrix.length);

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        row[rowIndex] = matrix[rowIndex][colIndex];
    }
    return row;
}

export const rowFlip = (row: number[]): number[] => {

    const length = row.length;
    const flipedRow = new Array(length).fill(0);

    for (let index = 0; index < length; index++) {

        flipedRow[index] = row[length - index - 1];
    }
    return flipedRow;
}

export const horizontalBoardFlip = (Board: number[][]): number[][] => {


    const length = Board.length;
    const newBoard:number[][] = [];
    
    for (let rowIndex = 0; rowIndex < length; rowIndex++) {
    newBoard[rowIndex]= new Array(length).fill(0);
    
    
    }

    // const newBoard = new Array(length).fill(new Array(length).fill(0));


    //TODO: go through it, and it creates a square not rectangle board

    for (let rowIndex = 0; rowIndex < length; rowIndex++) {

        const flipedRow = rowFlip(getRow(Board, rowIndex));

        // newBoard.push(flipedRow);
        for (let colIndex = 0; colIndex < length; colIndex++) {
            newBoard[rowIndex][colIndex] = flipedRow[colIndex];
        }
    }

    return newBoard;
}

export const printRow = (row: number[], header?: string) => {

    let output = header ? `${header}\n` : "";
    for (let index: number = 0; index < row.length; index++) {
        output += row[index] + " ";
    }
    console.log(output);
}

export const printMatrix = (matrix: number[][], header?: string) => {

    let output = header ? `${header}\n` : "";
    for (let row: number = 0; row < matrix.length; row++) {
        for (let col: number = 0; col < matrix[row].length; col++) {
            output += matrix[row][col] + " ";
        }
        output += "\n";
    }
    console.log(output);
}
