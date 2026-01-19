import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '@turbo-project/front-core-design'
import { useState, useEffect } from 'react'

const meta = {
  title: 'Primitives/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: 50,
    max: 100,
    size: 'default',
    showValue: false,
    skeleton: false,
  },
  decorators: [
    Story => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  args: {
    value: 50,
  },
}

// With Value Display
export const WithValue: Story = {
  args: {
    value: 50,
    showValue: true,
  },
}

// Different Values
export const DifferentValues: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>1%</p>
        <Progress value={1} showValue />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>10%</p>
        <Progress value={10} showValue />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>50%</p>
        <Progress value={50} showValue />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>100%</p>
        <Progress value={100} showValue />
      </div>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>Small (sm)</p>
        <Progress value={60} size="sm" showValue />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>Default</p>
        <Progress value={60} size="default" showValue />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>Large (lg)</p>
        <Progress value={60} size="lg" showValue />
      </div>
    </div>
  ),
}

// Skeleton Loading
export const Skeleton: Story = {
  args: {
    skeleton: true,
  },
}

// Skeleton Sizes
export const SkeletonSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>Small (sm)</p>
        <Progress skeleton size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>Default</p>
        <Progress skeleton size="default" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>Large (lg)</p>
        <Progress skeleton size="lg" />
      </div>
    </div>
  ),
}

// Animated Progress
export const Animated: Story = {
  render: function AnimatedProgress() {
    const [value, setValue] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setValue(prev => {
          if (prev >= 100) return 0
          return prev + 1
        })
      }, 50)

      return () => clearInterval(interval)
    }, [])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Progress value={value} showValue />
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#777' }}>
          스무스하게 애니메이션되는 Progress Bar
        </p>
      </div>
    )
  },
}

// Interactive Demo
export const Interactive: Story = {
  render: function InteractiveProgress() {
    const [value, setValue] = useState(30)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Progress value={value} showValue />
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button
            onClick={() => setValue(Math.max(0, value - 10))}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              cursor: 'pointer',
              background: '#fff',
            }}
          >
            -10%
          </button>
          <button
            onClick={() => setValue(Math.min(100, value + 10))}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              cursor: 'pointer',
              background: '#fff',
            }}
          >
            +10%
          </button>
          <button
            onClick={() => setValue(0)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              cursor: 'pointer',
              background: '#fff',
            }}
          >
            Reset
          </button>
        </div>
      </div>
    )
  },
}

// With Label (Figma Design)
export const WithLabel: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '20px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#777' }}>Progress bar label</span>
        <Progress value={1} showValue />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#777' }}>Progress bar label</span>
        <Progress value={10} showValue />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#777' }}>Progress bar label</span>
        <Progress value={50} showValue />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#777' }}>Progress bar label</span>
        <Progress value={100} showValue />
      </div>
    </div>
  ),
}

// Custom Max Value
export const CustomMax: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>50 / 200 (25%)</p>
        <Progress value={50} max={200} showValue />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#777' }}>75 / 150 (50%)</p>
        <Progress value={75} max={150} showValue />
      </div>
    </div>
  ),
}
