import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Tile, TileSize } from './tile';

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
${({ gridRow, gridColumn }) => `
    grid-row: ${gridRow};
    grid-column: ${gridColumn};
  `}
`;

export const Board: React.FC = () => {

    const [column, setColumn] = useState(1);
    const [row, setRow] = useState(1);
    const [tileValue, setTileValue] = useState(2);

    const [touchStartX, setTouchStartX] = useState(0); 
    const [touchStartY, setTouchStartY] = useState(0);


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
    }, [column, row])
    


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

            <TileStyled value={tileValue} gridRow={row} gridColumn={column}>
            </TileStyled>

            {/* <TileStyled value={12} gridRow={1} gridColumn={2}>
            </TileStyled>

            <TileStyled value={21} gridRow={2} gridColumn={1}>
            </TileStyled>

            <TileStyled value={22} gridRow={2} gridColumn={2}>
            </TileStyled> */}

        </BoardWrapper>
    );
}

