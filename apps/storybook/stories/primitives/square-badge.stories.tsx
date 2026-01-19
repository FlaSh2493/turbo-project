import { SquareBadge } from '@turbo-project/front-core-design'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Primitives/SquareBadge',
  component: SquareBadge.Root,
  tags: ['autodocs'],
  subcomponents: {
    'SquareBadge.Content': SquareBadge.Content,
  },
} satisfies Meta<typeof SquareBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <SquareBadge.Root {...args}>
      <SquareBadge.Content>Square Badge</SquareBadge.Content>
    </SquareBadge.Root>
  ),
}

export const WithCustomContent: Story = {
  render: args => (
    <SquareBadge.Root {...args}>
      <SquareBadge.Content>
        <span>Custom Content </span>
        <span className="text-red-500">Custom Content</span>
      </SquareBadge.Content>
    </SquareBadge.Root>
  ),
}
