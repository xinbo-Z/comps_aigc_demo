import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'General/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary button',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete item',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving changes',
  },
}

export const WithIcon: Story = {
  args: {
    icon: <span>+</span>,
    children: 'Create item',
  },
}
