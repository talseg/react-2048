import { type PropsWithChildren } from "react";
import { styled } from "styled-components";


interface SmallButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const SmallButtonStyled = styled.button`
  border: none;                  /* remove browser default border */
  outline: none;                 /* remove default focus outline */
  cursor: pointer;               /* show pointer cursor */
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,0.3);
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: black;
  padding: 4px;
  &:focus {
    outline: none;
  }
`;


export const SmallButton: React.FC<PropsWithChildren<SmallButtonProps>> = ({ children, onClick, className }) => {
    return (
        <SmallButtonStyled onClick={onClick} className={"small-button" + className}>
            {children}
        </SmallButtonStyled>
    );
};