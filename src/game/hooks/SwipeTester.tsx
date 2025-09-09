import { styled } from "styled-components";
import { useSwipe } from "./useSwipe";
import type { Direction } from "../logic/boardLogic";


const SwipeAreaStyled = styled.div`
    width: 300px;
    height: 300px;
    background-color: #795a78;
`;

export const SwipeTester: React.FC = ( ) => {

    const onSwipe = (direction: Direction): undefined => { 
        console.log("swipe hook: onSwipe was called with", direction)
    };

    const { onTouchStart, onTouchEnd, onTouchMove } = useSwipe(onSwipe);

    return (
        <SwipeAreaStyled 
            onTouchStart={onTouchStart} 
            onTouchEnd={onTouchEnd} 
            onTouchMove={onTouchMove}  
        />
    );
}