import styled, { css, keyframes } from 'styled-components';
import { Tile, TILE_PIXEL_SIZE } from '../tile/Tile';
import type { AnimationPlan } from '../../logic/boardLogic';

// TILE_SIZE is taken from the the Tile component
export const GRID_SIZE = 4;
const MARGIN_BETWEEN_TILES = 7;
const SWIPE_TIME = 1000;

const SURFACE_SIZE = GRID_SIZE * TILE_PIXEL_SIZE + (GRID_SIZE - 1) * MARGIN_BETWEEN_TILES;
const BOARD_PADDING = MARGIN_BETWEEN_TILES;

const BoardWrapper = styled.div`
    position: relative;
    background-color: #bbada0;
    width: ${SURFACE_SIZE}px;
    height: ${SURFACE_SIZE}px;
    padding: ${BOARD_PADDING}px;
    border-radius: 10px;
`

const StaticTile = styled(Tile) <{ x: number; y: number }>`
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

const MovingTile = styled(Tile) <{ x0: number; x1: number }>`
    position: absolute;
    animation: ${({ x0, x1 }) => createMove(x0, x1)} ${SWIPE_TIME}ms forwards;
`;

const toPixels = (col: number): number => {
    return col * (TILE_PIXEL_SIZE + MARGIN_BETWEEN_TILES) + MARGIN_BETWEEN_TILES;
}

const pushEmptyTiles = (tiles: React.ReactElement[], onTileClick?: (row: number, column: number) => undefined,
    onTileDoubleClick?: (row: number, column: number) => undefined) => {

    let key = 0;
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const value = 0;

            const x = toPixels(col);
            const y = toPixels(row);

            tiles.push(
                <StaticTile value={value} x={x} y={y} key={`empty-tile-${key++}`}
                    onClick={() => onTileClick?.(row, col)}
                    onDoubleClick={() => onTileDoubleClick?.(row, col)} />
            );
        }
    }
    return tiles;
}

const mapMatrixToTiles = (matrix: number[][],
    onTileClick?: (row: number, column: number) => undefined,
    onTileDoubleClick?: (row: number, column: number) => undefined): React.ReactElement[] => {

    const tiles: React.ReactElement[] = [];
    let key = 0;

    pushEmptyTiles(tiles, onTileClick, onTileDoubleClick);

    // Add real tiles
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const value = matrix[row][col];

            if (value != 0) {
                const x = toPixels(col);
                const y = toPixels(row);

                tiles.push(
                    <StaticTile value={value} key={key++} x={x} y={y}
                        onClick={() => onTileClick?.(row, col)}
                        onDoubleClick={() => onTileDoubleClick?.(row, col)}
                    />
                );
            }
        }
    }
    return tiles;
};


interface BoardProps {
    boardData: number[][];
    onTileClick?: (row: number, column: number) => undefined;
    onTileDoubleClick?: (row: number, column: number) => undefined;
    onPlanEnded: () => undefined;
    plan: AnimationPlan | undefined;
}

export const Board: React.FC<BoardProps> = ({
    boardData,
    onTileClick,
    onTileDoubleClick,
    onPlanEnded,
    plan
}) => {

    const endPlan = () => {
        onPlanEnded();
    }



    const renderPlan = () => {
        setTimeout(endPlan, SWIPE_TIME);

        if (plan !== undefined) {

            const tileList: React.ReactElement[] = [];

            pushEmptyTiles(tileList)

            const movingTiles = plan.movingTiles;

            for (let index = 0; index < movingTiles.length; index++) {

                const tile = movingTiles[index];
                const col0 = tile.from.col;
                const col1 = tile.to.col;

                const x0 = toPixels(col0);
                const x1 = toPixels(col1);

                tileList.push(
                    <MovingTile value={tile.value} x0={x0} x1={x1} />
                )
            }

            return tileList;

        }
        return (
            <></>
        );
    }

    const renderBoard = () => {
        if (plan) {
            return renderPlan();
        }
        return mapMatrixToTiles(boardData, onTileClick, onTileDoubleClick)
    };


    return (
        <BoardWrapper>
            {renderBoard()}
        </BoardWrapper>
    );
}

