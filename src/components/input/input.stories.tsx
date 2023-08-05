import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import type { Meta, StoryObj } from '@storybook/react';
import Button, { Input } from './input';
const meta: Meta<typeof Button> = {
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    value: '',
    placeholder: 'Email',
    startAdornment: <MenuIcon />,
    endAdornment: <SearchIcon />
  }
};
