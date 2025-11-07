import { getFlippedArray } from "./matrixUtils";

/**
 * 
 * @param matrix 
 * @returns true - if values ascend when read snakewise from bottom-right
 * Examples:i
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
    if (!matrix || matrix.length <= 1) return true;
    const roundArray = flattenMatrixZigzag (matrix);
    const noZeroArray = roundArray.filter(value => value !== 0);
    return isRowAscending(noZeroArray);
}

const flattenMatrixZigzag  = (matrix: number[][]): number[] => {
    const result: number[] = [];
    let shouldFlip = matrix.length % 2 === 0;
    for (let row = 0; row < matrix.length; row++) {
        const actualRow = shouldFlip ? getFlippedArray(matrix[row]) : matrix[row];
        result.push(...actualRow);
        shouldFlip = !shouldFlip;
    }
    return result;
}

const isRowAscending = (row: number[]): boolean => {
    let prevMax = -Infinity;
    return row.every((num: number) => {
        if (num < prevMax) return false;
        prevMax = num;
        return true;
    });
}