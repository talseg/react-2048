import { mapMatrix, printMatrix } from "./matrixUtils";

export type Direction = "left" | "right" | "up" | "down";

export const getNewMatrixByDirection = (matrix: number[][], direction: Direction ): number[][] => {

    let newMatrix: number[][] = mapMatrix(matrix);

    switch (direction) {

        case "left" :
        if (newMatrix[0][3] === 2) {
            newMatrix[0][3] = 0;
            newMatrix[0][0] = 2;
        } 
        if (matrix[3][3] === 2) {
            newMatrix[3][3] = 0;
            newMatrix[3][0] = 2;
        }
        break;

        case "right" :
        if (matrix[0][0] === 2) {
            newMatrix[0][0] = 0;
            newMatrix[0][3] = 2;
        }

        if (matrix[3][0] === 2) {
            newMatrix[3][0] = 0;
            newMatrix[3][3] = 2;
        }
        break;

        case "up":
            if(matrix[3][0]==2){
                newMatrix[3][0] = 0;
                newMatrix[0][0] = 2;
            }

            if(matrix[3][3]==2){
                newMatrix[3][3] = 0;
                newMatrix[0][3] = 2;
            }
        break;
        
        case "down":

        if(matrix[0][0]==2){
            newMatrix[0][0] = 0;
            newMatrix[3][0] = 2;
        }
        
        if(matrix[0][3]==2){
            newMatrix[0][3] = 0;
            newMatrix[3][3] = 2;
        } 
        break;
    }
    
    return newMatrix;
}

