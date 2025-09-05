import { GRID_SIZE } from "../utilities/globals";
import { getCol, getRow, mapMatrix, rowFlip } from "./matrixUtils";

export type Direction = "left" | "right" | "up" | "down";
export type Cell = { row: number, col: number };
export type MovingTile = { value: number, from: Cell, to: Cell };
export type StaticTile = { value: number, position: Cell };
export type AnimationPlan = {
    staticTiles: StaticTile[];
    movingTiles: MovingTile[];
}

export const getNewMatrixByDirection = (board: number[][], direction: Direction): {
    newBoard: number[][],
    plan?: AnimationPlan
} => {

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

    let plan: AnimationPlan | undefined = undefined;
    if (wasSwipe) {
        plan = {
            staticTiles: [],
            movingTiles: [
                {
                    value: 2,
                    from: { row: 0, col: 0 },
                    to: { row: 0, col: 0 },
                },
                {
                    value: 2,
                    from: { row: 0, col: 1 },
                    to: { row: 0, col: 0 },
                },
                {
                    value: 4,
                    from: { row: 0, col: 3 },
                    to: { row: 0, col: 1 },
                }
            ]
        }
    }
    else {
       plan = undefined;
    }

    return (
        { newBoard, plan }
    );
}

export const addRandomTile = (matrix: number[][]) => {
    let randomRow = Math.floor(Math.random() * GRID_SIZE);
    let randomCol = Math.floor(Math.random() * GRID_SIZE);


    while (matrix[randomRow][randomCol] !== 0) {
        randomRow = Math.floor(Math.random() * GRID_SIZE);
        randomCol = Math.floor(Math.random() * GRID_SIZE);
    }
    matrix[randomRow][randomCol] = 2;
}

const getBoardAfterLeftwipe = (board: number[][]): number[][] => {

    const newBoard = new Array(board.length);
    for (let index = 0; index < newBoard.length; index++) {

        newBoard[index] = new Array(board[index].length).fill(0);
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

        const row = getRow(board, rowIndex);

        const afterSwipe = getRowAfterLeftSwipe(row);

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

        const row = getRow(board, rowIndex);
        const fliped = rowFlip(row);

        const afterSwipe = getRowAfterLeftSwipe(fliped);
        const flipedSwipe = rowFlip(afterSwipe);

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

        const current = row[index];

        if (current === 0)
            continue;

        if (current === last) {
            q.push(current * 2);
            last = 0;
            continue;
        }

        // Inbar Note:
        // If you want to make it shorter, instead of:
        // last !== 0 && q.push(last);
        // you can write:
        // if (last !== 0) q.push(last);
        // or if (last) 
        if (last !== 0) {
            q.push(last);
        }

        last = current;
    }

    if (last !== 0) q.push(last);

    while (q.length !== row.length) {
        q.push(0);
    }

    return q;
}