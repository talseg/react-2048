import { useCallback, useState } from "react";
import { GRID_SIZE } from "../utilities/globals";
import { createMatrix } from "../logic/matrixUtils";

export interface UseUndoProps {
    onUndo: () => number[][];
    updateUndoBoard: (board: number[][]) => void;
}

// onUndo - return the board after an undo
export const useUndo = (): UseUndoProps => {
    // Stack of boards (list of 2D arrays)
    const [undoStack, setUndoStack] = useState<number[][][]>([
        createMatrix(GRID_SIZE, 0)
    ]);

    const onUndo = useCallback((): number[][] => {
        if (undoStack.length <= 1) {
            return undoStack[0];
        }
        const newStack = [...undoStack];
        const topItem = newStack.pop()!;
        setUndoStack(newStack);
        return topItem;
    }, [undoStack]);

    const updateUndoBoard = (board: number[][]): void => {
        const newBoardStack = [...undoStack];  // clone first
        newBoardStack.push(board);             // now it's safe to mutate
        setUndoStack(newBoardStack);
    };

    return { onUndo, updateUndoBoard };
};