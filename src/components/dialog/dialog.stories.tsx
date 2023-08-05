import type { Meta, StoryObj } from '@storybook/react';

import Dialog from './dialog';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {};
