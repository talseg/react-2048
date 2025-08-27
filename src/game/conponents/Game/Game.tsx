import { useEffect, useState } from "react";
import { Board } from "../board/Board";
import { getNewMatrixByDirection } from "../../logic/boardLogic";
import { styled } from "styled-components";
import FullscreenToggle from "../fullScreenToggle";

const PageWrapper = styled.div`
  min-height: 90vh;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;  
`;

const InfoWrapper = styled.div`
  margin-top: 20px;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
`;

const initialBoardData =  [
            [2, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

const LOCAL_STORAGE_DATA_KEY = "boardData";

export const Game: React.FC = () => {

    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [boardData, setBoardData] = useState<number[][]>([[]]);

    const setData = (data: number[][]) => {
        setBoardData(data);
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
    }

    useEffect(() => {
        const localData = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
        if (localData) {
            setBoardData(JSON.parse(localData));
        }
        else {
            setBoardData(initialBoardData);
        }
    }, [])


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            let newBoardData: number[][];

            switch (event.key) {
                case 'ArrowLeft':
                    newBoardData = getNewMatrixByDirection(boardData, "left");
                    setData(newBoardData);
                    break;
                case 'ArrowRight':
                    newBoardData = getNewMatrixByDirection(boardData, "right");
                    setData(newBoardData);
                    break;
                case 'ArrowUp':
                    newBoardData = getNewMatrixByDirection(boardData, "up");
                    setData(newBoardData);
                    break;
                case 'ArrowDown':
                    newBoardData = getNewMatrixByDirection(boardData, "down");
                    setData(newBoardData);
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
                    setData(newBoardData);
                }
                else if (deltaX > 0) {    // swipe right
                    newBoardData = getNewMatrixByDirection(boardData, "right");
                    setData(newBoardData);
                }
            }
        }
        else {
            // There was a Y swipe
            if (swipeLengthY > 50) {

                if (deltaY < 0) {
                    newBoardData = getNewMatrixByDirection(boardData, "up");
                    setData(newBoardData);
                }
                else if (deltaY > 0) {
                    newBoardData = getNewMatrixByDirection(boardData, "down");
                    setData(newBoardData);
                }
            }
        }
        e.stopPropagation();
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.changedTouches[0].screenX);
        setTouchStartY(e.changedTouches[0].screenY);
        e.stopPropagation();
    }

    return (

        <PageWrapper
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>

            <button style={{ background: "blue", color: "white" }}
                onClick={() => {
                    setData(initialBoardData);
                }}
            >restart</button> 

             <h1 style={{ color: "black" }}>2048</h1>

            <FullscreenToggle/>

            <Board boardData={boardData} />

            <InfoWrapper>
                {"Game by Inbar and Tal Segal"}
            </InfoWrapper>



        </PageWrapper>

    );
}