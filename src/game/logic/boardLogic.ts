import { mapMatrix, printMatrix } from "./matrixUtils";

export type Direction = "left" | "right" | "up" | "down";

export const getNewMatrixByDirection = (matrix: number[][], direction: Direction): number[][] => {

    let newMatrix: number[][] = mapMatrix(matrix);

    switch (direction) {

        case "left":
            handelLeft(newMatrix);
            break;

        case "right":
            handelRight(newMatrix);
            break;

        case "up":
            handelUp(newMatrix);
            break;

        case "down":
            handelDown(newMatrix);
            break;
    }

    return newMatrix;
}

const handelLeft = (matrix: Number[][]) => {
    if (matrix[0][3] === 2) {
        matrix[0][3] = 0;
        matrix[0][0] = 2;
    }
    if (matrix[3][3] === 2) {
        matrix[3][3] = 0;
        matrix[3][0] = 2;
    }
}

const handelRight = (matrix: Number[][]) => {
    if (matrix[0][0] === 2) {
        matrix[0][0] = 0;
        matrix[0][3] = 2;
    }

    if (matrix[3][0] === 2) {
        matrix[3][0] = 0;
        matrix[3][3] = 2;
    }
}
const handelUp = (matrix: Number[][]) => {
    if (matrix[3][0] == 2) {
        matrix[3][0] = 0;
        matrix[0][0] = 2;
    }

    if (matrix[3][3] == 2) {
        matrix[3][3] = 0;
        matrix[0][3] = 2;
    }
}

const handelDown = (matrix: Number[][]) => {
    if (matrix[0][0] == 2) {
        matrix[0][0] = 0;
        matrix[3][0] = 2;
    }

    if (matrix[0][3] == 2) {
        matrix[0][3] = 0;
        matrix[3][3] = 2;
    }
}




