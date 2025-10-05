import type { Meta, StoryObj } from '@storybook/react-vite';
import { OPEN_MENU_ANIMATION_TIME, SettingsMenuBody } from './SettingsMenu';
import { styled } from 'styled-components';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 240px;
  height: 200px;
  background-color: blue;
  position: relative;
  display: flex;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    gap: 20px;
`;

const SettingsMenuTester = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allow4, setAllow4] = useState(false);
  const [classicMode, setclassicMode] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <Wrapper>

      <ContentWrapper>
        <button style={{
          gridRow: 1,
          gridColumn: 1,
          width: "100px",
          height: "20px"
        }}
          onClick={() => {
            setIsMenuVisible(true);
            setTimeout(
              () => setIsMenuOpen(value => !value), 0);
          }}
        >open menu</button>

        <div style={{ color: "white" }}>{`Allow4: ${allow4}`}</div>

        <div style={{ color: "white" }}>{`Classic Mode: ${classicMode}`}</div>

      </ContentWrapper>

      {isMenuVisible && <SettingsMenuBody
        isOpen={isMenuOpen}
        onIsOpenChanged={
          () => 
          {
            setIsMenuOpen(value => !value);
            setTimeout(() => setIsMenuVisible(false), OPEN_MENU_ANIMATION_TIME+200);
          }
        }

        allow4={allow4}
        onAllow4Changed={value => setAllow4(value)}

        classicMode={classicMode}
        onClassicModeChange={value => setclassicMode(value)}

      ></SettingsMenuBody>}

    </Wrapper>
  );
}


const meta = {
  title: '2048/SettingsMenu',
  component: SettingsMenuTester,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
} satisfies Meta<typeof SettingsMenuTester>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SettingsMenuTesterElement: Story = {
  args: {
  }
};