import styled from 'styled-components';
import { TILE_PIXEL_SIZE } from '../tile/Tile';
import type { AnimationPlan } from '../../logic/boardLogic';
import { pushBoardTiles, pushEmptyTiles, pushMovingTiles } from '../../../utilities/mapTileUtils';
import { GRID_SIZE, MARGIN_BETWEEN_TILES, SWIPE_TIME } from '../../../utilities/globals';

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

const mapMatrixToTiles = (matrix: number[][],
    onTileClick?: (row: number, column: number) => undefined,
    onTileDoubleClick?: (row: number, column: number) => undefined): React.ReactElement[] => {

    const tiles: React.ReactElement[] = [];
    pushEmptyTiles(tiles, onTileClick, onTileDoubleClick);
    pushBoardTiles(matrix, tiles, onTileClick, onTileDoubleClick);
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

    const renderPlan = () => {
        setTimeout(onPlanEnded, SWIPE_TIME);

        if (plan) {
            const tileList: React.ReactElement[] = [];
            pushEmptyTiles(tileList);
            pushMovingTiles(plan.movingTiles, tileList);
            return tileList;
        }
        return <></>;
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

