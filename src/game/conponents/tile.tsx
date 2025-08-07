import React, { useState } from 'react';
import styled from 'styled-components';


interface TileProps {
    value: number;
    className?: string;
}

export const TileSize: number  = 65;

const TileWrapper = styled.div`
    width: ${TileSize}px;
    height: ${TileSize}px;
    background-color: #d34114;
    text-align: middle;
    border-radius: 16px;
    color: black;
    font-weight: bold;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

export const Tile: React.FC<TileProps> = ({ value, className }) => {

    const [ tileValue, setTileValue ] = useState(value);

    return (
            <TileWrapper className={className}>
                {value}
            </TileWrapper>
    );
}

