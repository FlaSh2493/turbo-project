import type { Meta, StoryObj } from '@storybook/react'
import { PopConfirm, PopConfirmProps } from '@turbo-project/front-core-design'
import { Button } from '@turbo-project/front-core-design'
import { useState } from 'react'

const meta = {
  title: 'Components/PopConfirm',
  component: PopConfirm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PopConfirm>

export default meta
type Story = StoryObj<PopConfirmProps>

// Basic Stories
export const Default: Story = {
  args: {
    title: '정말 삭제하시겠습니까?',
    children: <Button variant="outline">삭제</Button>,
  },
}

export const WithCustomText: Story = {
  args: {
    title: '이 항목을 삭제하시겠습니까?',
    confirmText: '확인',
    cancelText: '취소',
    children: <Button variant="outline">삭제</Button>,
  },
}

export const WithoutArrow: Story = {
  args: {
    title: '정말 삭제하시겠습니까?',
    showArrow: false,
    children: <Button variant="outline">삭제</Button>,
  },
}

// Position Stories
export const SideAndAlign: Story = {
  args: {
    title: '정말 삭제하시겠습니까?',
    side: 'right',
    align: 'start',
    children: <Button variant="outline">Right Start</Button>,
  },
}

// All Combinations Grid
export const AllCombinations: Story = {
  render: () => {
    const sides = ['top', 'bottom', 'left', 'right'] as const
    const aligns = ['start', 'center', 'end'] as const

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
          padding: '100px',
        }}
      >
        {sides.map(side =>
          aligns.map(align => (
            <PopConfirm
              key={`${side}-${align}`}
              title={`${side} ${align}`}
              side={side}
              align={align}
            >
              <Button variant="outline" style={{ width: '100%' }}>
                {side} {align}
              </Button>
            </PopConfirm>
          )),
        )}
      </div>
    )
  },
}

// Controlled Mode
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" onClick={() => setOpen(true)}>
            열기
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </div>
        <PopConfirm
          title="정말 삭제하시겠습니까?"
          open={open}
          onOpenChange={setOpen}
          onConfirm={() => {
            console.log('확인됨')
          }}
          onCancel={() => {
            console.log('취소됨')
          }}
        >
          <Button variant="outline">삭제</Button>
        </PopConfirm>
        <p>현재 상태: {open ? '열림' : '닫힘'}</p>
      </div>
    )
  },
}

// Async Confirm
export const AsyncConfirm: Story = {
  render: () => {
    const handleConfirm = async () => {
      // 2초 대기 (API 호출 시뮬레이션)
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('삭제 완료!')
    }

    return (
      <PopConfirm title="정말 삭제하시겠습니까?" onConfirm={handleConfirm} loadingText="삭제 중...">
        <Button variant="outline">삭제 (비동기)</Button>
      </PopConfirm>
    )
  },
}

// Async Confirm with Error
export const AsyncConfirmWithError: Story = {
  render: () => {
    const handleConfirm = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      throw new Error('삭제 실패!')
    }

    return (
      <PopConfirm
        title="삭제 시 에러가 발생합니다"
        onConfirm={handleConfirm}
        loadingText="삭제 중..."
      >
        <Button variant="outline">삭제 (에러 발생)</Button>
      </PopConfirm>
    )
  },
}

// With Callbacks
export const WithCallbacks: Story = {
  render: () => {
    return (
      <PopConfirm
        title="정말 삭제하시겠습니까?"
        onConfirm={() => {
          alert('확인 버튼이 클릭되었습니다!')
        }}
        onCancel={() => {
          alert('취소 버튼이 클릭되었습니다!')
        }}
        onOpenChange={open => {
          console.log('열림 상태 변경:', open)
        }}
      >
        <Button variant="outline">삭제</Button>
      </PopConfirm>
    )
  },
}

// Custom Title with ReactNode
export const CustomTitle: Story = {
  args: {
    title: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <strong style={{ color: '#ef4444' }}>⚠️ 경고</strong>
        <span>이 작업은 되돌릴 수 없습니다.</span>
      </div>
    ),
    children: <Button variant="outline">삭제</Button>,
  },
}

// Disabled Buttons
export const DisabledConfirm: Story = {
  args: {
    title: '확인 버튼이 비활성화되어 있습니다',
    confirmDisabled: true,
    children: <Button variant="outline">삭제</Button>,
  },
}

export const DisabledCancel: Story = {
  args: {
    title: '취소 버튼이 비활성화되어 있습니다',
    cancelDisabled: true,
    children: <Button variant="outline">삭제</Button>,
  },
}
