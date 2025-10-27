import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsMenu } from './SettingsMenu';
import { styled } from 'styled-components';
import { useState } from 'react';
import { SettingsProvider } from './SettingsContext';

const Wrapper = styled.div`
  width: 340px;
  height: 400px;
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
  // const [allow4, setAllow4] = useState(false);
  // const [allowTileChange, setAllowTileChange] = useState(false);
  //const { allow4, allowTileChange } = useSettings();
  
  return (
    <SettingsProvider>
      
    
    <Wrapper>
      <ContentWrapper>
        <button style={{
          gridRow: 1,
          gridColumn: 1,
          width: "100px",
          height: "20px"
        }}
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >open menu</button>

        {/* <div style={{ color: "white" }}>{`Allow4: ${allow4}`}</div> */}

        {/* <div style={{ color: "white" }}>{`Allow tile change: ${allowTileChange}`}</div> */}

      </ContentWrapper>

      <SettingsMenu
        isOpen={isMenuOpen}
        onIsOpenChanged={
          () => 
          {
            setIsMenuOpen(value => !value);
          }
        }

        // allow4={allow4}
        // onAllow4Changed={() => setAllow4(value => !value)}

        // allowTileChange={allowTileChange}
        // onAllowTileChangeChange={() => setAllowTileChange(value => !value)}
        

      ></SettingsMenu>

    </Wrapper>

    </SettingsProvider>
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