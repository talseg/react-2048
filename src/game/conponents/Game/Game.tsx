import { useCallback, useEffect, useState } from "react";
import { Board } from "../board/Board";
import {
    addRandomTile,
    getNewMatrixByDirection,
    type AnimationPlan,
    type Direction
} from "../../logic/boardLogic";
import { styled } from "styled-components";
import FullscreenToggleButton from "../FullScreenToggleButton";
import { createMatrix, copyMatrix } from "../../logic/matrixUtils";
import { useKeySwipe } from "../../hooks/useKeySwipe";
import { GRID_SIZE } from "../../utilities/globals";
import { useRefSwipe } from "../../hooks/useSRefwipe";
import pkg from "../../../../package.json"
import { SmallButton } from "../../elements/SmallButton";
import { IconRestart, IconUndo } from "../../../assets/Icons";
import { MAX_TILE_VALUE } from "../tile/Tile";
import { useUndo } from "../../hooks/useUndo";
import { isOnIOS } from "../../utilities/utilities";
import { SettingsMenu } from "../settings/SettingsMenu";
import HamburgerIcon from '../../../assets//hamburger.svg?react';
import { useAddRandomTileManager } from "../../hooks/useAddRandomTileManager";
import {  useSettings } from "../settings/SettingsContext";
const VERSION = pkg.version;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: #d9d9d9;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    touch-action: none;
    gap: 20px;
`;

const InfoWrapper = styled.div`
    margin-top: 20px;
    color: #000000;
    font-size: 20px;
    font-weight: bold;
    max-width: 260px;
`;

// ToDo - create a checkbox styled component
export const CheckboxStyled = styled.input`
    width: 38px;
    height: 38px;
    accent-color: #636363;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    align-self: start;
    gap: 20px;
    width: 93vw;
    margin:14px 0px 0px 14px;
`;

const createInitialBoardData = (): number[][] => {
    const grid = createMatrix(GRID_SIZE, 0);
    if (ADD_RANDOM_TILE) addRandomTile(grid, 2);
    return grid;
}

const LOCAL_STORAGE_DATA_KEY = "boardData";
export const ADD_RANDOM_TILE = true; // For debug


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

const HeaderStyled = styled.div`
    color: black;
    font-size: 36px;
    margin-bottom: 10px;
    font-weight: 500;
`;

const HanburgerButtonStyled = styled(SmallButton)`
  margin-left: auto;  
`;

export const Game: React.FC = () => {

    const [boardData, setBoardData] = useState<number[][]>([[]]);
    const [animationPlan, setAnimationPlan] = useState<AnimationPlan | undefined>(undefined);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { onUndo, updateUndoBoard } = useUndo();
    const { allowTileChange } = useSettings();
    const addRandomTileManager = useAddRandomTileManager();

    const handleSwipe = useCallback((direction: Direction): undefined => {
        const { newBoard, plan } = getNewMatrixByDirection(boardData, direction);
        
        // no plan - the board did not change, nothing to do
        if (!plan) return;

        setAnimationPlan(plan);

        addRandomTileManager.addRandomTile(newBoard, plan);

        updateUndoBoard(boardData);
        setBoardData(newBoard);

        if (!isSwipePossible(newBoard)) {
            setTimeout(() => { alert("Game Over") }, 100);
        }
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(newBoard));

    }, [boardData, addRandomTileManager, updateUndoBoard]);

    const { onTouchStart, onTouchMove } = useRefSwipe(handleSwipe);
    useKeySwipe(handleSwipe);

    const setData = (data: number[][]) => {
        setBoardData(data);
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
    }

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
    }, [updateUndoBoard])


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

    function handleUndo(): void {
        const prevBoard = onUndo();
        setData(prevBoard);
        addRandomTileManager.onUndo();
    }

    return (
        <PageWrapper
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}>

            <ButtonsWrapper>

                {!isOnIOS() && <FullscreenToggleButton />}

                <SmallButton onClick={() => {
                    setData(createInitialBoardData());
                    setAnimationPlan(undefined);
                    addRandomTileManager.resetUndos();
                }}>
                    <IconRestart />
                </SmallButton>

                <SmallButton onClick={handleUndo}>
                    <IconUndo />
                </SmallButton>

                <HanburgerButtonStyled onClick={() => setIsMenuOpen(true)}>
                    <HamburgerIcon />
                </HanburgerButtonStyled>

            </ButtonsWrapper>

            <HeaderStyled>2048 to 65k</HeaderStyled>

            <Board boardData={boardData}
                onTileClick={handleTileClick}
                onTileDoubleClick={handleTileDoubleClick}
                onAnimationPlanEnded={() => { setAnimationPlan(undefined) }}
                animationPlan={animationPlan}
            />

            <InfoWrapper>
                {`Game by Inbar and Tal Segal version: ${VERSION}`}
            </InfoWrapper>

            <SettingsMenu
                isOpen={isMenuOpen}
                onIsOpenChanged={() => setIsMenuOpen(value => !value)}
            ></SettingsMenu>

        </PageWrapper>
    );
}

import React from "react";

