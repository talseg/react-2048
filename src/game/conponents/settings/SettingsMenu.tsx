import { styled } from "styled-components";
import { CheckboxStyled } from "../Game/Game";

export interface SettingsMenuProps {
    isOpen: boolean;
    onIsOpenClick: () => void;
    allow4: boolean;
    onAllow4Changed: (allow: boolean) => void;
    classicMode: boolean;
    onClassicModeChange: (isClassic: boolean) => void;
}

const OPEN_MENU_ANIMATION_TIME = 600;

const MenuWrapper = styled.div<{ open: boolean }>`
    background-color: red;
    position: absolute;
    height: 100%;
    width: 100%;
    transform: translateX(${({ open }) => (open ? '0%' : '100%')});
    transition: transform ${OPEN_MENU_ANIMATION_TIME}ms cubic-bezier(.2,.9,.3,1);
`
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
    isOpen, onIsOpenClick: onIsOpenCHanged,
    allow4, onAllow4Changed,
    classicMode, onClassicModeChange
}) => {

    return (
        <MenuWrapper open={isOpen}>

            <ItemsWrapper>
                <button
                    style={{ width: "70px" }}
                    onClick={onIsOpenCHanged}>
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