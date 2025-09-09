import { useState } from "react";
import type { Direction } from "../logic/boardLogic";
import { SWIPE_DISTANCE } from "../utilities/globals";

export interface UseSwipeProps {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
}

export const useSwipe = (onSwipe: (direction: Direction) => undefined): UseSwipeProps => {

    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [isInSwipe, setIsInSwipe] = useState(false);

    const handleSwipeEnd = (direction: Direction) => {
        onSwipe(direction);
        setIsInSwipe(false);
    }

    const handleTouchMove = (e: React.TouchEvent) => {

        if (!isInSwipe) 
            return;

        const deltaX = e.changedTouches[0].screenX - touchStartX;
        const deltaY = e.changedTouches[0].screenY - touchStartY;

        const swipeLengthX = Math.abs(deltaX);
        const swipeLengthY = Math.abs(deltaY);

        // X swipe
        if (swipeLengthX > swipeLengthY) {
            if (swipeLengthX > SWIPE_DISTANCE) {
                if (deltaX < 0) handleSwipeEnd("left");
                else if (deltaX > 0) handleSwipeEnd("right");
            }
        }
        // Y Swipe
        else {
            if (swipeLengthY > SWIPE_DISTANCE) {
                if (deltaY < 0) handleSwipeEnd("up");
                else if (deltaY > 0) handleSwipeEnd("down");
            }
        }
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.changedTouches[0].screenX);
        setTouchStartY(e.changedTouches[0].screenY);
        setIsInSwipe(true);
    }

    return { onTouchStart: handleTouchStart, onTouchMove: handleTouchMove }
} 