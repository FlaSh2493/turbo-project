import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button, SmoothList } from '@turbo-project/front-core-design'

const meta = {
  title: 'Components/SmoothList',
  component: SmoothList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SmoothList>

export default meta
type Story = StoryObj<typeof meta>

const ShuffleDemo = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5])

  const shuffle = () => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  const addItem = () => {
    setItems(prev => [...prev, Math.max(...prev, 0) + 1])
  }

  const removeItem = (item: number) => {
    setItems(prev => prev.filter(i => i !== item))
  }

  return (
    <div className="flex flex-col gap-4 w-80">
      <div className="flex gap-2">
        <Button onClick={shuffle} variant="outline">
          Shuffle
        </Button>
        <Button onClick={addItem} variant="outline">
          Add
        </Button>
      </div>

      <SmoothList className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg">
        {items.map(item => (
          <div
            key={item}
            data-layout-id={item}
            className="flex items-center justify-between p-3 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => removeItem(item)}
          >
            <span>Item {item}</span>
            <span className="text-gray-400 text-sm">Click to remove</span>
          </div>
        ))}
      </SmoothList>
    </div>
  )
}

export const Default: Story = {
  render: () => <ShuffleDemo />,
  args: {},
}

const GridDemo = () => {
  const [items, setItems] = useState(Array.from({ length: 9 }, (_, i) => i + 1))

  const shuffle = () => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  return (
    <div className="flex flex-col gap-4 w-96">
      <Button onClick={shuffle} variant="outline">
        Shuffle Grid
      </Button>
      <SmoothList as="div" className="grid grid-cols-3 gap-2 p-4 bg-gray-100 rounded-lg">
        {items.map(item => (
          <div
            key={item}
            data-layout-id={item}
            className="aspect-square flex items-center justify-center bg-white rounded shadow text-xl font-bold"
          >
            {item}
          </div>
        ))}
      </SmoothList>
    </div>
  )
}

export const Grid: Story = {
  render: () => <GridDemo />,
  args: {},
}
