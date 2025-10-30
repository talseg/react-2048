import { arrayFlip } from "./matrixUtils";

export const isBoardAscending = (matrix: number[][] | undefined): boolean => {
    if (!matrix || matrix[0].length === 0) return false;
    const roundArray = spreadMatrixToRoundArray(matrix);
    if (!matrix || matrix[0].length === 0) return false;
    return isRowAscending(roundArray, 0);
}

const appendRow = (a: number[], b: number[]): number[] => {
    return [...a, ...b];
}

const spreadMatrixToRoundArray = (matrix: number[][]): number[] => {
    let outputArray: number[] = [];
    let souldReverse = matrix[0].length % 2 === 0;
    for (let row = 0; row < matrix[0].length; row++) {
        const rowToCheck = souldReverse ? arrayFlip(matrix[row]) : matrix[row];
        outputArray = appendRow(outputArray, rowToCheck);
        souldReverse = !souldReverse;
    }
    return outputArray;
}

const isRowAscending = (row: number[], max: number): boolean => {
    let prevMax = max;
    console.log(`checking row: ${row}`);
    const isPerfect = row.every((num: number, i) => {
        if (num === 0)      // Allow empty cell
        {
            return true;
        }
        const isOK = num >= prevMax;
        prevMax = num;
        return isOK;
    });
    return isPerfect;
}