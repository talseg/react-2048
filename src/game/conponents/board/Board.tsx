import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Tile, TILE_SIZE } from '../tile/Tile';
import { getNewMatrixByDirection} from '../../logic/boardLogic';

// TILE_SIZE is taken from the the Tile component
const GRID_SIZE = 4;
const TILE_MARGIN = 7;
const SURFACE = GRID_SIZE * TILE_SIZE + (GRID_SIZE - 1) * TILE_SIZE; // inner playfield

const BoardWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(4, ${TILE_SIZE}px);
    grid-template-columns: repeat(4, ${TILE_SIZE}px);
    gap: ${TILE_MARGIN}px;
    background-color: #bbada0;
    width: ${SURFACE + TILE_MARGIN * 2};
    height: ${SURFACE + TILE_MARGIN * 2};
    padding: ${TILE_MARGIN}px;
    border-radius: 10px;
    position: relative;
`

const TileStyled = styled(Tile) <{ gridRow: number; gridColumn: number }>`
    ${({ gridRow, gridColumn }) => css`
    grid-row: ${gridRow};
    grid-column: ${gridColumn};
  `}
`;

const mapMatrixToTiles = (matrix: number[][]): React.ReactElement[] => {
    const tiles: React.ReactElement[] = [];

    // ToDo - Explain to Inbar
    var key = 0;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {

            const value = matrix[row][col];
            tiles.push(<TileStyled value={value} key={key++}
                gridRow={row + 1} gridColumn={col + 1} />);
        }
    }
    return tiles;
};

export const Board: React.FC = () => {

    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);

    const [boardData, setBoardData] = useState(
        [
            [2, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    )


    //  let arr = [6, 0, 4, 2, 2, 0,0,5];
    //  console.log("Before: " + arr + "\nAfter: " + rowFlip(arr));

    // let arr = [0, 4, 2, 2, 0];
    // console.log("Before: " + arr + "\nAfter: " + rowAfterLeftSwipe(arr));

    // arr = [2, 0, 2, 0, 4];
    // console.log("Before: " + arr + "\nAfter: " + rowAfterLeftSwipe(arr));

    // arr = [0,4,2,2,8];
    // console.log("Before: " + arr + "\nAfter: " + rowAfterLeftSwipe(arr));

    // arr = [2,0,4,2,16];
    // console.log("Before: " + arr + "\nAfter: " + rowAfterLeftSwipe(arr));

    // arr = [0,0,2,0,0];
    // console.log("Before: " + arr + "\nAfter: " + rowAfterLeftSwipe(arr));

    // arr = [32,2,4,0,2,0];
    // console.log("Before: " + arr + "\nAfter: " + rowAfterLeftSwipe(arr));

    // arr = [2,0,0,0,0,0,0];
    // console.log("Before: " + arr + "\nAfter: " + rowAfterLeftSwipe(arr));

    // arr = [2,2,4,8,16,32];
    // console.log("Before: " + arr + "\nAfter: " + rowAfterLeftSwipe(arr));

    //TESTING for left swipe




    // This is for testing visual of all fonts and colors
    /*
        [8,4,2,2],
        [16,32,64,128],
        [2048,1024,512,256],
        [4096,8192,16384,65536]
    */

    /*

    [0,0,0,2],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]

    */

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            let newBoardData: number[][];

            switch (event.key) {
                case 'ArrowLeft':
                    newBoardData = getNewMatrixByDirection(boardData, "left");
                    setBoardData(newBoardData);
                    break;
                case 'ArrowRight':
                    newBoardData = getNewMatrixByDirection(boardData, "right");
                    setBoardData(newBoardData);
                    break;
                case 'ArrowUp':
                    newBoardData = getNewMatrixByDirection(boardData, "up");
                    setBoardData(newBoardData);
                    break;
                case 'ArrowDown':
                    newBoardData = getNewMatrixByDirection(boardData, "down");
                    setBoardData(newBoardData);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [boardData])



    const handleClick = () => {
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.changedTouches[0].screenX);
        setTouchStartY(e.changedTouches[0].screenY);
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const currentX = e.changedTouches[0].screenX;
        const currentY = e.changedTouches[0].screenY;
        const deltaX = currentX - touchStartX;
        const deltaY = currentY - touchStartY;

        const swipeLengthX = Math.abs(deltaX);
        const swipeLengthY = Math.abs(deltaY);

        let newBoardData: number[][];

        if (swipeLengthX > swipeLengthY) {
            // There was an X swipe
            if (swipeLengthX > 50) {

                if (deltaX < 0) // swipe left
                {
                    newBoardData = getNewMatrixByDirection(boardData, "left");
                    setBoardData(newBoardData);
                }
                else if (deltaX > 0) {    // swipe right
                    newBoardData = getNewMatrixByDirection(boardData, "right");
                    setBoardData(newBoardData);
                }
            }
        }
        else {
            // There was a Y swipe
            if (swipeLengthY > 50) {

                if (deltaY < 0) // swipe up
                {
                    newBoardData = getNewMatrixByDirection(boardData, "up");
                    setBoardData(newBoardData);
                }
                else if (deltaY > 0) {    // swipe down
                    newBoardData = getNewMatrixByDirection(boardData, "down");
                    setBoardData(newBoardData);
                }
            }
        }

    }

    return (
        <BoardWrapper
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {mapMatrixToTiles(boardData)}

        </BoardWrapper>
    );
}

