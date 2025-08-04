import React from 'react';
import styled from 'styled-components';
import { TileSize } from './tile';

const TilesMargin = 10;

const BOARD_SIZE = TileSize * 3 + TilesMargin * 5;

const BoardWrapper = styled.div`
    width: ${BOARD_SIZE}px;
    height: ${BOARD_SIZE}px;
    background-color: #858585;
    display: flex;
`

export const Board: React.FC = () => {

    return (
 
        <div style={{ color: "red", fontSize: "30px"}}>
            This is the game!!
        </div>
    )
}

