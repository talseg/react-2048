import type { AnimationPlan, MovingTile } from "./boardLogic";


export const getBoardAnimationHorizontalFlip = (plan: AnimationPlan, Boardlength: number): AnimationPlan => {

    const newPlan: AnimationPlan = {
        movingTiles: [],
        staticTiles: []
    };

    const currentAnimations = plan.movingTiles;

    for (let index = 0; index < currentAnimations.length; index++) {
        const currentMove = currentAnimations[index];

        const newMove: MovingTile = {
            from: { row: currentMove.from.row, col: Boardlength - currentMove.from.col - 1 },
            to: { row: currentMove.to.row, col: Boardlength - currentMove.to.col - 1 },
            value: currentMove.value
        };

        newPlan.movingTiles.push(newMove);
    }

    return newPlan;
}

export const getBoardAnimationClockwiseRotaion = (plan: AnimationPlan, Boardlength: number): AnimationPlan => {

    const newPlan: AnimationPlan = {
        movingTiles: [],
        staticTiles: []
    };

    const currentAnimations = plan.movingTiles;

    for (let index = 0; index < currentAnimations.length; index++) {
        const currentMove = currentAnimations[index];

        const newMove: MovingTile = {
            from: { row: currentMove.from.col, col: Boardlength - currentMove.from.row - 1 },
            to: { row: currentMove.to.col, col: Boardlength - currentMove.to.row - 1 },
            value: currentMove.value
        };

        newPlan.movingTiles.push(newMove);
    }

    return newPlan;
}

export const getBoardAnimationCounterClockwiseRotaion = (plan: AnimationPlan, Boardlength: number): AnimationPlan => {

    let newPlan = plan;
    for (let i = 0; i < 3; i++) {
        newPlan = getBoardAnimationClockwiseRotaion(newPlan, Boardlength);

    }

    return newPlan;
}