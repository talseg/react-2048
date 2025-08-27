import styled, { css } from 'styled-components';
import { Tile, TILE_SIZE } from '../tile/Tile';

// TILE_SIZE is taken from the the Tile component
const GRID_SIZE = 4;
const TILE_MARGIN = 7;
const SURFACE = GRID_SIZE * TILE_SIZE + (GRID_SIZE - 1) * TILE_SIZE; // inner playfield

const BoardWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(4, ${TILE_SIZE}px);
    grid-template-columns: repeat(4, ${TILE_SIZE}px);
    gap: ${TILE_MARGIN}px;
    background-color: #bbada0;
    width: ${SURFACE + TILE_MARGIN * 2};
    height: ${SURFACE + TILE_MARGIN * 2};
    padding: ${TILE_MARGIN}px;
    border-radius: 10px;
    position: relative;
`

const TileStyled = styled(Tile) <{ gridRow: number; gridColumn: number }>`
    ${({ gridRow, gridColumn }) => css`
    grid-row: ${gridRow};
    grid-column: ${gridColumn};
  `}
`;

const mapMatrixToTiles = (matrix: number[][]): React.ReactElement[] => {
    const tiles: React.ReactElement[] = [];

    // ToDo - Explain to Inbar
    var key = 0;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {

            const value = matrix[row][col];
            tiles.push(<TileStyled value={value} key={key++}
                gridRow={row + 1} gridColumn={col + 1} />);
        }
    }
    return tiles;
};

interface BoardProps {
    boardData: number[][];
}

export const Board: React.FC<BoardProps> = ({boardData}) => {
    return (
        <BoardWrapper>
            {mapMatrixToTiles(boardData)}
        </BoardWrapper>
    );
}

