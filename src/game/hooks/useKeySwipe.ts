import { useEffect } from "react";
import type { Direction } from "../logic/boardLogic";

const getDirection = (eventString: string): Direction => {
    switch (eventString) {
        case 'ArrowLeft': return "left";
        case 'ArrowRight': return "right";
        case 'ArrowUp': return "up";
        case 'ArrowDown': return "down";
    }
    return "left";
}

export const useKeySwipe = (onSwipe: (direction: Direction) => undefined) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            onSwipe(getDirection(event.key));
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onSwipe]);
} 