import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';



export const TILE_PIXEL_SIZE: number = 64;

// ToDO - background color
const TileWrapper = styled.div<{ color: string; fontSize: number; $backgroundColor: string }>`
    ${({ color, fontSize, $backgroundColor }) => css`
    width: ${TILE_PIXEL_SIZE}px;
    height: ${TILE_PIXEL_SIZE}px;
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
        case 4:
            return "#ece0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f57c5f";
        case 64:
            return "#f65d3b";
        case 128:
            return "#edce71";
        case 256:
            return "#edcc61";
        case 512:
            return "#ecc850";
        case 1024:
            return "#eec22e";
        case 2048:
            return "#eec22e";
        case 4096:
            return "#eeb82e";
        case 8192:
            return "#eeb12e";
        case 16384:
            return "#ee9b2e";
        case 32768:
            return "#ee812e";
        case 65536:
            return "#3d3333";
    }
    return "#ff0000";
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

interface TileProps {
    value: number;
    className?: string;
    onClick?: () => undefined;
    onDoubleClick?: () => undefined;
}

export const Tile: React.FC<TileProps> = ({ value, className, onClick, onDoubleClick }) => {

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
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        >
            {tileValue === 0 ? "" : tileValue
            /* ToDo show dad*/
            }
        </TileWrapper>
    );
}

