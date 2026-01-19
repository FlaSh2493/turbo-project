import type { Meta, StoryObj } from '@storybook/react'
import { CheckBox, CheckBoxGroup, CheckBoxContent } from '@turbo-project/front-core-design'
import { useState, type ComponentProps } from 'react'

type CheckBoxProps = ComponentProps<typeof CheckBox>

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: '체크박스 라벨',
    disabled: false,
  },
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<CheckBoxProps>

// Basic
export const Basic: Story = {
  render: args => <CheckBox {...args} />,
}

// States
export const States: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      <CheckBox id="s1" label="Uncontrolled" />
      <CheckBox id="s2" defaultChecked label="Default Checked" />
      <CheckBox id="s3" checked="indeterminate" label="Indeterminate" />
      <CheckBox id="s4" disabled label="Disabled" />
      <CheckBox id="s5" disabled defaultChecked label="Disabled Checked" />
      <CheckBox id="s6" disabled checked="indeterminate" label="Disabled Indeterminate" />
    </div>
  ),
}

// Squared Mode
export const SquaredStates: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4 p-4">
      <CheckBox id="sq-unchecked" mode="squared" label="Unchecked" />
      <CheckBox id="sq-checked" mode="squared" defaultChecked label="Checked" />
      <CheckBox id="sq-disabled" mode="squared" disabled label="Disabled" />
      <CheckBox
        id="sq-disabled-checked"
        mode="squared"
        disabled
        defaultChecked
        label="Disabled Checked"
      />
      <CheckBox
        id="sq-long"
        mode="squared"
        label="Squared Mode with long text that should be truncated because it exceeds the max width of 178px"
      />
    </div>
  ),
}

// Group (Context Implementation)
export const Groups: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['kakaotalk'])

    return (
      <div className="flex w-[400px] flex-col gap-6">
        <div>
          <h4 className="mb-3">SNS 선택 (CheckBoxGroup)</h4>
          <CheckBoxGroup value={values} onValueChange={setValues}>
            <CheckBoxContent className="flex flex-col gap-2">
              <CheckBox value="facebook" label="Facebook" />
              <CheckBox value="instagram" label="Instagram" />
              <CheckBox value="kakaotalk" label="Kakaotalk" />
            </CheckBoxContent>
          </CheckBoxGroup>
        </div>
        <p className="text-sm text-gray-600">
          선택된 값: <strong>{values.join(', ')}</strong>
        </p>

        <div>
          <h4 className="mb-3">Uncontrolled Group</h4>
          <CheckBoxGroup defaultValue={['opt1']}>
            <CheckBoxContent className="flex flex-col gap-2">
              <CheckBox value="opt1" label="Option 1" />
              <CheckBox value="opt2" label="Option 2" />
            </CheckBoxContent>
          </CheckBoxGroup>
        </div>
      </div>
    )
  },
}

// Indeterminate Group
export const IndeterminateGroup: Story = {
  render: () => {
    const allItems = ['apple', 'banana', 'orange']
    const [values, setValues] = useState<string[]>(['apple'])

    const isAllSelected = allItems.every(item => values.includes(item))
    const isIndeterminate = values.length > 0 && !isAllSelected

    const toggleAll = () => {
      if (isAllSelected) {
        setValues([])
      } else {
        setValues(allItems)
      }
    }

    return (
      <div className="flex w-[400px] flex-col gap-4">
        <CheckBox
          id="select-all"
          checked={isAllSelected ? true : isIndeterminate ? 'indeterminate' : false}
          onCheckedChange={toggleAll}
          label="Select All"
        />
        <div className="flex flex-col gap-2 pl-6">
          <CheckBoxGroup value={values} onValueChange={setValues}>
            <CheckBoxContent className="flex flex-col gap-2">
              {allItems.map(item => (
                <CheckBox key={item} value={item} label={item} />
              ))}
            </CheckBoxContent>
          </CheckBoxGroup>
        </div>
        <p className="text-sm text-gray-600">
          Selected: <strong>{values.join(', ')}</strong>
        </p>
      </div>
    )
  },
}
