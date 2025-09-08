import type { AnimationPlan, MovingTile } from "./boardLogic";
import { getRow, horizontalBoardFlip } from "./matrixUtils";

const getRowAnimationLeftSwipe = (row: number[]/*, rowIndex?: number*/): AnimationPlan => {

    const currentTiles: MovingTile[] = [];

    const q: number[] = [];
    let lastTile = { value: 0, lastIndex: -1 };

    for (let index = 0; index < row.length; index++) {

        const current = row[index];

        if (current === 0)
            continue;

        if (current === lastTile.value) {
            currentTiles.push(
                {
                    value: current,
                    from: { row: 0, col: index },
                    to: { row: 0, col: q.length }
                },

                {
                    value: current,
                    from: { row: 0, col: lastTile.lastIndex },
                    to: { row: 0, col: q.length }
                }
            );
            q.push(current * 2);
            lastTile = { value: 0, lastIndex: -1 };
            continue;
        }

        // Inbar Note:
        // If you want to make it shorter, instead of:
        // last !== 0 && q.push(last);
        // you can write:
        // if (last !== 0) q.push(last);
        // or if (last)


        if (lastTile.value !== 0) {
            currentTiles.push(
                {
                    value: lastTile.value,
                    from: { row: 0, col: lastTile.lastIndex },
                    to: { row: 0, col: q.length }
                },);
            q.push(lastTile.value);
        }

        lastTile = { value: current, lastIndex: index };

    }

    if (lastTile.value !== 0) {
        currentTiles.push(
            {
                value: lastTile.value,
                from: { row: 0, col: lastTile.lastIndex },
                to: { row: 0, col: q.length }
            },);
        q.push(lastTile.value);
    }

    while (q.length !== row.length) {
        q.push(0);
    }

    return {
        movingTiles: currentTiles,
        staticTiles: []
    };
}


export const getBoardAnimationLeftSwipe = (board: number[][]): AnimationPlan => {
    const finalPlan: AnimationPlan = {
        movingTiles: [],
        staticTiles: []
    };
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

        const row = getRow(board, rowIndex);
        const rowPlan = getRowAnimationLeftSwipe(row);

        // if (!rowPlan) {
        //     return undefined;
        // }//needed?
        const rowMovement = rowPlan.movingTiles;
        for (let index = 0; index < rowMovement.length; index++) {
            rowMovement[index].from.row = rowIndex;
            rowMovement[index].to.row = rowIndex;
            finalPlan.movingTiles.push(rowMovement[index]);
        }

    }
    return finalPlan;
}


export const getBoardAnimationRightSwipe = (board: number[][]): AnimationPlan | undefined => {

    // const finalPlan: AnimationPlan | undefined = {
    //     movingTiles: [],
    //     staticTiles: []
    // };

    const plan = getBoardAnimationLeftSwipe(horizontalBoardFlip(board));

    return getBoardAnimationHorizontalFlip(plan, board.length);
}


export const getBoardAnimationHorizontalFlip = (plan: AnimationPlan, Boardlength: number): AnimationPlan => {

    const newPlan: AnimationPlan = {
        movingTiles: [],
        staticTiles: []
    };

        const currentAnimations= plan.movingTiles;
    
    for(let index=0; index< currentAnimations.length; index++){
        const currentMove= currentAnimations[index];

        const newMove: MovingTile= {
            from: {row: currentMove.from.row, col: Boardlength- currentMove.from.col-1},
            to: {row: currentMove.to.row, col: Boardlength- currentMove.to.col-1},
            value: currentMove.value
        };

        newPlan.movingTiles.push(newMove);
    }

    return newPlan;
}


