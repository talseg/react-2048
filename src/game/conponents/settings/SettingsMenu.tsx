import { styled } from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SettingsMenuProps {

}

const MenuWrapper = styled.div`
    background-color: red;
    width: 100px;
    height: 100px;
`


export const SettingsMenu: React.FC<SettingsMenuProps> = () => {

    return (
        <MenuWrapper></MenuWrapper>
    );
};