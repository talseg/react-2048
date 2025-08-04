import React from 'react';
import styled from 'styled-components';
import { Tile, TileSize } from './tile';

const TilesMargin = 10;

const BOARD_SIZE = TileSize * 3 + TilesMargin * 2;

const BoardWrapper = styled.div`
    width: ${BOARD_SIZE}px;
    height: ${BOARD_SIZE}px;
    background-color: #858585;
    display: flex;
    row-gap: ${TilesMargin}px;
    column-gap: ${TilesMargin}px;
    padding: ${TilesMargin}px;
    flex-wrap: wrap;
`

export const Board: React.FC = () => {



    return (
 
        <BoardWrapper>
            <Tile value={2} row={0} column={0} ></Tile>
            <Tile value={4} row={0} column={0} ></Tile>
            <Tile value={8} row={0} column={0} ></Tile>
            <Tile value={16} row={0} column={0} ></Tile>
            <Tile value={32} row={0} column={0} ></Tile>
            {/* <Tile value={64} row={0} column={0} ></Tile>
            <Tile value={128} row={0} column={0} ></Tile>
            <Tile value={256} row={0} column={0} ></Tile>
            <Tile value={1024} row={0} column={0} ></Tile> */}
        </BoardWrapper>
    )
}

