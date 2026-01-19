import type { Meta, StoryObj } from '@storybook/react'
import { SegmentControl, Button } from '@turbo-project/front-core-design'
import { useState, type ComponentProps } from 'react'

const meta = {
  title: 'Components/SegmentControl',
  component: SegmentControl.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentControl.Root>

export default meta
type StoryProps = Omit<ComponentProps<typeof SegmentControl.Root>, 'children'>
type Story = StoryObj<StoryProps>

// Uncontrolled
export const Uncontrolled: Story = {
  args: {
    defaultValue: 'menu1',
  },
  render: (args: StoryProps) => (
    <SegmentControl.Root {...args}>
      <SegmentControl.Item value="menu1">Menu 1</SegmentControl.Item>
      <SegmentControl.Item value="menu2">Menu 2</SegmentControl.Item>
    </SegmentControl.Root>
  ),
}

// Small Size
export const Small: Story = {
  args: {
    size: 'sm',
    defaultValue: 'menu1',
  },
  render: args => (
    <SegmentControl.Root {...args}>
      <SegmentControl.Item value="menu1">Menu 1</SegmentControl.Item>
      <SegmentControl.Item value="menu2">Menu 2</SegmentControl.Item>
    </SegmentControl.Root>
  ),
}

// Large Size
export const Large: Story = {
  args: {
    size: 'lg',
    defaultValue: 'menu1',
  },
  render: args => (
    <SegmentControl.Root {...args}>
      <SegmentControl.Item value="menu1">Menu 1</SegmentControl.Item>
      <SegmentControl.Item value="menu2">Menu 2</SegmentControl.Item>
    </SegmentControl.Root>
  ),
}

// Multiple Items
export const MultipleItems: Story = {
  args: {
    defaultValue: 'tab1',
  },
  render: args => (
    <SegmentControl.Root {...args}>
      <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
      <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
      <SegmentControl.Item value="tab3">Tab 3</SegmentControl.Item>
      <SegmentControl.Item value="tab4">Tab 4</SegmentControl.Item>
    </SegmentControl.Root>
  ),
}

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Small (24px)</p>
        <SegmentControl.Root size="sm" defaultValue="menu1">
          <SegmentControl.Item value="menu1">Menu 1</SegmentControl.Item>
          <SegmentControl.Item value="menu2">Menu 2</SegmentControl.Item>
        </SegmentControl.Root>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>
          Medium (34px) - Default
        </p>
        <SegmentControl.Root size="default" defaultValue="menu1">
          <SegmentControl.Item value="menu1">Menu 1</SegmentControl.Item>
          <SegmentControl.Item value="menu2">Menu 2</SegmentControl.Item>
        </SegmentControl.Root>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Large (44px)</p>
        <SegmentControl.Root size="lg" defaultValue="menu1">
          <SegmentControl.Item value="menu1">Menu 1</SegmentControl.Item>
          <SegmentControl.Item value="menu2">Menu 2</SegmentControl.Item>
        </SegmentControl.Root>
      </div>
    </div>
  ),
}

// Controlled
export const Controlled: Story = {
  render: function ControlledSegment() {
    const [selected, setSelected] = useState('menu1')

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <SegmentControl.Root value={selected} onValueChange={setSelected}>
          <SegmentControl.Item value="menu1">Menu 1</SegmentControl.Item>
          <SegmentControl.Item value="menu2">Menu 2</SegmentControl.Item>
          <SegmentControl.Item value="menu3">Menu 3</SegmentControl.Item>
        </SegmentControl.Root>
        <p style={{ fontSize: '14px', color: '#3d3d3d' }}>
          선택된 값: <strong>{selected}</strong>
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => setSelected('menu1')} variant="outline" size="sm">
            Menu 1
          </Button>
          <Button onClick={() => setSelected('menu2')} variant="outline" size="sm">
            Menu 2
          </Button>
          <Button onClick={() => setSelected('menu3')} variant="outline" size="sm">
            Menu 3
          </Button>
        </div>
      </div>
    )
  },
}

// Mode Switching
export const ModeSwitching: Story = {
  render: function ModeSwitchingStory() {
    const [isControlled, setIsControlled] = useState(true)
    const [value, setValue] = useState('menu1')

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <label style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={isControlled}
              onChange={e => setIsControlled(e.target.checked)}
            />
            Controlled Mode
          </label>
        </div>

        <SegmentControl.Root
          value={isControlled ? value : undefined}
          defaultValue="menu1"
          onValueChange={(val: string) => {
            console.log('onValueChange', val)
            setValue(val)
          }}
        >
          <SegmentControl.Item value="menu1">Menu 1</SegmentControl.Item>
          <SegmentControl.Item value="menu2">Menu 2</SegmentControl.Item>
          <SegmentControl.Item value="menu3">Menu 3</SegmentControl.Item>
        </SegmentControl.Root>

        <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
          <p>Current Value: {value}</p>
          <p>
            {isControlled
              ? '부모 컴포넌트가 상태를 제어합니다.'
              : '컴포넌트가 내부적으로 상태를 관리합니다.'}
          </p>
        </div>
      </div>
    )
  },
}

// With Icons (using emoji as placeholder)
export const WithIcons: Story = {
  args: {
    defaultValue: 'grid',
  },
  render: args => (
    <SegmentControl.Root {...args}>
      <SegmentControl.Item value="grid">
        <span style={{ fontSize: '14px' }}>⊞</span>
      </SegmentControl.Item>
      <SegmentControl.Item value="list">
        <span style={{ fontSize: '14px' }}>☰</span>
      </SegmentControl.Item>
    </SegmentControl.Root>
  ),
}

// Long Labels
export const LongLabels: Story = {
  args: {
    defaultValue: 'option1',
    size: 'lg',
  },
  render: args => (
    <SegmentControl.Root {...args}>
      <SegmentControl.Item value="option1">첫 번째 옵션</SegmentControl.Item>
      <SegmentControl.Item value="option2">두 번째 옵션</SegmentControl.Item>
      <SegmentControl.Item value="option3">세 번째 옵션</SegmentControl.Item>
    </SegmentControl.Root>
  ),
}
