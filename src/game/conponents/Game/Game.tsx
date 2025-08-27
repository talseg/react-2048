import { useEffect, useState } from "react";
import { Board } from "../board/Board";
import { getNewMatrixByDirection } from "../../logic/boardLogic";


export const Game: React.FC = () => {

    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [boardData, setBoardData] = useState(
        [
            [2, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            let newBoardData: number[][];

            switch (event.key) {
                case 'ArrowLeft':
                    newBoardData = getNewMatrixByDirection(boardData, "left");
                    setBoardData(newBoardData);
                    break;
                case 'ArrowRight':
                    newBoardData = getNewMatrixByDirection(boardData, "right");
                    setBoardData(newBoardData);
                    break;
                case 'ArrowUp':
                    newBoardData = getNewMatrixByDirection(boardData, "up");
                    setBoardData(newBoardData);
                    break;
                case 'ArrowDown':
                    newBoardData = getNewMatrixByDirection(boardData, "down");
                    setBoardData(newBoardData);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [boardData]);

    const handleTouchEnd = (e: React.TouchEvent) => {
        const currentX = e.changedTouches[0].screenX;
        const currentY = e.changedTouches[0].screenY;
        const deltaX = currentX - touchStartX;
        const deltaY = currentY - touchStartY;

        const swipeLengthX = Math.abs(deltaX);
        const swipeLengthY = Math.abs(deltaY);

        let newBoardData: number[][];

        if (swipeLengthX > swipeLengthY) {
            // There was an X swipe
            if (swipeLengthX > 50) {

                if (deltaX < 0) // swipe left
                {
                    newBoardData = getNewMatrixByDirection(boardData, "left");
                    setBoardData(newBoardData);
                }
                else if (deltaX > 0) {    // swipe right
                    newBoardData = getNewMatrixByDirection(boardData, "right");
                    setBoardData(newBoardData);
                }
            }
        }
        else {
            // There was a Y swipe
            if (swipeLengthY > 50) {

                if (deltaY < 0)
                {
                    newBoardData = getNewMatrixByDirection(boardData, "up");
                    setBoardData(newBoardData);
                }
                else if (deltaY > 0) { 
                    newBoardData = getNewMatrixByDirection(boardData, "down");
                    setBoardData(newBoardData);
                }
            }
        }

    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.changedTouches[0].screenX);
        setTouchStartY(e.changedTouches[0].screenY);
    }

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>
            <Board boardData={boardData}
            />
        </div>
    );
}