import React from 'react';
import styled, { css } from 'styled-components';


interface TileProps {
    value: number;
    backgroundColor: string;
    className?: string;
}

export const TileSize: number  = 64;

const TileWrapper = styled.div<{color: string}>`
    ${({ color }) => css`
    width: ${TileSize}px;
    height: ${TileSize}px;
    background-color: ${color};
    text-align: middle;
    border-radius: 16px;
    color: black;
    font-weight: bold;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial;
`}`;

export const Tile: React.FC<TileProps> = ({ value, backgroundColor, className }) => {

    return (
            <TileWrapper className={className} color={backgroundColor}>
                {value}
            </TileWrapper>
    );
}

