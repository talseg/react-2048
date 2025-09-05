import { css, keyframes, styled } from "styled-components";
import { Tile, TILE_PIXEL_SIZE } from "../conponents/tile/Tile";
import type { MovingTile } from "../logic/boardLogic";
import { GRID_SIZE, MARGIN_BETWEEN_TILES, ANIMATION_DURATION } from "./globals";

const StaticTileStyled = styled(Tile) <{ x: number; y: number }>`
    position: absolute;
    ${({ x, y }) => css`
        top: ${y}px; 
        left: ${x}px;`
    }
`;

const createMove = (x0: number, x1: number) => keyframes`
  from { left: ${x0}px; }
  to   { left: ${x1}px; }
`;

const MovingTileStyled = styled(Tile) <{ x0: number; x1: number }>`
    position: absolute;
    animation: ${({ x0, x1 }) => createMove(x0, x1)} ${ANIMATION_DURATION}ms forwards;
`;

const toPixels = (col: number): number => {
    return col * (TILE_PIXEL_SIZE + MARGIN_BETWEEN_TILES) + MARGIN_BETWEEN_TILES;
}

export const pushEmptyTiles = (tiles: React.ReactElement[], 
    onTileClick?: (row: number, column: number) => undefined,
    onTileDoubleClick?: (row: number, column: number) => undefined) => {

    let key = 0;
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const value = 0;

            const x = toPixels(col);
            const y = toPixels(row);

            tiles.push(
                <StaticTileStyled value={value} x={x} y={y} key={`empty-tile-${key++}`}
                    onClick={() => onTileClick?.(row, col)}
                    onDoubleClick={() => onTileDoubleClick?.(row, col)} />
            );
        }
    }
    return tiles;
}

export const pushMovingTiles = (tiles: MovingTile[], tileList: React.ReactElement[]) => {
    for (let index = 0; index < tiles.length; index++) {

        const tile = tiles[index];
        const col0 = tile.from.col;
        const col1 = tile.to.col;

        const x0 = toPixels(col0);
        const x1 = toPixels(col1);

        tileList.push(
            <MovingTileStyled key={`moving-tile-${index}`} value={tile.value} x0={x0} x1={x1} />
        )
    }
}

export const pushBoardTiles = (board: number[][], 
    tileList: React.ReactElement[],
    onTileClick?: (row: number, column: number) => undefined,
    onTileDoubleClick?: (row: number, column: number) => undefined) => {
    let key = 0;
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const value = board[row][col];

            if (value != 0) {
                const x = toPixels(col);
                const y = toPixels(row);

                tileList.push(
                    <StaticTileStyled value={value} key={`board-tile-${key++}`} x={x} y={y}
                        onClick={() => onTileClick?.(row, col)}
                        onDoubleClick={() => onTileDoubleClick?.(row, col)}
                    />
                );
            }
        }
    }
}