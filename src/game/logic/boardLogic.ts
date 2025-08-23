import { getCol, getRow, mapMatrix, rowFlip } from "./matrixUtils";

export type Direction = "left" | "right" | "up" | "down";

export const getNewMatrixByDirection = (board: number[][], direction: Direction): number[][] => {

    let newBoard: number[][] = mapMatrix(board);

    switch (direction) {

        case "left":
            handelLeft(newBoard);
            break;

        case "right":
            handelRight(newBoard);
            break;

        case "up":
            handelUp(newBoard);
            break;

        case "down":
            handelDown(newBoard);
            break;
    }


    let randomRow = Math.floor(Math.random() * 4);
    let randomCol = Math.floor(Math.random() * 4);


    while (newBoard[randomRow][randomCol] !== 0) {
        randomRow = Math.floor(Math.random() * 4);
        randomCol = Math.floor(Math.random() * 4);
    }
    newBoard[randomRow][randomCol]=2;

    //random

    return newBoard;
}

const handelLeft = (board: number[][]) => {

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

        let newRow = getRowAfterLeftSwipe(board[rowIndex]);

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            board[rowIndex][colIndex] = newRow[colIndex];
        }
    }
}

const handelRight = (board: number[][]) => {

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

        let row = getRow(board, rowIndex);
        let fliped = rowFlip(row);

        let afterSwipe = getRowAfterLeftSwipe(fliped);
        let flipedSwipe = rowFlip(afterSwipe);

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            board[rowIndex][colIndex] = flipedSwipe[colIndex];
        }
    }
}




const handelUp = (board: number[][]) => {

    for (let colIndex = 0; colIndex < board.length; colIndex++) {

        const col = getCol(board, colIndex);
        const afterSwipe = getRowAfterLeftSwipe(col);

        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

            board[rowIndex][colIndex] = afterSwipe[rowIndex];
        }
    }


    //TODO LOOK AT IT
    //LENGTH
}

const handelDown = (board: number[][]) => {


    for (let colIndex = 0; colIndex < board.length; colIndex++) {

        const col = getCol(board, colIndex);
        const flip = rowFlip(col);
        const afterSwipe = getRowAfterLeftSwipe(flip);
        const flippedSwipe = rowFlip(afterSwipe);

        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

            board[rowIndex][colIndex] = flippedSwipe[rowIndex];
        }
    }
    //TODO LOOK AT IT
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