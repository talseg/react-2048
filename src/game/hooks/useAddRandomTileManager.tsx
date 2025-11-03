import { useCallback, useState } from "react";
import { getNextTilePosition, getRandomTilePosition, type AnimationPlan, type Cell, type MovingTile, type StaticTile } from "../logic/boardLogic";
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
        const newTileValue = (allow4 && (Math.random() < SPAWN_4_PROBABILITY)) ? 4 : 2;

        // We want to help the user and not force him to undo until he gets a different next position
        // So in the first undo - choose the next cell
        const poppingTilePosition: Cell =
            numConsecutiveUndos === 1 && prevNewCell ?  
                getNextTilePosition(board, prevNewCell) :
                getRandomTilePosition(board);

        setNumConsecutiveUndos(0);
        const poppingTile: StaticTile = {
            value: newTileValue,
            position: poppingTilePosition
        }
        setPrevNewCell(poppingTilePosition);
        if (plan) plan.poppedTile = poppingTile;
        board[poppingTilePosition.row][poppingTilePosition.col] = newTileValue;
    }, [allow4, numConsecutiveUndos, prevNewCell]);

    const onUndo = (): void => setNumConsecutiveUndos((value) => value + 1);
    const resetUndos = (): void => setNumConsecutiveUndos(0);

    return (
        { addRandomTile, onUndo, resetUndos }
    );
};