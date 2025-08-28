import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';


interface TileProps {
    value: number;
    className?: string;
}

export const TILE_SIZE: number = 64;

// ToDO - background color
const TileWrapper = styled.div<{ color: string; fontSize: number; $backgroundColor: string }>`
    ${({ color, fontSize, $backgroundColor }) => css`
    width: ${TILE_SIZE}px;
    height: ${TILE_SIZE}px;
    background-color: ${$backgroundColor};
    text-align: middle;
    border-radius: 6px;
    color: ${color};
    font-weight: bold;
    font-size: ${fontSize}px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial;
    user-select: none;
`}`;

// ToDo - change the colors a little bit
const getTileColorByValue = (value: number): string => {

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

const getTextColorByValue = (color: number): string => {
    if (color <= 4) {
        return "#776e65";
    }
    return "#f7f5f4";
}

function getFontSizeByValue(value: number): number {
    if (value <= 8192)
        return 26;
    return 20;

}

export const Tile: React.FC<TileProps> = ({ value, className }) => {

    const [tileValue, setTileValue] = useState(value);

    useEffect(() => {
        setTileValue(value);
    }, [value]);

    const tileColor = getTileColorByValue(tileValue);
    const textColor = getTextColorByValue(tileValue);
    const fontSize = getFontSizeByValue(tileValue);

    return (
        <TileWrapper
            // ToDO - check without the className
            className={className} 
            color={textColor} fontSize={fontSize}
            $backgroundColor={tileColor}
            //onClick={() => setTileValue(tileValue === 0 ? 2 : tileValue * 2)}
        >
            {tileValue === 0 ? "" : tileValue
            /* ToDo show dad*/
            }
        </TileWrapper>
    );
}

