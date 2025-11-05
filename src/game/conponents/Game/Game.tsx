import React from "react";
import { useGame } from "./useGame";
import { Board } from "../board/Board";
import { styled } from "styled-components";
import FullscreenToggleButton from "../FullScreenToggleButton";
import { SmallButton } from "../../elements/SmallButton";
import { IconRestart, IconUndo } from "../../../assets/Icons";
import { isOnIOS } from "../../utilities/utilities";
import { SettingsMenu } from "../settings/SettingsMenu";
import HamburgerIcon from '../../../assets//hamburger.svg?react';
import ThumbUpIcon from '../../../assets//1F44D.svg?react';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: #d9d9d9;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    touch-action: none;
    gap: 20px;
`;

const InfoWrapper = styled.div`
    margin-top: 20px;
    color: #000000;
    font-size: 20px;
    font-weight: bold;
    max-width: 260px;
`;

// ToDo - create a checkbox styled component
export const CheckboxStyled = styled.input`
    width: 38px;
    height: 38px;
    accent-color: #636363;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    align-self: start;
    gap: 20px;
    width: 93vw;
    margin:14px 0px 0px 14px;
    max-height: 36px;
`;

const StyledThumUpWrapper = styled(ThumbUpIcon)`
    margin-top: 2px;
`;

const HeaderStyled = styled.div`
    color: black;
    font-size: 36px;
    margin-bottom: 10px;
    font-weight: 500;
`;

const HanburgerButtonStyled = styled(SmallButton)`
  margin-left: auto;  
`;

export const Game: React.FC = () => {

    const {
        boardData, onTouchStart, onTouchMove, onRestart, handleUndo,
        onMenuClick, handleTileClick, handleTileDoubleClick,
        animationPlan, onAnimationPlanEnded, 
        gameVersion, isMenuOpen,
        onMenuOpenChange, showBoardPerfect
    } = useGame();

    return (
        <PageWrapper
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}>

            <ButtonsWrapper>

                {!isOnIOS() && <FullscreenToggleButton />}

                <SmallButton onClick={onRestart}>
                    <IconRestart />
                </SmallButton>

                <SmallButton onClick={handleUndo}>
                    <IconUndo />
                </SmallButton>

                {showBoardPerfect && <StyledThumUpWrapper />}

                <HanburgerButtonStyled onClick={onMenuClick}>
                    <HamburgerIcon />
                </HanburgerButtonStyled>

            </ButtonsWrapper>

            <HeaderStyled>2048 to 65k</HeaderStyled>

            <Board boardData={boardData}
                onTileClick={handleTileClick}
                onTileDoubleClick={handleTileDoubleClick}
                onAnimationPlanEnded={onAnimationPlanEnded}
                animationPlan={animationPlan}
            />

            <InfoWrapper>
                {`Game by Inbar and Tal Segal version: ${gameVersion}`}
            </InfoWrapper>

            <SettingsMenu
                isOpen={isMenuOpen}
                onIsOpenChanged={onMenuOpenChange}
            ></SettingsMenu>

        </PageWrapper>
    );
}


