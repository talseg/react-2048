import React from 'react';
import styled, { css } from 'styled-components';


interface TileProps {
    value: number;
    className?: string;
}

export const TileSize: number  = 64;

const TileWrapper = styled.div<{backgroundColor: string, color: string, fontSize: number}>`
    ${({ backgroundColor, color, fontSize }) => css`
    width: ${TileSize}px;
    height: ${TileSize}px;
    background-color: ${backgroundColor};
    text-align: middle;
    border-radius: 6px;
    color: ${color};
    font-weight: bold;
    font-size: ${fontSize}px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial;
`}`;

// ToDo - change the colors a little bit
const getTileColorByValue = (value: number) : string => {

    switch (value) {
        case 0:
            return "#d6cdc4";
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ece0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f57c5f";
            break;
        case 64:
            return "#f65d3b";
            break;
        case 128:
            return "#edce71";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#ecc850";
            break;
        case 1024:
            return "#eec22e";
            break;
        case 2048:
            return "#eec22e";
            break;
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
            return "#3d3333";
    }
    return "#e01313";
}

const getTextColorByValue = (color: number) : string => {
    if (color <= 4) 
    {
        return "#776e65";
    }
    return "#f7f5f4";
}

function getFontSizeByValue(value: number) : number {
    if (value <= 8192)
        return 26;
    return 20;

}

export const Tile: React.FC<TileProps> = ({ value, className }) => {

    const tileColor = getTileColorByValue(value);
    const textColor = getTextColorByValue(value);
    const fontSize = getFontSizeByValue(value);

    return (
            <TileWrapper className={className} backgroundColor={tileColor} color={textColor} fontSize={fontSize}>
                {value}
            </TileWrapper>
    );
}

