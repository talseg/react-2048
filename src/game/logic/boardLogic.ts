import { mapMatrix, printMatrix } from "./matrixUtils";

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
    if (board[0][3] === 2) {
        board[0][3] = 0;
        board[0][0] = 2;
    }
    if (board[3][3] === 2) {
        board[3][3] = 0;
        board[3][0] = 2;
    }
}

const handelRight = (board: number[][]) => {
 
        if(board[0][0]!==0){

            if(board[0][3]===0){
                board[0][3] = board[0][0];
                board[0][0] = 0;
            }
            
            else if(board[0][0] === board[0][3]){
            board[0][3] = board[0][0] + board[0][3];
            board[0][0] = 0;
            }

            else{
                board[0][2] = board[0][0];
                board[0][0] = 0;
            }
        }
        
        //TODO let dad look at it

        // else if (board[0][0] === board[0][3]) {
        //     board[0][3] = board[0][0] + board[0][3];
        //     board[0][0] = 0;
        // }
        // if (board[0][0] === board[0][3]) {
        //     board[0][3] = board[0][0] + board[0][3];
        //     board[0][0] = 0;
        // }

        // else if(board[0][3]!==0){
        //     board[0][2] = board[0][0];
        //     board[0][0] = 0;
        // }

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




