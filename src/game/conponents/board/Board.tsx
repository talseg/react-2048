import styled from 'styled-components';
import { Tile, TILE_SIZE } from '../tile/Tile';

// TILE_SIZE is taken from the the Tile component
const GRID_SIZE = 4;
const TILE_MARGIN = 7;

const SURFACE_SIZE = GRID_SIZE * TILE_SIZE + (GRID_SIZE - 1) * TILE_MARGIN;

const BoardWrapper = styled.div`
    position: relative;
    background-color: #bbada0;
    width: ${SURFACE_SIZE}px;
    height: ${SURFACE_SIZE}px;
    padding: ${TILE_MARGIN}px;
    border-radius: 10px;
`

const TileWrapper = styled.div<{ x: number; y: number }>`
    position: absolute;
    //transition: transform 300ms ease;
    transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};
`;

const StaticTileWrapper = styled.div<{ x: number; y: number }>`
    position: absolute;
    /* transition: transform 1500ms ease; */
    transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};
`;

const mapMatrixToTiles = (matrix: number[][], onTileClick?: (row: number, column: number) => undefined): 
    React.ReactElement[] => {
    const tiles: React.ReactElement[] = [];
    let key = 0;

    // Add empty tiles
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const value = 0;

            if (true) {
                const x = col * (TILE_SIZE + TILE_MARGIN);
                const y = row * (TILE_SIZE + TILE_MARGIN);

                tiles.push(
                    <StaticTileWrapper key={`zero-${key++}`} x={x} y={y}>
                        <Tile value={value} onClick={() => onTileClick?.(row, col)}/>
                    </StaticTileWrapper>
                );
            }
        }
    }

    // Add real tiles
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const value = matrix[row][col];

            if (value != 0) {
                const x = col * (TILE_SIZE + TILE_MARGIN);
                const y = row * (TILE_SIZE + TILE_MARGIN);

                tiles.push(
                    <TileWrapper key={key++} x={x} y={y}>
                        <Tile value={value} onClick={() => onTileClick?.(row, col)}/>
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
}

export const Board: React.FC<BoardProps> = ({ boardData, onTileClick }) => {
    return (
        <BoardWrapper>
            {mapMatrixToTiles(boardData, onTileClick)}
        </BoardWrapper>
    );
}

