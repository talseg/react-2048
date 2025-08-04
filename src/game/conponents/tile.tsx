import React, { useState } from 'react';
import styled from 'styled-components';

interface TileProps {
    value: number;
    row: number;
    column: number;
}

export const TileSize: number  = 80;

const TileWrapper = styled.div`
    width: ${TileSize}px;
    height: ${TileSize}px;
    background-color: #69624e;
    text-align: middle;
    border-radius: 16px;
    color: white;
    font-weight: bold;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Tile: React.FC<TileProps> = ({ value, row, column }) => {

    const [ tileValue, setTileValue ] = useState(value);

    const handleClick = () => {
        setTileValue((val) => val * 2);
    }

    return (
        <TileWrapper onClick={handleClick}>
            {tileValue}
        </TileWrapper>
    );

}

