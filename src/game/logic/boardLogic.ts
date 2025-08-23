import { mapMatrix } from "./matrixUtils";

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

    return newBoard;
}

const handelLeft = (board: number[][]) => {

    for(let rowIndex=0; rowIndex<board.length; rowIndex++){

        let newRow= getRowAfterLeftSwipe(board[rowIndex]);
    
        for(let colIndex=0; colIndex<board[rowIndex].length; colIndex++){
            board[rowIndex][colIndex]=newRow[colIndex];
        }
    }    
}

const handelRight = (board: number[][]) => {

    if (board[0][0] !== 0) {

        if (board[0][3] === 0) {
            board[0][3] = board[0][0];
            board[0][0] = 0;
        }

        else if (board[0][0] === board[0][3]) {
            board[0][3] = board[0][0] + board[0][3];
            board[0][0] = 0;
        }

        else {
            board[0][2] = board[0][0];
            board[0][0] = 0;
        }
    }
}

export const getRowAfterLeftSwipe = (row: number[]): number[] => {


    const q = [];
    let last = 0;

    for (let index = 0; index <row.length; index++) {

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


const handelUp = (board: Number[][]) => {
    if (board[3][0] == 2) {
        board[3][0] = 0;
        board[0][0] = 2;
    }

    if (board[3][3] == 2) {
        board[3][3] = 0;
        board[0][3] = 2;
    }
}

const handelDown = (board: Number[][]) => {


    if (board[0][0] == 2) {
        board[0][0] = 0;
        board[3][0] = 2;
    }

    if (board[0][3] == 2) {
        board[0][3] = 0;
        board[3][3] = 2;
    }
}




