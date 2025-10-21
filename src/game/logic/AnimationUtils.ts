import type { AnimationPlan, MovingTile, StaticTile } from "./boardLogic";


export const getBoardAnimationHorizontalFlip = (plan: AnimationPlan, Boardlength: number): AnimationPlan => {

    const newPlan: AnimationPlan = {
        movingTiles: [],
        staticTiles: [],
        mergedTiles: []
    };

    const movingTiles = plan.movingTiles;

    for (let index = 0; index < movingTiles.length; index++) {
        const currentMove = movingTiles[index];

        const newMove: MovingTile = {
            from: { row: currentMove.from.row, col: Boardlength - currentMove.from.col - 1 },
            to: { row: currentMove.to.row, col: Boardlength - currentMove.to.col - 1 },
            value: currentMove.value
        };

        newPlan.movingTiles.push(newMove);
    }

    const staticTiles = plan.staticTiles;

    for (let index = 0; index < staticTiles.length; index++) {
        const currentTile = staticTiles[index];

        const newTile: StaticTile = {
            value: currentTile.value,
            position: { row: currentTile.position.row, col: Boardlength - currentTile.position.col - 1 }
        };

        newPlan.staticTiles.push(newTile);
    }

    const mergedTiles = plan.mergedTiles;

    for (let index = 0; index < mergedTiles.length; index++) {
        const currentTile = mergedTiles[index];

        const newTile: StaticTile = {
            value: currentTile.value,
            position: { row: currentTile.position.row, col: Boardlength - currentTile.position.col - 1 }
        };

        newPlan.mergedTiles.push(newTile);
    }
    return newPlan;
}

export const getBoardAnimationClockwiseRotaion = (plan: AnimationPlan, Boardlength: number): AnimationPlan => {

    const newPlan: AnimationPlan = {
        movingTiles: [],
        staticTiles: [],
        mergedTiles: []
    };

    const movingTiles = plan.movingTiles;

    for (let index = 0; index < movingTiles.length; index++) {
        const currentMove = movingTiles[index];

        const newMove: MovingTile = {
            from: { row: currentMove.from.col, col: Boardlength - currentMove.from.row - 1 },
            to: { row: currentMove.to.col, col: Boardlength - currentMove.to.row - 1 },
            value: currentMove.value
        };

        newPlan.movingTiles.push(newMove);
    }

    const staticTiles = plan.staticTiles;

    for (let index = 0; index < staticTiles.length; index++) {
        const currentTile = staticTiles[index];

        const newTile: StaticTile = {
            position: { row: currentTile.position.col, col: Boardlength - currentTile.position.row - 1 },
            value: currentTile.value
        };

        newPlan.staticTiles.push(newTile);
    }

    const mergedTiles = plan.mergedTiles;

    for (let index = 0; index < mergedTiles.length; index++) {
        const currentTile = mergedTiles[index];

        const newTile: StaticTile = {
            position: { row: currentTile.position.col, col: Boardlength - currentTile.position.row - 1 },
            value: currentTile.value
        };

        newPlan.mergedTiles.push(newTile);
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