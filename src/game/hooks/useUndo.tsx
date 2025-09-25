import { useCallback, useState } from "react";
import { GRID_SIZE } from "../utilities/globals";
import { createMatrix } from "../logic/matrixUtils";

export interface UseUndoProps {
    onUndo: () => number[][];
    updateUndoBoard: (board: number[][]) => void;
}
 
// ToDo - limit the number of undo's
//      - Clear the undo stack
//      - Create a Stack data structure to make the code more readable
export const useUndo = (): UseUndoProps => {

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
        const newBoardStack = [...undoStack];
        newBoardStack.push(board);
        setUndoStack(newBoardStack);
    };

    return { onUndo, updateUndoBoard };
};