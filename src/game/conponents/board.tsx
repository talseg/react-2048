import React, { useState } from 'react';
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

    const [column, setColumn] = useState(4);
    const [value, setValue] = useState(2);

    const [touchStartX, setTouchStartX] = useState(0); 
    const [touchEndX, setTouchEndX] = useState(0); 


    const handleClick = () =>
    {
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.changedTouches[0].screenX);
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const currentX = e.changedTouches[0].screenX;
        const delta = currentX - touchStartX;
        const swipeLength = Math.abs(delta);

        // There was a swipe
        if (swipeLength > 50) { 

            if (delta < 0 && column > 1) // swipe left
            {
                setColumn(1);
                setValue((val) => val * 2);
            }   
            else if (delta > 0 && column < 4) {    // swipe right
                setColumn(4);
                setValue((val) => val * 2);
            }
        }
    }


    return (
        <BoardWrapper
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            <TileStyled value={value} gridRow={1} gridColumn={column}>
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

