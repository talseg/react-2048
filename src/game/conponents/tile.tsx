import React from 'react';
import styled from 'styled-components';

interface TileProps {
    value: number;
    row: number;
    tileColor: number;
}

export const TileSize: number  = 80;

const TileWrapper = styled.div<{value: number}>`
    width: ${TileSize}px;
    height: ${TileSize}px;
    background-color: "#ffffff2f";
`

export const Tile: React.FC<TileProps> = ({ value, row, tileColor }) => {

    return (
        <TileWrapper value={value}>
            value
        </TileWrapper>
    );


}

