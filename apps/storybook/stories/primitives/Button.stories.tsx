import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@turbo-project/front-core-design'

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'link'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: '버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    asChild: {
      control: 'boolean',
      description: '자식 요소로 렌더링',
    },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Variant Stories
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
}

// Size Stories
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🔥',
  },
}

export const IconSmall: Story = {
  args: {
    size: 'icon-sm',
    children: '🔥',
  },
}

export const IconLarge: Story = {
  args: {
    size: 'icon-lg',
    children: '🔥',
  },
}

// State Stories
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-sm">🔥</Button>
      <Button size="icon">🔥</Button>
      <Button size="icon-lg">🔥</Button>
    </div>
  ),
}
