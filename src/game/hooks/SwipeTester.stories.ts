import type { Meta, StoryObj } from '@storybook/react-vite';
import { SwipeTester } from './SwipeTester';
import { fn } from 'storybook/internal/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'SwipeTester',
  component: SwipeTester,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args

} satisfies Meta<typeof SwipeTester>;


export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TouchTesterElement: Story = {
  args: {
    onTouchStart: () => {

      console.log("Touch Tester onTouchStart calling fn");
      fn();
    },
    onTouchEnd: () => {
      console.log("Touch Tester onTouchEnd calling fn ");
      fn();
    }
  }
};
