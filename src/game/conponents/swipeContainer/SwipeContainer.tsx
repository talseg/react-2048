import { useCallback, useEffect, useRef, useState, type PropsWithChildren } from "react";
import type { Direction } from "../../logic/boardLogic";
import { styled } from "styled-components";


interface SwipeContainerProps {
    onSwipe: (direction: Direction) => undefined;
}

const Wrapper = styled.div`
    background-color: #eeeeee;
    padding: 30px;
`;

// This handles the swipe correctly, but also disables clicking on all the screeen
export const SwipeContainer: React.FC<PropsWithChildren<SwipeContainerProps>> = ({ onSwipe, children }) => {

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);

    const handleTouchStart = useCallback((e: TouchEvent) => {

        if (!wrapperRef.current?.contains(e.target as Node)) {
            return;
        }

        console.log("handleTouchStart");

        e.preventDefault();

        setTouchStartX(e.changedTouches[0].clientX);
        setTouchStartY(e.changedTouches[0].clientY);

    }, []);

    const handleTouchEnd = useCallback((e: TouchEvent) => {
        if (!wrapperRef.current?.contains(e.target as Node)) {
            return;
        }
        e.preventDefault();

        const currentX = e.changedTouches[0].clientX;
        const currentY = e.changedTouches[0].clientY;
        const deltaX = currentX - touchStartX;
        const deltaY = currentY - touchStartY;

        const swipeLengthX = Math.abs(deltaX);
        const swipeLengthY = Math.abs(deltaY);

        if (swipeLengthX > swipeLengthY) {
            if (swipeLengthX > 50) {

                if (deltaX < 0) // swipe left
                {
                    onSwipe("left");
                }
                else if (deltaX > 0) {    // swipe right
                    onSwipe("right");
                }
            }
        }
        else {
            // There was a Y swipe
            if (swipeLengthY > 50) {

                if (deltaY < 0) {
                    onSwipe("up");
                }
                else if (deltaY > 0) {
                    onSwipe("down");
                }
            }
        }
    }, [onSwipe, touchStartX, touchStartY]);



    useEffect(() => {
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: false });

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchEnd]);

    return (
        <Wrapper ref={wrapperRef}>
            {children}
        </Wrapper>
    )

}


