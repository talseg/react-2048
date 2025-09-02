import { useCallback, useEffect, useState } from "react";
import { Board, GRID_SIZE } from "../board/Board";
import { addRandomTile, getNewMatrixByDirection, type Direction } from "../../logic/boardLogic";
import { styled } from "styled-components";
import FullscreenToggle from "../fullScreenToggle";
import { createMatrix, mapMatrix } from "../../logic/matrixUtils";

const PageWrapper = styled.div`
  min-height: 90vh;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;  
`;

const InfoWrapper = styled.div`
  margin-top: 20px;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
`;

const VERSION = "1.3";

const createInitialBoardData = (): number[][] => {
    const grid = createMatrix(GRID_SIZE, 0);
    grid[0][0] = 2;
    return grid;
}

const LOCAL_STORAGE_DATA_KEY = "boardData";

const getDirection = (eventString: string): Direction => {
    switch (eventString) {
        case 'ArrowLeft': return "left";
        case 'ArrowRight': return "right";
        case 'ArrowUp': return "up";
        case 'ArrowDown': return "down";
    }
    return "left";
}


export const Game: React.FC = () => {

    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [boardData, setBoardData] = useState<number[][]>([[]]);

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

    const handleSwipe = useCallback((direction: Direction): undefined => {
        const { newBoard, wasSwipe } = getNewMatrixByDirection(boardData, direction);

        if (wasSwipe) {
            addRandomTile(newBoard);
        }
        setBoardData(newBoard);
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(newBoard));
    }, [boardData])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            handleSwipe(getDirection(event.key));
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleSwipe]);

    const handleTouchEnd = (e: React.TouchEvent) => {
        const currentX = e.changedTouches[0].screenX;
        const currentY = e.changedTouches[0].screenY;
        const deltaX = currentX - touchStartX;
        const deltaY = currentY - touchStartY;

        const swipeLengthX = Math.abs(deltaX);
        const swipeLengthY = Math.abs(deltaY);

        if (swipeLengthX > swipeLengthY) {
            if (swipeLengthX > 50) {

                if (deltaX < 0) // swipe left
                {
                    handleSwipe("left");
                }
                else if (deltaX > 0) {    // swipe right
                    handleSwipe("right");
                }
            }
        }
        else {
            // There was a Y swipe
            if (swipeLengthY > 50) {

                if (deltaY < 0) {
                    handleSwipe("up");
                }
                else if (deltaY > 0) {
                    handleSwipe("down");
                }
            }
        }
        e.stopPropagation();
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.changedTouches[0].screenX);
        setTouchStartY(e.changedTouches[0].screenY);
        e.stopPropagation();
    }

    const handleTileClick = (row: number, column: number): undefined => {
        const newBoardData = mapMatrix(boardData);
        const tileValue = newBoardData[row][column];
        if (tileValue === 0)
            newBoardData[row][column] = 2;
        else
            newBoardData[row][column] = tileValue * 2;
        setData(newBoardData);

    }

    return (
        <PageWrapper
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>

            <button style={{ background: "blue", color: "white" }}
                onClick={() => {
                    setData(createInitialBoardData());
                }}
            >restart</button>

            <h1 style={{ color: "black" }}>2048</h1>

            <FullscreenToggle />

            <Board boardData={boardData} onTileClick={handleTileClick} />

            <InfoWrapper>
                {`Game by Inbar and Tal Segal version: ${VERSION}`}
            </InfoWrapper>

        </PageWrapper>

    );
}