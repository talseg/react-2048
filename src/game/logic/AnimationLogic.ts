import { getRowTilesAfterLeftSwipe, type AnimationPlan } from "./boardLogic";
import { clockwiseBoardRotation, getRow, horizontalBoardFlip } from "./matrixUtils";
import { getBoardAnimationCounterClockwiseRotaion, getBoardAnimationHorizontalFlip } from "./AnimationUtils";

export const getBoardAnimationLeftSwipe = (board: number[][]): AnimationPlan => {
    const finalPlan: AnimationPlan = {
        movingTiles: [],
        staticTiles: [],
        mergedTiles: []
    };
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

        const row = getRow(board, rowIndex);
        const rowPlan = getRowTilesAfterLeftSwipe(row).newPlan;
        const rowMovingTiles = rowPlan.movingTiles;

        for (let index = 0; index < rowMovingTiles.length; index++) {
            rowMovingTiles[index].from.row = rowIndex;
            rowMovingTiles[index].to.row = rowIndex;
            finalPlan.movingTiles.push(rowMovingTiles[index]);
        }

        const rowStaticTiles = rowPlan.staticTiles;

        for (let index = 0; index < rowStaticTiles.length; index++) {
            rowStaticTiles[index].position.row = rowIndex;
            finalPlan.staticTiles.push(rowStaticTiles[index]);
        }

        const rowMergedTiles = rowPlan.mergedTiles;

        for (let index = 0; index < rowMergedTiles.length; index++) {
            rowMergedTiles[index].position.row = rowIndex;
            finalPlan.mergedTiles.push(rowMergedTiles[index]);
        }
    }
    return finalPlan;
}


export const getBoardAnimationRightSwipe = (board: number[][]): AnimationPlan => {
    const plan = getBoardAnimationLeftSwipe(horizontalBoardFlip(board));
    return getBoardAnimationHorizontalFlip(plan, board.length);
}


export const getBoardAnimationUpSwipe = (board: number[][]): AnimationPlan => {
    const plan = getBoardAnimationRightSwipe(clockwiseBoardRotation(board));
    return getBoardAnimationCounterClockwiseRotaion(plan, board.length);
}


export const getBoardAnimationDownSwipe = (board: number[][]): AnimationPlan => {
    const plan = getBoardAnimationLeftSwipe(clockwiseBoardRotation(board));
    return getBoardAnimationCounterClockwiseRotaion(plan, board.length);
}