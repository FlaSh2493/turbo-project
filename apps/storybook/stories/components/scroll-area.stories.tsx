import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '@turbo-project/front-core-design'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: args => (
    <ScrollArea {...args} className="h-72 w-48 rounded-md border border-gray-200">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm">
            v1.2.0-beta.{50 - i}
            <hr className="my-2 border-gray-100" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: args => (
    <ScrollArea {...args} className="w-96 whitespace-nowrap rounded-md border border-gray-200">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex h-40 w-32 shrink-0 items-center justify-center rounded-md bg-gray-100"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Both: Story = {
  render: args => (
    <ScrollArea {...args} className="h-72 w-96 rounded-md border border-gray-200">
      <div className="h-[600px] w-[600px] p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Huge Content</h4>
        <p className="text-sm">This area has both vertical and horizontal overflow.</p>
        <div className="mt-4 flex h-[500px] w-[500px] items-center justify-center rounded-md bg-gray-50 border border-dashed border-gray-300">
          Scroll around me!
        </div>
      </div>
    </ScrollArea>
  ),
}
