import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Tile, TileSize } from '../tile/Tile';

// test PR

const TilesMargin = 7;

const BoardWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(4, ${TileSize}px);
    grid-template-columns: repeat(4, ${TileSize}px);
    gap: ${TilesMargin}px;
    background-color: #aeaeae;
    width: auto;
    padding: ${TilesMargin}px;
    border-radius: 16px;
`

const TileStyled = styled(Tile)<{ gridRow: number; gridColumn: number }>`
    ${({ gridRow, gridColumn }) => css`
    grid-row: ${gridRow};
    grid-column: ${gridColumn};
  `}
`;

const mapMatrixToTiles = (matrix: number[][]): React.ReactElement[] => {

  const tiles: React.ReactElement[] = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
        const tile = 
            <TileStyled value={matrix[row][col]} gridRow={row+1} gridColumn={col+1} backgroundColor="#50505055"/>;
      tiles.push(tile);
    }
  }
  return tiles;
};

export const Board: React.FC = () => {

    const [column, setColumn] = useState(1);
    const [row, setRow] = useState(1);
    const [tileValue, setTileValue] = useState(2);

    const [touchStartX, setTouchStartX] = useState(0); 
    const [touchStartY, setTouchStartY] = useState(0);

    const boardMatrix = [
        [1,2,3,4],
        [5,6,7,8],
        [9,10,11,12],
        [13,14,15,16]
    ];

    useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
            case 'ArrowLeft':
                if (column > 1) // swipe left
                {
                    setColumn(1);
                    setTileValue(tileValue * 2);
                }  
                break;
            case 'ArrowRight':
                if (column < 4) {
                    setColumn(4);
                    setTileValue(tileValue * 2);
                }
                break;
            case 'ArrowUp':
                if (row > 1) // swipe up
                {
                    setRow(1);
                    setTileValue(tileValue * 2);
                }
                break;
            case 'ArrowDown':
                if (row < 4) // swipe down
                {
                    setRow(4);
                    setTileValue(tileValue * 2);
                }
                break;
            // Add cases for other arrow keys if needed
            default:
                break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
    
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      }
    }, [column, row, tileValue])
    


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

        if (swipeLengthX > swipeLengthY) {
        // There was an X swipe
            if (swipeLengthX > 50) { 

                if (deltaX < 0 && column > 1) // swipe left
                {
                    setColumn(1);
                    setTileValue((val) => val * 2);
                }   
                else if (deltaX > 0 && column < 4) {    // swipe right
                    setColumn(4);
                    setTileValue((val) => val * 2);
                }
            }
        }
        else {
        // There was a Y swipe
            if (swipeLengthY > 50) { 

                if (deltaY < 0 && row > 1) // swipe up
                {
                    setRow(1);
                    setTileValue((val) => val * 2);
                }   
                else if (deltaY > 0 && row < 4) {    // swipe down
                    setRow(4);
                    setTileValue((val) => val * 2);
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
            { mapMatrixToTiles(boardMatrix) }

        </BoardWrapper>
    );
}

