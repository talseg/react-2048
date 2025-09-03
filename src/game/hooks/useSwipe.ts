import { useState } from "react";
import type { Direction } from "../logic/boardLogic";

const SWIPE_DISTANCE = 30;

interface UseSwipeProps {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void
}

export const useSwipe = (onSwipe: (direction: Direction) => undefined): UseSwipeProps => {

    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);

    const handleTouchEnd = (e: React.TouchEvent) => {
        const deltaX = e.changedTouches[0].screenX - touchStartX;
        const deltaY = e.changedTouches[0].screenY - touchStartY;

        const swipeLengthX = Math.abs(deltaX);
        const swipeLengthY = Math.abs(deltaY);

        // X swipe
        if (swipeLengthX > swipeLengthY) {
            if (swipeLengthX > SWIPE_DISTANCE) {
                if (deltaX < 0) onSwipe("left");
                else if (deltaX > 0) onSwipe("right");
            }
        }
        // Y Swipe
        else {
            if (swipeLengthY > SWIPE_DISTANCE) {
                if (deltaY < 0) onSwipe("up");
                else if (deltaY > 0) onSwipe("down");
            }
        }
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.changedTouches[0].screenX);
        setTouchStartY(e.changedTouches[0].screenY);
    }

    return { onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd }
} 