import { useCallback, useRef } from "react";
import type { Direction } from "../logic/boardLogic";
import { SWIPE_DISTANCE } from "../utilities/globals";

export interface UseSwipeProps {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
}

export const useRefSwipe = (onSwipe: (direction: Direction) => undefined): UseSwipeProps => {

    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const isInSwipe = useRef(false);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {

        const handleSwipeEnd = (direction: Direction) => {
            onSwipe(direction);
            isInSwipe.current = false;
        }

        if (!isInSwipe.current) 
            return;

        const deltaX = e.touches[0].screenX - touchStartX.current;
        const deltaY = e.touches[0].screenY - touchStartY.current;

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
    }, [onSwipe]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].screenX;
        touchStartY.current = e.touches[0].screenY;
        isInSwipe.current = true;
    }

    return { onTouchStart: handleTouchStart, onTouchMove: handleTouchMove }
} 