import { appendRows, arrayFlip } from "./matrixUtils";

export const isBoardAscending = (matrix: number[][] | undefined): boolean => {
    if (!matrix || matrix[0].length === 0) return false;
    const roundArray = spreadMatrixToRoundArray(matrix);
    const maxValue = 0;
    return isRowAscending(roundArray, maxValue);
}

const spreadMatrixToRoundArray = (matrix: number[][]): number[] => {
    let outputArray: number[] = [];
    let souldReverse = matrix[0].length % 2 === 0;
    for (let row = 0; row < matrix[0].length; row++) {
        const rowToCheck = souldReverse ? arrayFlip(matrix[row]) : matrix[row];
        outputArray = appendRows(outputArray, rowToCheck);
        souldReverse = !souldReverse;
    }
    return outputArray;
}

const isRowAscending = (row: number[], max: number): boolean => {
    let prevMax = max;
    console.log(row);
    const isPerfect = row.every((num: number) => {
        if (num === 0) return true;                 // ToDo - give this function a non zero array
        const isOK = num >= prevMax;
        prevMax = num;
        return isOK;
    });
    return isPerfect;
}