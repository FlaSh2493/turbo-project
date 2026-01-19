import type { Meta, StoryObj } from '@storybook/react'
import {
  RoundBadge,
  RoundBadgeRoot,
  RoundBadgeDot,
  RoundBadgeContent,
} from '@turbo-project/front-core-design'

const meta = {
  title: 'Primitives/RoundBadge',
  component: RoundBadgeRoot,
  tags: ['autodocs'],
  subcomponents: {
    'RoundBadge.Root': RoundBadgeRoot,
    'RoundBadge.Dot': RoundBadgeDot,
    'RoundBadge.Content': RoundBadgeContent,
  },
} satisfies Meta<typeof RoundBadgeRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <RoundBadge.Root {...args}>
      <RoundBadge.Content>Round Badge</RoundBadge.Content>
    </RoundBadge.Root>
  ),
}

export const WithDot: Story = {
  render: args => (
    <RoundBadge.Root {...args}>
      <RoundBadge.Dot className="bg-red-500" />
      <RoundBadge.Content>Round Badge</RoundBadge.Content>
    </RoundBadge.Root>
  ),
}

export const WithCustomContent: Story = {
  render: args => (
    <RoundBadge.Root {...args}>
      <RoundBadge.Dot className="bg-red-500" />
      <RoundBadge.Content>
        <span>Custom Content </span>
        <span className="text-red-500">Custom Content</span>
      </RoundBadge.Content>
    </RoundBadge.Root>
  ),
}
