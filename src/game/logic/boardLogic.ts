import { getCol, getRow, mapMatrix, printMatrix, rowFlip } from "./matrixUtils";

export type Direction = "left" | "right" | "up" | "down";

export const getNewMatrixByDirection = (board: number[][], direction: Direction): number[][] => {

    let newBoard: number[][] = mapMatrix(board);

    switch (direction) {

        case "left":
            //handelLeft(newBoard);
            newBoard = getBoardAfterLeftwipe(newBoard);
            break;

        case "right":
            // handelRight(newBoard);
            newBoard = getBoardAfterRightSwipe(newBoard);
            break;

        case "up":
            // handelUp(newBoard);
            newBoard = getBoardAfterUpSwipe(newBoard);
            break;

        case "down":
            //handelDown(newBoard);
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

    if (wasSwipe) {
        let randomRow = Math.floor(Math.random() * 4);
        let randomCol = Math.floor(Math.random() * 4);


        while (newBoard[randomRow][randomCol] !== 0) {
            randomRow = Math.floor(Math.random() * 4);
            randomCol = Math.floor(Math.random() * 4);
        }
        newBoard[randomRow][randomCol] = 2;
        //random
    }


    return newBoard;
}

const handelLeft = (board: number[][]) => {

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        let oldRow = getRow(board, rowIndex);
        let newRow = getRowAfterLeftSwipe(oldRow);
        // let newRow = getRowAfterLeftSwipe(board[rowIndex]);

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

const getBoardAfterLeftwipe = (board: number[][]): number[][] => {

    const newBoard = new Array(board.length);
    for (let index = 0; index < newBoard.length; index++) {

        newBoard[index] = new Array(board[index].length).fill(0);
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

        let row = getRow(board, rowIndex);
        // let fliped = rowFlip(row);

        let afterSwipe = getRowAfterLeftSwipe(row);
        //let flipedSwipe = rowFlip(afterSwipe);

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
    //TODO LOOK AT IT

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