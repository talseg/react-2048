import { css, keyframes, styled } from "styled-components";
import { Tile, TILE_PIXEL_SIZE } from "../conponents/tile/Tile";
import type { Cell, MovingTile, StaticTile } from "../logic/boardLogic";
import { MARGIN_BETWEEN_TILES, ANIMATION_DURATION } from "./globals";

const StaticTileStyled = styled(Tile) <{ x: number; y: number }>`
    position: absolute;
    ${({ x, y }) => css`
        top: ${y}px; 
        left: ${x}px;`
    }
`;

const createPop = () => keyframes`
  0%   { transform: scale(0); }
  80%  { transform: scale(0); }
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
  75%  { transform: scale(1.1); }
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

const toPixels = (col: number): number =>
    col * (TILE_PIXEL_SIZE + MARGIN_BETWEEN_TILES) + MARGIN_BETWEEN_TILES;

const getXY = (col: number, row: number): { x: number, y: number } => ({ x: toPixels(col), y: toPixels(row) });

const getCellXY = (position: Cell): { x: number, y: number } => ({ x: toPixels(position.col), y: toPixels(position.row) });

export const getEmptyTiles = (
    gridSize: number,
    onTileClick?: (row: number, column: number) => undefined,
    onTileDoubleClick?: (row: number, column: number) => undefined
): React.ReactElement[] => {
    const tiles: React.ReactElement[] = [];
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            tiles.push(
                <StaticTileStyled value={0} {...getXY(col, row)} key={`empty-tile-${row}-${col}`}
                    onClick={() => onTileClick?.(row, col)}
                    onDoubleClick={() => onTileDoubleClick?.(row, col)} />
            );
        }
    }
    return tiles;
}

export const getStaticTiles = (tiles: StaticTile[]): React.ReactElement[] =>
    tiles.map((tile, index) =>
        <StaticTileStyled value={tile.value}
            {...getCellXY(tile.position)} key={`static-tile-${index}`} />);

export const getMergedTiles = (tiles: StaticTile[]): React.ReactElement[] =>
    tiles.map((tile, index) =>
        <MergedTileStyled value={tile.value}
            {...getCellXY(tile.position)} key={`merged-tile-${index}`} />);

export const getPopedTile = (tile: StaticTile): React.ReactElement =>
    <PopingTileStyled key={`poping-tile`} value={tile.value} {...getCellXY(tile.position)} />;

export const getMovingTiles = (tiles: MovingTile[]): React.ReactElement[] => {
    return tiles.map((tile, index) => {
        // Horizontal movement
        if (tile.from.row === tile.to.row) {
            const x0 = toPixels(tile.from.col);
            const x1 = toPixels(tile.to.col);
            const y = toPixels(tile.from.row);

            return <HorizontalMovingTileStyled key={`moving-tile-${index}`}
                value={tile.value} x0={x0} x1={x1} y={y} />;
        }
        else if (tile.from.col === tile.to.col) {
            const y0 = toPixels(tile.from.row);
            const y1 = toPixels(tile.to.row);
            const x = toPixels(tile.from.col);
            return <VerticalMovingTileStyled key={`moving-tile-${index}`}
                value={tile.value} y0={y0} y1={y1} x={x} />;
        }
        else throw (new Error("Got diagonal movement"));
    })
}

export const getBoardTiles = (
    board: number[][],
    onTileClick?: (row: number, column: number) => undefined,
    onTileDoubleClick?: (row: number, column: number) => undefined
): React.ReactElement[] => {
    const tiles: React.ReactElement[] = [];

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const value = board[row][col];
            if (value !== 0) {
                tiles.push(
                    <StaticTileStyled
                        key={`board-tile-${row}-${col}`}
                        value={value}
                        {...getXY(col, row)}
                        onClick={() => onTileClick?.(row, col)}
                        onDoubleClick={() => onTileDoubleClick?.(row, col)}
                    />
                );
            }
        }
    }
    return tiles;
};