import { useCallback, useEffect, useState } from "react";
import { addRandomTile, getNewMatrixByDirection, type AnimationPlan, type Direction } from "../../logic/boardLogic";
import { useUndo } from "../../hooks/useUndo";
import { useSettings } from "../settings/SettingsContext";
import { useAddRandomTileManager } from "../../hooks/useAddRandomTileManager";
import { ADD_RANDOM_TILE, ANIMATION_DURATION, GRID_SIZE } from "../../utilities/globals";
import { useKeySwipe } from "../../hooks/useKeySwipe";
import { copyMatrix, createMatrix } from "../../logic/matrixUtils";
import { useRefSwipe } from "../../hooks/useSRefwipe";
import { MAX_TILE_VALUE } from "../tile/Tile";
import { isBoardAscending } from "../../logic/ascendingMatrixUtils";
import pkg from "../../../../package.json"

interface UseGameProps {
    boardData: number[][];
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onRestart: () => void;
    handleUndo: () => void;
    onOpenMenu: () => void;
    handleTileClick: (row: number, column: number) => undefined;
    handleTileDoubleClick: (row: number, column: number) => undefined;
    animationPlan: AnimationPlan | undefined;
    onAnimationPlanEnded: () => undefined;
    gameVersion: string;
    isMenuOpen: boolean;
    onMenuOpenChange: () => void;
    showBoardPerfect: boolean;
}

const isSwipePossible = (boardData: number[][]): boolean => {
    if (!ADD_RANDOM_TILE)
        return true;

    const canSwipe = (direction: Direction): boolean => {
        const { plan } =
            getNewMatrixByDirection(boardData, direction);
        return plan !== undefined;
    }
    return canSwipe("up") || canSwipe("down") || canSwipe("left") || canSwipe("right");
}

const createInitialBoardData = (): number[][] => {
    const grid = createMatrix(GRID_SIZE, 0);
    if (ADD_RANDOM_TILE) addRandomTile(grid, 2);
    return grid;
}

export const useGame = (): UseGameProps => {
    const LOCAL_STORAGE_DATA_KEY = "boardData";
    const [boardData, setBoardData] = useState<number[][]>([[]]);
    const [animationPlan, setAnimationPlan] = useState<AnimationPlan | undefined>(undefined);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { onUndo, updateUndoBoard } = useUndo();
    const { allowTileChange, isPerfectBoard } = useSettings();
    const addRandomTileManager = useAddRandomTileManager();

    useEffect(() => {
        const localData = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
        if (localData) {
            setBoardData(JSON.parse(localData));
        }
        else {
            const initialBoard = createInitialBoardData();
            setBoardData(initialBoard);
            updateUndoBoard(initialBoard);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // #region Swipe handling 

    const handleSwipe = useCallback((direction: Direction): undefined => {
        const { newBoard, plan } = getNewMatrixByDirection(boardData, direction);

        // no plan - the board did not change, nothing to do
        if (!plan) return;

        setAnimationPlan(plan);

        addRandomTileManager.addRandomTile(newBoard, plan);

        updateUndoBoard(boardData);
        setBoardData(newBoard);

        if (!isSwipePossible(newBoard)) {
            setTimeout(() => { alert("Game Over") }, ANIMATION_DURATION);
        }
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(newBoard));

    }, [boardData, addRandomTileManager, updateUndoBoard]);

    const { onTouchStart, onTouchMove } = useRefSwipe(handleSwipe);
    useKeySwipe(handleSwipe);

    const setData = (data: number[][]) => {
        setBoardData(data);
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
    }

    const onAnimationPlanEnded = () : undefined => {
        setAnimationPlan(undefined);
    }

    // #endregion swipe handling

    // #region Tile click

    const handleTileClick = (row: number, column: number): undefined => {

        if (!allowTileChange) return;

        const newBoardData = copyMatrix(boardData);
        const getNextTileValue = (value: number): number => {
            if (value >= MAX_TILE_VALUE) return 0;
            return value == 0 ? 2 : value * 2;
        }
        newBoardData[row][column] = getNextTileValue(newBoardData[row][column]);
        setData(newBoardData);
    }

    const handleTileDoubleClick = (row: number, column: number): undefined => {
        if (!allowTileChange) return;

        const newBoardData = copyMatrix(boardData);
        newBoardData[row][column] = 0;
        setData(newBoardData);
    }

    // #endregion Tile click

    function handleUndo(): void {
        const prevBoard = onUndo();
        setData(prevBoard);
        addRandomTileManager.onUndo();
    }
    const showBoardPerfect = isPerfectBoard && isBoardAscending(boardData);

    const onRestart = () => {
        setData(createInitialBoardData());
        setAnimationPlan(undefined);
        addRandomTileManager.resetUndos();
    }

    const onOpenMenu = () => {
        setIsMenuOpen(value => !value);
    }

    const onMenuOpenChange = () => {
        setIsMenuOpen(value => !value);
    }

    return ({
        boardData, onTouchStart, onTouchMove, onRestart, handleUndo,
        onOpenMenu, handleTileClick, handleTileDoubleClick,
        animationPlan, onAnimationPlanEnded, 
        gameVersion: pkg.version, isMenuOpen,
        onMenuOpenChange, showBoardPerfect
    });


}