import styled, { keyframes } from 'styled-components';
import { Tile, TILE_PIXEL_SIZE } from '../tile/Tile';
import type { AnimationPlan } from '../../logic/boardLogic';

// TILE_SIZE is taken from the the Tile component
export const GRID_SIZE = 4;
const MARGIN_BETWEEN_TILES = 7;
const SWIPE_TIME = 100;

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

const TileWrapper = styled.div<{ x: number; y: number }>`
    position: absolute;
    /* transition: transform 100ms ease; */
    transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};
`;

const createMove = (x0: number, x1: number) => keyframes`
  from { left: ${x0}px; }
  to   { left: ${x1}px; }
`;

const HorizontalTileWrapper = styled.div<{ x0: number; x1: number }>`
    position: absolute;
    animation: ${({ x0, x1 }) => createMove(x0, x1)} ${SWIPE_TIME}ms forwards;
`;

const StaticTileWrapper = styled.div<{ x: number; y: number }>`
    position: absolute;
    /* transition: transform 1500ms ease; */
    transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};
`;

const mapMatrixToTiles = (matrix: number[][],
    onTileClick?: (row: number, column: number) => undefined,
    onTileDoubleClick?: (row: number, column: number) => undefined): React.ReactElement[] => {

    const tiles: React.ReactElement[] = [];
    let key = 0;

    // Add empty tiles
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const value = 0;

            const x = col * (TILE_PIXEL_SIZE + MARGIN_BETWEEN_TILES);
            const y = row * (TILE_PIXEL_SIZE + MARGIN_BETWEEN_TILES);

            tiles.push(
                <StaticTileWrapper key={`zero-${key++}`} x={x} y={y}>
                    <Tile value={value}
                        onClick={() => onTileClick?.(row, col)}
                        onDoubleClick={() => onTileDoubleClick?.(row, col)} />
                </StaticTileWrapper>
            );
        }
    }

    // Add real tiles
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const value = matrix[row][col];

            if (value != 0) {
                const x = col * (TILE_PIXEL_SIZE + MARGIN_BETWEEN_TILES);
                const y = row * (TILE_PIXEL_SIZE + MARGIN_BETWEEN_TILES);

                tiles.push(
                    <TileWrapper key={key++} x={x} y={y}>
                        <Tile value={value}
                            onClick={() => onTileClick?.(row, col)}
                            onDoubleClick={() => onTileDoubleClick?.(row, col)}
                        />
                    </TileWrapper>
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

    const convertColToX = (col: number): number => {
        return col * (TILE_PIXEL_SIZE + MARGIN_BETWEEN_TILES) + MARGIN_BETWEEN_TILES;
    }

    const renderPlan = () => {
        setTimeout(endPlan, SWIPE_TIME);

        if (plan !== undefined) {
            const movingTiles = plan.movingTiles;
            const tileList = [];

            for (let index = 0; index < movingTiles.length; index++) {

                const tile = movingTiles[index];
                const col0 = tile.from.col;
                const col1 = tile.to.col;

                const x0 = convertColToX(col0);
                const x1 = convertColToX(col1);

                tileList.push(
                    <HorizontalTileWrapper x0={x0} x1={x1}>
                        <Tile value={tile.value} />
                    </HorizontalTileWrapper>
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

