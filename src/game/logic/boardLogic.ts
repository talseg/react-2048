import { getCol, getRow, mapMatrix, rowFlip } from "./matrixUtils";

export type Direction = "left" | "right" | "up" | "down";

export const getNewMatrixByDirection = (board: number[][], direction: Direction): number[][] => {

    let newBoard: number[][] = mapMatrix(board);

    switch (direction) {

        case "left":
            newBoard = getBoardAfterLeftwipe(newBoard);
            break;

        case "right":
            newBoard = getBoardAfterRightSwipe(newBoard);
            break;

        case "up":
            newBoard = getBoardAfterUpSwipe(newBoard);
            break;

        case "down":
            newBoard = getBoardAfterDownSwipe(newBoard);
            break;
    }

    let wasSwipe = false;
    for (let row = 0; row < board.length; row++) {

        for (let col = 0; col < board[row].length; col++) {

            if (board[row][col] != newBoard[row][col]) {
                wasSwipe = true;
            }
        }
    }

    return newBoard;
}

export const addRandomTile = (matrix: number[][]) => {
        let randomRow = Math.floor(Math.random() * 4);
        let randomCol = Math.floor(Math.random() * 4);


        while (matrix[randomRow][randomCol] !== 0) {
            randomRow = Math.floor(Math.random() * 4);
            randomCol = Math.floor(Math.random() * 4);
        }
        matrix[randomRow][randomCol] = 2;
        //random
}

const getBoardAfterLeftwipe = (board: number[][]): number[][] => {

    const newBoard = new Array(board.length);
    for (let index = 0; index < newBoard.length; index++) {

        newBoard[index] = new Array(board[index].length).fill(0);
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

        let row = getRow(board, rowIndex);

        let afterSwipe = getRowAfterLeftSwipe(row);

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            newBoard[rowIndex][colIndex] = afterSwipe[colIndex];
        }
    }

    return newBoard;
}

const getBoardAfterRightSwipe = (board: number[][]): number[][] => {

    const newBoard = new Array(board.length);
    for (let index = 0; index < newBoard.length; index++) {

        newBoard[index] = new Array(board[index].length).fill(0);
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

        let row = getRow(board, rowIndex);
        let fliped = rowFlip(row);

        let afterSwipe = getRowAfterLeftSwipe(fliped);
        let flipedSwipe = rowFlip(afterSwipe);

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            newBoard[rowIndex][colIndex] = flipedSwipe[colIndex];
        }
    }

    return newBoard;
}

const getBoardAfterUpSwipe = (board: number[][]): number[][] => {

    const newBoard = new Array(board.length);
    for (let index = 0; index < newBoard.length; index++) {

        newBoard[index] = new Array(board[index].length).fill(0);
    }

    for (let colIndex = 0; colIndex < board.length; colIndex++) {

        const col = getCol(board, colIndex);
        const afterSwipe = getRowAfterLeftSwipe(col);

        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

            newBoard[rowIndex][colIndex] = afterSwipe[rowIndex];
        }
    }

    return newBoard;
}

const getBoardAfterDownSwipe = (board: number[][]): number[][] => {

    const newBoard = new Array(board.length);
    for (let index = 0; index < newBoard.length; index++) {

        newBoard[index] = new Array(board[index].length).fill(0);
    }

    for (let colIndex = 0; colIndex < board.length; colIndex++) {

        const col = getCol(board, colIndex);
        const flip = rowFlip(col);
        const afterSwipe = getRowAfterLeftSwipe(flip);
        const flippedSwipe = rowFlip(afterSwipe);

        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

            newBoard[rowIndex][colIndex] = flippedSwipe[rowIndex];
        }
    }
    return newBoard;
}

export const getRowAfterLeftSwipe = (row: number[]): number[] => {
    const q = [];
    let last = 0;

    for (let index = 0; index < row.length; index++) {

        let current = row[index];

        if (current === 0)
            continue;

        if (current === last) {
            q.push(current * 2);
            last = 0;
            continue;
        }

        if (last !== 0) {
            q.push(last);
            last = current;
        }

        last = current;
    }

    last !== 0 && q.push(last);

    while (q.length !== row.length) {
        q.push(0);
    }

    return q;
}