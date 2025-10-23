import { getBoardAnimationDownSwipe, getBoardAnimationLeftSwipe, getBoardAnimationRightSwipe, getBoardAnimationUpSwipe } from "./AnimationLogic";
import { getCol, getRow, copyMatrix, arrayFlip } from "./matrixUtils";
export type Direction = "left" | "right" | "up" | "down";
export type TileType = "static" | "moving" | "merging" | "poping";
export type Cell = { row: number, col: number };
export type MovingTile = { value: number, from: Cell, to: Cell, tileType?: TileType };
export type StaticTile = { value: number, position: Cell };

export type AnimationPlan = {
    staticTiles: StaticTile[];
    movingTiles: MovingTile[];
    mergedTiles: StaticTile[];
}

export const getNewMatrixByDirection = (board: number[][], direction: Direction): {
    newBoard: number[][],
    plan?: AnimationPlan
} => {

    let newBoard: number[][] = copyMatrix(board);

    switch (direction) {

        case "left":
            newBoard = getBoardAfterLeftwipe(newBoard);
            break;

        case "right":
            newBoard = getBoardAfterRightSwipe(newBoard);
            break;

        case "up":
            newBoard = getBoardAfterUpSwipe(newBoard);
            break;

        case "down":
            newBoard = getBoardAfterDownSwipe(newBoard);
            break;
    }

    let wasSwipe = false;
    for (let row = 0; row < board.length; row++) {

        for (let col = 0; col < board[row].length; col++) {

            if (board[row][col] != newBoard[row][col]) {
                wasSwipe = true;
            }
        }
    }

    let plan: AnimationPlan | undefined = undefined;
    if (wasSwipe) {

        if (direction === "left") {
            plan = getBoardAnimationLeftSwipe(board);
        }

        else if (direction === "right") {
            plan = getBoardAnimationRightSwipe(board);
        }

        else if (direction === "up") {
            plan = getBoardAnimationUpSwipe(board);
        }

        else if (direction === "down") {
            plan = getBoardAnimationDownSwipe(board);
        }
    }

    return (
        { newBoard, plan }
    );
}

export const addRandomTile = (matrix: number[][], tileValue: number) => {
    const cell = getRandomTilePosition(matrix, undefined);
    matrix[cell.row][cell.col] = tileValue;
}

const getTiles = (matrix: number[][]): StaticTile[] =>
    matrix.flatMap((row, rowIndex) =>
        row.map((value, colIndex) => ({
            value,
            position: { row: rowIndex, col: colIndex },
        }))
    );

const getEmptyTiles = (matrix: number[][]): StaticTile[] =>
    getTiles(matrix).filter((cell) => cell.value === 0)

export const getRandomTilePosition = (matrix: number[][], lastUndoCell: Cell | undefined): Cell => {
    const emptyTiles = getEmptyTiles(matrix);
    const numEmptyTiles = emptyTiles.length;
    if (numEmptyTiles === 0) {
        // ToDo handle exceptions
        throw new Error(`addRandomTile requested to add random tile to empty board:\n${JSON.stringify(matrix)}`)
    }

    //console.log(`getRandomTilePosition lastUndoCell:`, lastUndoCell)

    // If this was right after undo - help by choosing the next Cell instead of a random one

    if (lastUndoCell) {
        console.log("using smart undo");
        const lastTile = emptyTiles.find((tile: StaticTile) => 
        {
            return (tile.position.row === lastUndoCell.row) && (tile.position.col === lastUndoCell.col);
        });

        //console.log("getRandomTilePosition emptyTiles: ", emptyTiles);
        //console.log("getRandomTilePosition lastTile: ", lastTile);
        if (lastTile) {
            const lastTileIndex = emptyTiles.indexOf(lastTile);
            //console.log("getRandomTilePosition lastTileIndex: ", lastTileIndex);
            let nextTileIndex: number = -1;
            if (lastTileIndex !== -1) {
                if (lastTileIndex === emptyTiles.length - 1)
                    nextTileIndex = 0;
                else
                    nextTileIndex = lastTileIndex+1;
                //console.log("getRandomTilePosition nextTileIndex: ", nextTileIndex);
                const nextCell =  emptyTiles[nextTileIndex];
                //console.log("getRandomTilePosition nextCell: ", nextCell);
                const nextPosition = nextCell.position;
                //console.log("getRandomTilePosition nextPosition: ", nextPosition);
                return nextPosition;
            }  
        }
    }

    console.log("using random undo");
    const itemIndex = Math.floor(Math.random() * numEmptyTiles);
    //console.log(`no undo - returning Cell: row:${emptyTiles[itemIndex].position.row} col:${emptyTiles[itemIndex].position.col}`);
    return emptyTiles[itemIndex].position;
}

