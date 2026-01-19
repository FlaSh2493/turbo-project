import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, Radio } from '@turbo-project/front-core-design'
import { useState, type ComponentProps } from 'react'

type RadioGroupProps = ComponentProps<typeof RadioGroup>

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
    mode: 'default',
  },
} as Meta<RadioGroupProps & { mode: 'default' | 'squared' }>

export default meta
type StoryProps = RadioGroupProps & { mode?: 'default' | 'squared' }
type Story = StoryObj<StoryProps>

// Basic
export const Basic: Story = {
  args: {
    mode: 'default',
  },
  render: ({ mode, ...args }) => (
    <RadioGroup defaultValue="1" {...args}>
      <div
        className={mode === 'squared' ? 'flex flex-col gap-3 w-[300px]' : 'flex items-center gap-2'}
      >
        <Radio mode={mode} value="1" label="Option 1" />
        <Radio mode={mode} value="2" label="Option 2" />
        <Radio mode={mode} value="3" label="Option 3" />
      </div>
    </RadioGroup>
  ),
}

// States
export const States: Story = {
  render: args => (
    <div className="flex w-[400px] flex-col gap-8">
      <div>
        <h4 className="mb-2">Uncontrolled (Default Value: 2)</h4>
        <RadioGroup defaultValue="2" {...args}>
          <div className="flex items-center gap-4">
            <Radio value="1" label="Option 1" />
            <Radio value="2" label="Option 2" />
            <Radio value="3" label="Option 3" />
          </div>
        </RadioGroup>
      </div>

      <div>
        <h4 className="mb-2">Disabled Group</h4>
        <RadioGroup defaultValue="1" disabled {...args}>
          <div className="flex items-center gap-4">
            <Radio value="1" label="Option 1" />
            <Radio value="2" label="Option 2" />
          </div>
        </RadioGroup>
      </div>

      <div>
        <h4 className="mb-2">Disabled Item</h4>
        <RadioGroup defaultValue="1" {...args}>
          <div className="flex items-center gap-4">
            <Radio value="1" label="Option 1" />
            <Radio value="2" label="Disabled Option" disabled />
            <Radio value="3" label="Option 3" />
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
}

// Squared Mode
export const SquaredStates: Story = {
  render: args => (
    <div className="flex w-[400px] flex-col gap-4 p-4">
      <RadioGroup defaultValue="disabled-checked" className="flex flex-col gap-3" {...args}>
        <Radio mode="squared" value="unchecked" label="Unchecked" />
        <Radio mode="squared" value="checked" label="Checked" />
        <Radio mode="squared" value="disabled" label="Disabled" disabled />
        <Radio mode="squared" value="disabled-checked" label="Disabled Checked" disabled />
        <Radio
          mode="squared"
          value="long"
          label="Squared Mode with long text that should be truncated because it exceeds the container width"
        />
      </RadioGroup>
    </div>
  ),
}

// Group (Controlled Implementation)
export const Groups: Story = {
  render: args => {
    const [value, setValue] = useState<string>('kakaotalk')

    return (
      <div className="flex w-[400px] flex-col gap-6">
        <div>
          <h4 className="mb-3">SNS 선택 (Controlled)</h4>
          <RadioGroup
            value={value}
            onValueChange={setValue}
            className="flex flex-col gap-2"
            {...args}
          >
            <Radio value="facebook" label="Facebook" />
            <Radio value="instagram" label="Instagram" />
            <Radio value="kakaotalk" label="Kakaotalk" />
          </RadioGroup>
        </div>
        <p className="text-sm text-gray-600">
          선택된 값: <strong>{value}</strong>
        </p>

        <div>
          <h4 className="mb-3">Uncontrolled Group</h4>
          <RadioGroup defaultValue="opt1" className="flex flex-col gap-2" {...args}>
            <Radio value="opt1" label="Option 1" />
            <Radio value="opt2" label="Option 2" />
          </RadioGroup>
        </div>
      </div>
    )
  },
}
