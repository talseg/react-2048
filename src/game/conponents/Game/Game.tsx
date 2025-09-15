import { useCallback, useEffect, useState } from "react";
import { Board } from "../board/Board";
import {
    addRandomTile,
    getNewMatrixByDirection, type AnimationPlan, type Direction
} from "../../logic/boardLogic";
import { styled } from "styled-components";
import FullscreenToggleButton from "../FullScreenToggleButton";
import { createMatrix, getNumZeros, copyMatrix } from "../../logic/matrixUtils";
import { useKeySwipe } from "../../hooks/useKeySwipe";
import { ANIMATION_DURATION, GRID_SIZE } from "../../utilities/globals";
import { useRefSwipe } from "../../hooks/useSRefwipe";
import pkg from "../../../../package.json"
import { SmallButton } from "../../elements/SmallButton";
import { IconRestart, IconUndo } from "../../../assets/Icons";
import { MAX_TILE_VALUE } from "../tile/Tile";
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
`;

const InfoWrapper = styled.div`
  margin-top: 20px;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  max-width: 260px;
`;

const createInitialBoardData = (): number[][] => {
    const grid = createMatrix(GRID_SIZE, 0);
    addRandomTile(grid, 2);
    return grid;
}

const LOCAL_STORAGE_DATA_KEY = "boardData";

const isSwipePossible = (boardData: number[][]): boolean => {
    const canSwipe = (direction: Direction): boolean => {
        const { plan } =
            getNewMatrixByDirection(boardData, direction);
        return plan !== undefined;
    }
    return canSwipe("up") || canSwipe("down") || canSwipe("left") || canSwipe("right");
}

const canAddTiles = (boardData: number[][]): boolean =>
    getNumZeros(boardData) > 0;


export const Game: React.FC = () => {

    const [boardData, setBoardData] = useState<number[][]>([[]]);
    const [animationPlan, setAnimationPlan] = useState<AnimationPlan | undefined>(undefined);
    const [lastBoard, setLastBoard] = useState<number[][]>([[]]);
    const [allowTileChange, setAllowTileChange] = useState(false);

    const handleSwipe = useCallback((direction: Direction): undefined => {
        const { newBoard, plan } = getNewMatrixByDirection(boardData, direction);
        if (plan) {
            setAnimationPlan(plan);
        }

        setLastBoard(boardData);
        setBoardData(newBoard);

        if (canAddTiles(newBoard)) {
            const newTileValue = 2;
            addRandomTile(newBoard, newTileValue);
        }

        if (!isSwipePossible(newBoard)) {
            setTimeout(() => { alert("Game Over") }, ANIMATION_DURATION * 2);
        }
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(newBoard));
    }, [boardData]);

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
            setLastBoard(initialBoard)
        }
    }, [])


    const handleTileClick = (row: number, column: number): undefined => {

        if (!allowTileChange) return

        const newBoardData = copyMatrix(boardData);
        const getNextTileValue = (value: number): number => {
            if (value >= MAX_TILE_VALUE) return 0;
            return value == 0 ? 2 : value * 2;
        }
        newBoardData[row][column] = getNextTileValue(newBoardData[row][column]);
        setData(newBoardData);
    }

    const handleTileDoubleClick = (row: number, column: number): undefined => {
        const newBoardData = copyMatrix(boardData);
        newBoardData[row][column] = 0;
        setData(newBoardData);
    }


    const CheckboxStyled = styled.input`
        width: 38px;
        height: 38px;
        accent-color: #636363;
    `;

    const CheckboxWrapper = styled.div`
        display: flex; 
        margin-left: auto; 
        flex-direction: column; 
        align-items: center;
    `;

    const ButtonsWrapper = styled.div`
        display: flex;
        align-self: start;
        gap: 20px;
        margin: 20px;
        width: 90vw;
    `;

    return (
        <PageWrapper
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}>

            <ButtonsWrapper>

                <FullscreenToggleButton />

                <SmallButton onClick={() => {
                    setData(createInitialBoardData());
                    setAnimationPlan(undefined);
                }}>
                    <IconRestart />
                </SmallButton>

                <SmallButton onClick={() => {
                    setData(lastBoard);
                }}>
                    <IconUndo />
                </SmallButton>

                <CheckboxWrapper>
                    <CheckboxStyled type="checkbox"
                        checked={allowTileChange}
                        onChange={(e) => setAllowTileChange(e.target.checked)}>
                    </CheckboxStyled>
                    <div>allow change</div>
                </CheckboxWrapper>

            </ButtonsWrapper>

            <h1 style={{ color: "black" }}>2048 to 65k</h1>

            <Board boardData={boardData}
                onTileClick={handleTileClick}
                onTileDoubleClick={handleTileDoubleClick}
                onAnimationPlanEnded={() => { setAnimationPlan(undefined) }}
                animationPlan={animationPlan}
            />

            <InfoWrapper>
                {`Game by Inbar and Tal Segal version: ${VERSION}`}
            </InfoWrapper>

        </PageWrapper>

    );
}