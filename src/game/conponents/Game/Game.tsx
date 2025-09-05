import { useCallback, useEffect, useState } from "react";
import { Board } from "../board/Board";
import {
    addRandomTile,
    getNewMatrixByDirection, type AnimationPlan, type Direction
} from "../../logic/boardLogic";
import { styled } from "styled-components";
import FullscreenToggle from "../fullScreenToggle";
import { createMatrix, mapMatrix } from "../../logic/matrixUtils";
import { useSwipe } from "../../hooks/useSwipe";
import { useKeySwipe } from "../../hooks/useKeySwipe";
import { GRID_SIZE } from "../../../utilities/globals";

const PageWrapper = styled.div`
  min-height: 90vh;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-color: #d9d9d9;
`;

const InfoWrapper = styled.div`
  margin-top: 20px;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
`;

const createInitialBoardData = (): number[][] => {
    const grid = createMatrix(GRID_SIZE, 0);
    grid[0][0] = 2;
    grid[0][1] = 2;
    grid[0][3] = 4;
    return grid;
}

const LOCAL_STORAGE_DATA_KEY = "boardData";

export const Game: React.FC = () => {

    const [boardData, setBoardData] = useState<number[][]>([[]]);
    const [animationPlan, setAnimationPlan] = useState<AnimationPlan | undefined>(undefined); 

    const handleSwipe = useCallback((direction: Direction): undefined => {
        const { newBoard, plan } = getNewMatrixByDirection(boardData, direction);
        if (plan) setAnimationPlan(plan);

        setBoardData(newBoard);
        addRandomTile(newBoard);
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(newBoard));
    }, [boardData]);

    const { onTouchStart, onTouchEnd } = useSwipe(handleSwipe);
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
            setBoardData(createInitialBoardData());
        }
    }, [])


    const handleTileClick = (row: number, column: number): undefined => {
        const newBoardData = mapMatrix(boardData);
        const getNextTileValue = (value: number): number => {
            return value == 0 ? 2 : value * 2;
        }
        newBoardData[row][column] = getNextTileValue(newBoardData[row][column]);
        setData(newBoardData);
    }

    const handleTileDoubleClick = (row: number, column: number): undefined => {
        const newBoardData = mapMatrix(boardData);
        newBoardData[row][column] = 0;
        setData(newBoardData);
    }

    return (
        <PageWrapper
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}>

            <button style={{ background: "blue", color: "white" }}
                onClick={() => {
                    setData(createInitialBoardData());
                    setAnimationPlan(undefined);
                }}
            >Restart</button>

            <h1 style={{ color: "black" }}>2048</h1>

            <FullscreenToggle />

            <Board boardData={boardData}
                onTileClick={handleTileClick}
                onTileDoubleClick={handleTileDoubleClick}
                onAnimationPlanEnded={() => { setAnimationPlan(undefined) }} 
                animationPlan={animationPlan}
            />

            <InfoWrapper>
                {`Game by Inbar and Tal Segal version: 1.6`}
            </InfoWrapper>

        </PageWrapper>

    );
}