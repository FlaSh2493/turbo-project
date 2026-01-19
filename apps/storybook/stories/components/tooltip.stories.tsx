import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipProps } from '@turbo-project/front-core-design'
import { Button } from '@turbo-project/front-core-design'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<TooltipProps>

// Basic Stories
export const Default: Story = {
  args: {
    content: 'Default Tooltip',
    children: <Button variant="outline">Hover me</Button>,
  },
}

export const ClickTrigger: Story = {
  args: {
    mode: 'click',
    content: 'Click Trigger Tooltip',
    showClose: true,
    children: <Button variant="outline">Click me</Button>,
  },
}

// Size Stories
export const Small: Story = {
  args: {
    size: 'sm',
    content: 'Small Size Tooltip',
    children: <Button variant="outline">Small</Button>,
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    content: 'Medium Size Tooltip',
    children: <Button variant="outline">Medium</Button>,
  },
}

// Position Stories
export const TopStart: Story = {
  args: {
    contentProps: { side: 'top', align: 'start' },
    content: 'Top Start Tooltip',
    children: <Button variant="outline">Top Start</Button>,
  },
}

export const BottomEnd: Story = {
  args: {
    contentProps: { side: 'bottom', align: 'end' },
    content: 'Bottom End Tooltip',
    children: <Button variant="outline">Bottom End</Button>,
  },
}

export const WithoutArrow: Story = {
  args: {
    showArrow: false,
    content: 'Without Arrow Tooltip',
    children: <Button variant="outline">No Arrow</Button>,
  },
}

// All Positions Grid
export const AllPositions: Story = {
  render: () => {
    const sides = ['top', 'bottom', 'left', 'right'] as const
    const aligns = ['start', 'center', 'end'] as const

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
          padding: '60px',
        }}
      >
        {sides.map(side =>
          aligns.map(align => (
            <Tooltip
              key={`${side}-${align}`}
              content={`${side} ${align}`}
              size="md"
              contentProps={{ side, align }}
            >
              <Button variant="outline" style={{ width: '100%' }}>
                {side} {align}
              </Button>
            </Tooltip>
          )),
        )}
      </div>
    )
  },
}
