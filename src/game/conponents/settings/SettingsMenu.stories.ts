import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsMenu } from './SettingsMenu';

const meta = {
  title: '2048/SettingsMenu',
  component: SettingsMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof SettingsMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SettingsMenuElement: Story = {
  args: {
  }
};