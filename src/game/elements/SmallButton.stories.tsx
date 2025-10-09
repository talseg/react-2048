

import type { Meta, StoryObj } from '@storybook/react-vite';
import HamburgerIcon from '../../assets/hamburger.svg?react';
import BackIcon from '../../assets/back.svg?react';
import { styled } from 'styled-components';
import { SmallButton } from './SmallButton';
import { IconEnterFS, IconRestart, IconUndo } from '../../assets/Icons';

const ButtonsWrapper = styled.div`
    display: flex;
    align-self: start;
    gap: 20px;
`;

const TransparentButtonTester = () => {
  return (
    <ButtonsWrapper>

      <SmallButton onClick={() => alert("FullScreen click")}>
        <IconEnterFS />
      </SmallButton>

      <SmallButton onClick={() => alert("Undo click")}>
        <IconUndo />
      </SmallButton>

      <SmallButton onClick={() => alert("Restart click")}>
        <IconRestart />
      </SmallButton>

      <SmallButton onClick={() => alert("Hanburger click")}>
        <HamburgerIcon />
      </SmallButton>

      <SmallButton onClick={() => alert("Hanburger click")}>
        <BackIcon />
      </SmallButton>

    </ButtonsWrapper>
  );
}

const meta = {
  title: '2048/SmallButton',
  component: TransparentButtonTester,
} satisfies Meta<typeof TransparentButtonTester>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallButtonElement: Story = {};