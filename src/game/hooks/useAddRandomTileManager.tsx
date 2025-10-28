import { useCallback, useState } from "react";
import { getNextTilePosition, getRandomTilePosition, type AnimationPlan, type Cell, type MovingTile } from "../logic/boardLogic";
import { ADD_RANDOM_TILE } from "../conponents/Game/Game";
import { getNumZeros } from "../logic/matrixUtils";
import { SPAWN_4_PROBABILITY } from "../utilities/globals";
import { useSettings } from "../conponents/settings/SettingsContext";

export const useAddRandomTileManager = (): {
    addRandomTile: (board: number[][], plan: AnimationPlan) => void,
    onUndo: () => void,
    resetUndos: () => void,
} => {

    const { allow4 } = useSettings();
    const [prevNewCell, setPrevNewCell] = useState<Cell | undefined>(undefined);
    const [numConsecutiveUndos, setNumConsecutiveUndos] = useState(0);

    const addRandomTile = useCallback((
        board: number[][],
        plan: AnimationPlan | undefined
    ): undefined => {
        if (!ADD_RANDOM_TILE || getNumZeros(board) === 0)
            return;
        let randomTilePosition: Cell | undefined;
        const newTileValue = (allow4 && (Math.random() < SPAWN_4_PROBABILITY)) ? 4 : 2;
        if (numConsecutiveUndos === 1 && prevNewCell) {
            randomTilePosition = getNextTilePosition(board, prevNewCell);
        }
        else {
            randomTilePosition = getRandomTilePosition(board);
        }
        setNumConsecutiveUndos(0);
        const newRandomTile: MovingTile = {
            value: newTileValue,
            from: randomTilePosition,
            to: randomTilePosition,
            tileType: "poping"
        }
        setPrevNewCell(randomTilePosition);
        plan?.movingTiles.push(newRandomTile);
        board[randomTilePosition.row][randomTilePosition.col] = newTileValue;
    }, [allow4, numConsecutiveUndos, prevNewCell]);

    const onUndo = (): void => setNumConsecutiveUndos((value) => value + 1);
    const resetUndos = (): void => setNumConsecutiveUndos(0);

    return (
        { addRandomTile, onUndo, resetUndos }
    );
};