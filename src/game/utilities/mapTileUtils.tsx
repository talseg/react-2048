import { css, keyframes, styled } from "styled-components";
import { Tile, TILE_PIXEL_SIZE } from "../conponents/tile/Tile";
import type { MovingTile, StaticTile } from "../logic/boardLogic";
import { GRID_SIZE, MARGIN_BETWEEN_TILES, ANIMATION_DURATION } from "./globals";

const StaticTileStyled = styled(Tile) <{ x: number; y: number }>`
    position: absolute;
    ${({ x, y }) => css`
        top: ${y}px; 
        left: ${x}px;`
    }
`;

const createPop = () => keyframes`
  0%   { transform: scale(0); }
  50%  { transform: scale(0); }
  100% { transform: scale(1); }
`;

const PopingTileStyled = styled(Tile) <{ x: number; y: number }>`
    position: absolute;
    animation: ${createPop()} ${ANIMATION_DURATION}ms forwards;
    top: ${({ y }) => { return `${y}px` }};
    left: ${({ x }) => { return `${x}px` }};
`;

const createMerge = () => keyframes`
  0%   { transform: scale(0); }
  50%  { transform: scale(0); }
  51%  { transform: scale(1.0); }
  75%  { transform: scale(1.0); }
  // ToDO - Change it to a good value
  100% { transform: scale(1.0); }
`;

const MergedTileStyled = styled(Tile) <{ x: number; y: number }>`
    position: absolute;
    animation: ${createMerge()} ${ANIMATION_DURATION}ms forwards;
    top: ${({ y }) => { return `${y}px` }};
    left: ${({ x }) => { return `${x}px` }};
`;

const createHorizontalMove = (x0: number, x1: number) => keyframes`
  from { left: ${x0}px; }
  to   { left: ${x1}px; }
`;

const HorizontalMovingTileStyled = styled(Tile) <{ x0: number; x1: number; y: number }>`
    position: absolute;
    animation: ${({ x0, x1 }) => createHorizontalMove(x0, x1)} ${ANIMATION_DURATION * 0.5}ms forwards;
    top: ${({ y }) => { return `${y}px` }};
`;

const createVerticalMove = (y0: number, y1: number) => keyframes`
  from { top: ${y0}px; }
  to   { top: ${y1}px; }
`;

const VerticalMovingTileStyled = styled(Tile) <{ y0: number; y1: number; x: number }>`
    position: absolute;
    animation: ${({ y0, y1 }) => createVerticalMove(y0, y1)} ${ANIMATION_DURATION * 0.5}ms forwards;
    left: ${({ x }) => { return `${x}px` }};
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

export const pushStaticTiles = (tiles: StaticTile[], tileList: React.ReactElement[]) => {

    for (let index = 0; index < tiles.length; index++) {

        const tile = tiles[index];
        const x = toPixels(tile.position.col);
        const y = toPixels(tile.position.row);
        tileList.push(
            <StaticTileStyled key={`static-tile-${index}`} value={tile.value} x={x} y={y} />
        );
    }
}

export const pushMergedTiles = (tiles: StaticTile[], tileList: React.ReactElement[]) => {

    for (let index = 0; index < tiles.length; index++) {

        const tile = tiles[index];
        const x = toPixels(tile.position.col);
        const y = toPixels(tile.position.row);
        tileList.push(
            <MergedTileStyled key={`merged-tile-${index}`} value={tile.value} x={x} y={y} />
        );
    }
}

export const pushMovingTiles = (tiles: MovingTile[], tileList: React.ReactElement[]) => {
    for (let index = 0; index < tiles.length; index++) {

        const tile = tiles[index];
        // Horizontal movement
        if (tile.tileType === "poping") {
            const x = toPixels(tile.from.col);
            const y = toPixels(tile.from.row);
            tileList.push(
                <PopingTileStyled key={`poping-tile-${index}`} value={tile.value} x={x} y={y} />
            );
        }
        else if (tile.from.row === tile.to.row) {

            const x0 = toPixels(tile.from.col);
            const x1 = toPixels(tile.to.col);
            const y = toPixels(tile.from.row);

            tileList.push(
                <HorizontalMovingTileStyled key={`moving-tile-${index}`} value={tile.value} x0={x0} x1={x1} y={y} />
            );
        }
        // Vertical movement
        else if (tile.from.col === tile.to.col) {

            const y0 = toPixels(tile.from.row);
            const y1 = toPixels(tile.to.row);
            const x = toPixels(tile.from.col);

            tileList.push(
                <VerticalMovingTileStyled key={`moving-tile-${index}`} value={tile.value} y0={y0} y1={y1} x={x} />
            );
        }
        else {
            throw (
                new Error("Got diagonal movement")
            );
        }
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