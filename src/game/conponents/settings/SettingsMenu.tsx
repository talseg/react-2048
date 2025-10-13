import { keyframes, styled } from "styled-components";
import { CheckboxStyled } from "../Game/Game";
import { useEffect, useState } from "react";
import { SmallButton } from "../../elements/SmallButton";
import BackIcon from '../../../assets/back.svg?react';
export const OPEN_MENU_ANIMATION_TIME = 300; // ms

const closeAnimation = keyframes`
    0%   { transform: translateX(0%); }
    100% { transform: translateX(100%); }
`;

const openAnimation = keyframes`
    0%   { transform: translateX(100%); }
    100% { transform: translateX(0%); }
`;

const MenuWrapper = styled.div<{ open: boolean }>`
    background-color: #baada1;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    animation: ${({ open }) => (open ? openAnimation : closeAnimation)} 
        ${OPEN_MENU_ANIMATION_TIME}ms forwards;
`;

const ItemsWrapper = styled.div`
    display: grid;
    gap: 10px;
    padding: 10px;
`;

export const CheckboxWrapper = styled.div`
    display: flex; 
    align-items: center;
    gap: 10px;
`;

export interface SettingsMenuProps {
    isOpen: boolean;
    onIsOpenChanged: () => void;
    allow4: boolean;
    onAllow4Changed: () => void;
    classicMode: boolean;
    onClassicModeChange: () => void;
    // Allow changing the tiles by clicking them
    allowTileChange: boolean;
    onAllowTileChangeChange: () => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
    isOpen, onIsOpenChanged,
    allow4, onAllow4Changed,
    classicMode, onClassicModeChange,
    allowTileChange, onAllowTileChangeChange
}) => {

    // Keeps the element mounted while closing animation runs
    const [present, setPresent] = useState(isOpen);
    // Drives the CSS transform state
    const [animOpen, setAnimOpen] = useState(false);

    useEffect(() => {
        setAnimOpen(isOpen);
        if (isOpen) setPresent(true);
    }, [isOpen]);

    if (!present) return null;

    return (
        <MenuWrapper open={animOpen}
            onAnimationEnd={() => { if (!isOpen) setPresent(false) }}
            role="dialog" aria-modal="true">
            <ItemsWrapper>

                <SmallButton onClick={onIsOpenChanged}
                    style={{ justifySelf: "end" }}>
                    <BackIcon/>
                </SmallButton>

                <CheckboxWrapper>
                    <CheckboxStyled type="checkbox"
                        checked={allow4}
                        onChange={onAllow4Changed}>
                    </CheckboxStyled>
                    <div>Allow 4</div>
                </CheckboxWrapper>

                <CheckboxWrapper>
                    <CheckboxStyled type="checkbox"
                        checked={classicMode}
                        onChange={onClassicModeChange}>
                    </CheckboxStyled>
                    <div>Classic Mode</div>
                </CheckboxWrapper>

                <CheckboxWrapper>
                    <CheckboxStyled type="checkbox"
                        checked={allowTileChange}
                        onChange={onAllowTileChangeChange}>
                    </CheckboxStyled>
                    <div>Allow tile change</div>
                </CheckboxWrapper>

            </ItemsWrapper>
        </MenuWrapper>
    );
};
