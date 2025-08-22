import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Tile, TileSize } from '../tile/Tile';
import { getNewMatrixByDirection, rowAfterRightSwipe } from '../../logic/boardLogic';


const TilesMargin = 7;

const BoardWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(4, ${TileSize}px);
    grid-template-columns: repeat(4, ${TileSize}px);
    gap: ${TilesMargin}px;
    background-color: #bbada0;
    width: auto;
    padding: ${TilesMargin}px;
    border-radius: 10px;
`

const TileStyled = styled(Tile)<{ gridRow: number; gridColumn: number }>`
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
                gridRow={row+1} gridColumn={col+1}/>);
        }
    }
  return tiles;
};

export const Board: React.FC = () => {

    const [touchStartX, setTouchStartX] = useState(0); 
    const [touchStartY, setTouchStartY] = useState(0);

    const [boardData, setBoardData] = useState(
        [
        [2,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
        ]
    )
    console.log(rowAfterRightSwipe([2,4,4,8,16,0,0,2,4]));

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
    


    const handleClick = () =>
    {
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
            { mapMatrixToTiles(boardData) }

        </BoardWrapper>
    );
}

