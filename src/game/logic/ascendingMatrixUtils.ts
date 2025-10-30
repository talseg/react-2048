import { appendRows, arrayFlip } from "./matrixUtils";

/**
 * 
 * @param matrix 
 * @returns true - if the board from bottom right is descending
 * Examples:
 * true 3x3 Array:
 * 2  ←  4  ←  8
 *             ↑
 * 64  → 32 →  16
 * ↑
 * 128 ← 256 ← 512
 *
 * false 3x3 Array:
 * 0 ← 2 ← 0
 *         ↑
 * 0 → 4 → 2
 * ↑
 * 0 ← 8 ← 4
 * 
 * 4x4 legal direction:
 * → → → →
 * ↑
 * ← ← ← ←
 *       ↑
 * → → → →
 * ↑
 * ← ← ← ←
 */
export const isBoardAscending = (matrix: number[][] | undefined): boolean => {
    if (!matrix || matrix[0].length === 0) return false;
    const roundArray = spreadMatrixToRoundArray(matrix);
    const noZeroArray = roundArray.filter(value => value != 0);
    return isRowAscending(noZeroArray);
}

/**
 * @param matrix 
 * @returns fliped array - see explanation above
 */
const spreadMatrixToRoundArray = (matrix: number[][]): number[] => {
    let outputArray: number[] = [];
    let souldFlip = matrix[0].length % 2 === 0;
    for (let row = 0; row < matrix[0].length; row++) {
        const rowToCheck = souldFlip ? arrayFlip(matrix[row]) : matrix[row];
        outputArray = appendRows(outputArray, rowToCheck);
        souldFlip = !souldFlip;
    }
    return outputArray;
}

const isRowAscending = (row: number[]): boolean => {
    let prevMax = -Infinity;
    return row.every((num: number) => {
        if (num < prevMax) return false;
        prevMax = num;
        return true;
    });
}