const getBoardAfterLeftwipe = (board: number[][]): number[][] => {

    const newBoard = new Array(board.length);
    for (let index = 0; index < newBoard.length; index++) {

        newBoard[index] = new Array(board[index].length).fill(0);
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

        const row = getRow(board, rowIndex);

        const afterSwipe = getRowAfterLeftSwipe(row);

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            newBoard[rowIndex][colIndex] = afterSwipe[colIndex];
        }
    }

    return newBoard;
}

const getBoardAfterRightSwipe = (board: number[][]): number[][] => {

    const newBoard = new Array(board.length);
    for (let index = 0; index < newBoard.length; index++) {

        newBoard[index] = new Array(board[index].length).fill(0);
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

        const row = getRow(board, rowIndex);
        const fliped = arrayFlip(row);

        const afterSwipe = getRowAfterLeftSwipe(fliped);
        const flipedSwipe = arrayFlip(afterSwipe);

        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            newBoard[rowIndex][colIndex] = flipedSwipe[colIndex];
        }
    }

    return newBoard;
}

const getBoardAfterUpSwipe = (board: number[][]): number[][] => {

    const newBoard = new Array(board.length);
    for (let index = 0; index < newBoard.length; index++) {

        newBoard[index] = new Array(board[index].length).fill(0);
    }

    for (let colIndex = 0; colIndex < board.length; colIndex++) {

        const col = getCol(board, colIndex);
        const afterSwipe = getRowAfterLeftSwipe(col);

        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

            newBoard[rowIndex][colIndex] = afterSwipe[rowIndex];
        }
    }

    return newBoard;
}

const getBoardAfterDownSwipe = (board: number[][]): number[][] => {

    const newBoard = new Array(board.length);
    for (let index = 0; index < newBoard.length; index++) {

        newBoard[index] = new Array(board[index].length).fill(0);
    }

    for (let colIndex = 0; colIndex < board.length; colIndex++) {

        const col = getCol(board, colIndex);
        const flip = arrayFlip(col);
        const afterSwipe = getRowAfterLeftSwipe(flip);
        const flippedSwipe = arrayFlip(afterSwipe);

        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {

            newBoard[rowIndex][colIndex] = flippedSwipe[rowIndex];
        }
    }
    return newBoard;
}

export const getRowAfterLeftSwipe = (row: number[]): number[] => {

    return getRowTilesAfterLeftSwipe(row).newrow;
}


export const getRowTilesAfterLeftSwipe = (row: number[]): { newrow: number[], newPlan: AnimationPlan } => {
    const newPlan: AnimationPlan = {
        movingTiles: [],
        staticTiles: [],
        mergedTiles: []
    };

    const q: number[] = [];
    let lastTile = { value: 0, lastIndex: -1 };

    for (let index = 0; index < row.length; index++) {

        const currentValue = row[index];

        if (currentValue === 0)
            continue;

        if (currentValue === lastTile.value) {

            const movingtile1 = {
                value: currentValue,
                from: { row: 0, col: index },
                to: { row: 0, col: q.length }
            };
            const movingtile2 = {
                value: currentValue,
                from: { row: 0, col: lastTile.lastIndex },
                to: { row: 0, col: q.length }
            };
            newPlan.movingTiles.push(movingtile1, movingtile2);

            const mergeTile = {
                value: currentValue * 2,
                position: { row: 0, col: q.length }
            };
            newPlan.mergedTiles.push(mergeTile);

            q.push(currentValue * 2);
            lastTile = { value: 0, lastIndex: -1 };
            continue;
        }

        if (lastTile.value !== 0) {
            newPlan.movingTiles.push(
                {
                    value: lastTile.value,
                    from: { row: 0, col: lastTile.lastIndex },
                    to: { row: 0, col: q.length }
                },);
            q.push(lastTile.value);
        }

        lastTile = { value: currentValue, lastIndex: index };

    }

    if (lastTile.value !== 0) {
        newPlan.movingTiles.push(
            {
                value: lastTile.value,
                from: { row: 0, col: lastTile.lastIndex },
                to: { row: 0, col: q.length }
            },);
        q.push(lastTile.value);
    }

    for (let i = 0; i < newPlan.movingTiles.length; i++) {

        const currentTile = newPlan.movingTiles[i];

        if (currentTile.from.col == currentTile.to.col) {
            newPlan.movingTiles.splice(i, 1);
            newPlan.staticTiles.push({
                value: currentTile.value,
                position: { row: 0, col: currentTile.from.col }
            });
        }
    }

    while (q.length !== row.length) {
        q.push(0);
    }

    return {
        newrow: q,
        newPlan: newPlan
    };
}