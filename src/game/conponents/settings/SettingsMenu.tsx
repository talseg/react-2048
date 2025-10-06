import { styled } from "styled-components";
import { CheckboxStyled } from "../Game/Game";
import { useEffect, useState } from "react";

export interface SettingsMenuProps {
    isOpen: boolean;
    onIsOpenChanged: () => void;
    allow4: boolean;
    onAllow4Changed: (allow: boolean) => void;
    classicMode: boolean;
    onClassicModeChange: (isClassic: boolean) => void;
}

export const OPEN_MENU_ANIMATION_TIME = 600; // ms

const MenuWrapper = styled.div<{ open: boolean }>`
    background-color: #baada1;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    transform: translateX(${({ open }) => (open ? '0%' : '100%')});
    transition: transform ${OPEN_MENU_ANIMATION_TIME}ms cubic-bezier(.2,.9,.3,1);
    will-change: transform;
`;

const ItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`;

export const CheckboxWrapper = styled.div`
    display: flex; 
    align-items: center;
    gap: 10px;
`;

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
    isOpen, onIsOpenChanged,
    allow4, onAllow4Changed,
    classicMode, onClassicModeChange
}) => {

    // Keeps the element mounted while closing animation runs
    const [present, setPresent] = useState(isOpen);
    // Drives the CSS transform state
    const [animOpen, setAnimOpen] = useState(false);

    useEffect(() => {

        if (isOpen) {
            setPresent(true);
            setTimeout(() => setAnimOpen(true), 10);
        } else {
            if (!isOpen) {
                setAnimOpen(false);
            }
        }
    }, [isOpen]);

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
        if (!isOpen)
            setPresent(false);
    };

    if (!present) return null;

    return (
        <MenuWrapper open={animOpen} onTransitionEnd={handleTransitionEnd} role="dialog" aria-modal="true">
            <ItemsWrapper>
                <button
                    style={{ width: "70px" }}
                    onClick={onIsOpenChanged}>
                    close
                </button>

                <CheckboxWrapper>
                    <CheckboxStyled type="checkbox"
                        checked={allow4}
                        onChange={() => onAllow4Changed(!allow4)}>
                    </CheckboxStyled>
                    <div>Allow 4</div>
                </CheckboxWrapper>

                <CheckboxWrapper>
                    <CheckboxStyled type="checkbox"
                        checked={classicMode}
                        onChange={() => onClassicModeChange(!classicMode)}>
                    </CheckboxStyled>
                    <div>Classic Mode</div>
                </CheckboxWrapper>
            </ItemsWrapper>
        </MenuWrapper>
    );
};
