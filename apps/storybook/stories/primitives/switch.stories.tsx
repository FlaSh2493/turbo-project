import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@turbo-project/front-core-design'
import { useState } from 'react'

const meta = {
  title: 'Primitives/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

// Default (Off)
export const Default: Story = {
  args: {
    defaultChecked: false,
  },
}

// Checked (On)
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

// Disabled Off
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
}

// Disabled On
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

// All States
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch defaultChecked={true} />
        <span>On (Default)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch defaultChecked={false} />
        <span>Off (Default)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch defaultChecked={true} disabled />
        <span>On (Disabled)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch defaultChecked={false} disabled />
        <span>Off (Disabled)</span>
      </div>
    </div>
  ),
}

// Controlled Example
export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [checked, setChecked] = useState(false)

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Switch checked={checked} onCheckedChange={setChecked} />
        <span>상태: {checked ? 'On' : 'Off'}</span>
        <button
          onClick={() => setChecked(!checked)}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
        >
          Toggle
        </button>
      </div>
    )
  },
}

// With Label
export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" style={{ cursor: 'pointer', userSelect: 'none' }}>
        비행기 모드
      </label>
    </div>
  ),
}
