import type { Meta, StoryFn } from '@storybook/react'
import { Select } from '../../../../packages/ui/src/components'
import { useState } from 'react'

const meta: Meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

const defaultOptions = [
  { label: '옵션 1', value: '1' },
  { label: '옵션 2', value: '2' },
]

export const SizesAndStates: StoryFn = () => {
  const [v1, setV1] = useState('')
  const [v2, setV2] = useState('')
  const [v3, setV3] = useState('')

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Sizes (md vs sm)</h3>
        <div className="flex gap-4 items-end">
          <div className="w-[200px]">
            <p className="text-xs mb-1">Medium (md)</p>
            <Select
              type="single"
              value={v1}
              onValueChange={setV1}
              size="md"
              options={defaultOptions}
            >
              <Select.Trigger placeholder="선택하세요" />
              <Select.Content>
                <Select.List
                  render={options =>
                    options.map(option => (
                      <Select.Item key={option.value} value={option.value}>
                        {option.label}
                      </Select.Item>
                    ))
                  }
                />
              </Select.Content>
            </Select>
          </div>
          <div className="w-[200px]">
            <p className="text-xs mb-1">Small (sm)</p>
            <Select
              type="single"
              value={v2}
              onValueChange={setV2}
              size="sm"
              options={defaultOptions}
            >
              <Select.Trigger placeholder="선택하세요" />
              <Select.Content>
                <Select.List
                  render={options =>
                    options.map(option => (
                      <Select.Item key={option.value} value={option.value}>
                        {option.label}
                      </Select.Item>
                    ))
                  }
                />
              </Select.Content>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">States</h3>
        <div className="flex gap-4 items-end">
          <div className="w-[200px]">
            <p className="text-xs mb-1">Error</p>
            <Select type="single" value={v3} onValueChange={setV3} options={defaultOptions}>
              <Select.Trigger error placeholder="에러 상태" />
              <Select.Content>
                <Select.List
                  render={options =>
                    options.map(option => (
                      <Select.Item key={option.value} value={option.value}>
                        {option.label}
                      </Select.Item>
                    ))
                  }
                />
              </Select.Content>
            </Select>
          </div>
          <div className="w-[200px]">
            <p className="text-xs mb-1">Disabled</p>
            <Select
              type="single"
              value=""
              onValueChange={() => {}}
              options={[{ label: '옵션 1', value: '1' }]}
            >
              <Select.Trigger disabled placeholder="비활성 상태" />
              <Select.Content>
                <Select.List
                  render={options =>
                    options.map(option => (
                      <Select.Item key={option.value} value={option.value}>
                        {option.label}
                      </Select.Item>
                    ))
                  }
                />
              </Select.Content>
            </Select>
          </div>
          <div className="w-[200px]">
            <p className="text-xs mb-1">ReadOnly</p>
            <Select
              type="single"
              value="1"
              onValueChange={() => {}}
              options={defaultOptions}
            >
              <Select.Trigger readOnly placeholder="읽기 전용" />
              <Select.Content>
                <Select.List
                  render={options =>
                    options.map(option => (
                      <Select.Item key={option.value} value={option.value}>
                        {option.label}
                      </Select.Item>
                    ))
                  }
                />
              </Select.Content>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

// 1. Basic Single Select
// 1. Basic Single Select
export const SingleSelect: StoryFn = () => {
  const [value, setValue] = useState('apple')

  const fruitOptions = [
    { label: '사과', value: 'apple' },
    { label: '바나나', value: 'banana' },
    { label: '오렌지', value: 'orange' },
    { label: '포도', value: 'grape' },
  ]

  return (
    <div className="flex flex-col gap-4 w-[300px]">
      <h3 className="text-lg font-bold">Single Select</h3>
      <Select type="single" value={value} onValueChange={setValue} size="md" options={fruitOptions}>
        <Select.Trigger placeholder="과일을 선택하세요" />
        <Select.Content>
          <Select.List
            render={options =>
              options.map(option => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))
            }
          />
        </Select.Content>
      </Select>
      <p className="text-sm">선택된 값: {value}</p>
    </div>
  )
}

// 2. Multi Select with Full Composition
// 2. Multi Select with Full Composition
export const MultiSelectFull: StoryFn = () => {
  const [values, setValues] = useState<string[]>(['apple'])

  const fruitOptions = [
    { label: '사과', value: 'apple' },
    { label: '바나나', value: 'banana' },
    { label: '오렌지', value: 'orange' },
    { label: '포도', value: 'grape' },
    { label: '수박', value: 'watermelon' },
    { label: '멜론', value: 'melon' },
    { label: '키위', value: 'kiwi' },
  ]

  return (
    <div className="flex flex-col gap-4 w-[350px]">
      <h3 className="text-lg font-bold">Multi Select (Full Composition)</h3>
      <Select
        type="multiple"
        value={values}
        onValueChange={setValues}
        size="sm"
        options={fruitOptions}
      >
        <Select.Trigger placeholder="과일들을 선택하세요" />
        <Select.Content>
          <Select.Search className="mb-2.5" />
          <Select.Header className="mb-2.5" />
          <Select.List
            className="max-h-[200px]"
            render={options =>
              options.map(option => (
                <Select.CheckboxItem key={option.value} value={option.value}>
                  {option.label}
                </Select.CheckboxItem>
              ))
            }
          />
          <Select.Footer
            className="mt-2.5"
            onConfirm={() => console.log('Confirmed:', values)}
            onCancel={() => console.log('Cancelled')}
          />
        </Select.Content>
      </Select>
      <p className="text-sm">선택된 값들: {values.join(', ')}</p>
    </div>
  )
}

// 3. Search Only
// 3. Search Only
export const SearchOnly: StoryFn = () => {
  const [value, setValue] = useState('')

  const frameworkOptions = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Next.js', value: 'nextjs' },
  ]

  return (
    <div className="flex flex-col gap-4 w-[300px]">
      <h3 className="text-lg font-bold">Search Included</h3>
      <Select
        type="single"
        value={value}
        onValueChange={setValue}
        size="md"
        options={frameworkOptions}
      >
        <Select.Trigger placeholder="항목을 검색하고 선택하세요" />
        <Select.Content>
          <Select.Search />
          <Select.List
            render={options =>
              options.map(option => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))
            }
          />
        </Select.Content>
      </Select>
    </div>
  )
}

// 4. Custom Item Rendering
// 4. Custom Item Rendering
export const CustomItem: StoryFn = () => {
  const [value, setValue] = useState('')

  const userOptions = [
    { label: '김철수', value: 'user1', color: 'bg-blue-500' },
    { label: '이영희', value: 'user2', color: 'bg-green-500' },
    { label: '박민수', value: 'user3', color: 'bg-red-500' },
  ]

  return (
    <div className="flex flex-col gap-4 w-[300px]">
      <h3 className="text-lg font-bold">Custom Item Rendering</h3>
      <Select type="single" value={value} onValueChange={setValue} size="md" options={userOptions}>
        <Select.Trigger placeholder="사용자를 선택하세요" />
        <Select.Content>
          <Select.List
            render={options =>
              options.map(option => {
                const user = userOptions.find(o => o.value === option.value)
                if (!user) return null
                return (
                  <Select.Item key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${user.color}`} />
                      <span>{option.label}</span>
                    </div>
                  </Select.Item>
                )
              })
            }
          />
        </Select.Content>
      </Select>
    </div>
  )
}
