import styled from 'styled-components';
import { TILE_PIXEL_SIZE } from '../tile/Tile';
import type { AnimationPlan } from '../../logic/boardLogic';
import { pushBoardTiles, pushEmptyTiles, pushMovingTiles } from '../../utilities/mapTileUtils';
import { GRID_SIZE, MARGIN_BETWEEN_TILES, ANIMATION_DURATION } from '../../utilities/globals';

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

const renderStaticBoard = (matrix: number[][],
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

    // the animation plan starts when we get a defined animation plan
    animationPlan: AnimationPlan | undefined;
    onAnimationPlanEnded: () => undefined;
}

export const Board: React.FC<BoardProps> = ({
    boardData,
    onTileClick,
    onTileDoubleClick,
    animationPlan,
    onAnimationPlanEnded,
}) => {

    const renderAnimationPlan = () => {

        // wait SWIPE_TIME until the animation plan finishes,
        // only then signal the game that it was finished
        setTimeout(onAnimationPlanEnded, ANIMATION_DURATION + 100);

        if (animationPlan) {
            const tileList: React.ReactElement[] = [];
            pushEmptyTiles(tileList);
            pushMovingTiles(animationPlan.movingTiles, tileList);
            return tileList;
        }
        return <></>;
    }

    const renderBoard = () => {
        // when the game starts the animation - it sends an animation plan
        if (animationPlan) {
            return renderAnimationPlan();
        }
        return renderStaticBoard(boardData, onTileClick, onTileDoubleClick)
    };

    return (
        <BoardWrapper>
            {renderBoard()}
        </BoardWrapper>
    );
}

