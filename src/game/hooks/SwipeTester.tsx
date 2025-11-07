import { styled } from "styled-components";
import type { Direction } from "../logic/boardLogic";
import { useSwipe } from "./useSwipe";


const SwipeAreaStyled = styled.div`
    width: 300px;
    height: 300px;
    background-color: #795a78;
`;

export const SwipeTester: React.FC = ( ) => {

    const onSwipe = (direction: Direction): undefined => { 
        console.log("swipe hook: onSwipe was called with", direction)
    };

    const { onTouchStart, onTouchMove } = useSwipe(onSwipe);

    return (
        <SwipeAreaStyled 
            onTouchStart={onTouchStart} 
            onTouchMove={onTouchMove}
        />
    );
}