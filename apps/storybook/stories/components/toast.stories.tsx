import type { Meta, StoryObj } from '@storybook/react'
import { Toaster, Button, useToast, toast } from '@turbo-project/front-core-design'

const meta = {
  title: 'Components/Toast',
  component: Toaster,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ minHeight: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

// Type 1: Text
export const Type1IconText: Story = {
  render: () => {
    const Component = () => {
      const { addToasts } = useToast()
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Type 1: Icon + Text</h3>
          <p style={{ margin: 0, fontSize: '12px', color: '#777' }}>
            사용자의 행동에 대한 결과 피드백은 아이콘 + 텍스트로 표현한다.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              onClick={() =>
                addToasts({
                  message: '매체가 삭제 되었습니다.',
                })
              }
            >
              짧은 메시지
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                addToasts({
                  message: '총 xx개의 값이 변경되었습니다. 총 xx개의 값이 변경되었습니다.',
                })
              }
            >
              긴 메시지
            </Button>
          </div>
        </div>
      )
    }
    return <Component />
  },
}

// Type 2: Text + Close
export const Type2TextClose: Story = {
  render: () => {
    const Component = () => {
      const { addToasts } = useToast()
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Type 2: Text + Close</h3>
          <p style={{ margin: 0, fontSize: '12px', color: '#777' }}></p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              onClick={() =>
                addToasts({
                  message: '선택은 최대 30개만 선택할 수 있습니다.',
                  closable: true,
                })
              }
            >
              짧은 메시지
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                addToasts({
                  message:
                    '전체 선택은 최대 100개만 선택할 수 있습니다. 나머지는 하나씩 선택해주세요.',
                  closable: true,
                })
              }
            >
              긴 메시지
            </Button>
          </div>
        </div>
      )
    }
    return <Component />
  },
}

// 여러 토스트 스택
export const MultipleToasts: Story = {
  render: () => {
    const Component = () => {
      const { addToasts } = useToast()
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>여러 토스트</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              onClick={() => {
                addToasts({ message: '첫 번째 토스트' })
                setTimeout(() => addToasts({ message: '두 번째 토스트' }), 100)
                setTimeout(() => addToasts({ message: '세 번째 토스트' }), 200)
              }}
            >
              3개 토스트 띄우기
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                addToasts({ message: '임시저장이 되었습니다.' })
                setTimeout(() => addToasts({ message: '총 xx개의 값이 변경되었습니다.' }), 100)
                setTimeout(() => addToasts({ message: '데이터 통합이 완료되었습니다.' }), 200)
              }}
            >
              Figma 예시
            </Button>
          </div>
        </div>
      )
    }
    return <Component />
  },
}

// 커스텀 Duration
export const CustomDuration: Story = {
  render: () => {
    const Component = () => {
      const { addToasts } = useToast()
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>커스텀 Duration</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              onClick={() =>
                addToasts({
                  message: '2초 후 사라집니다',
                  duration: 2000,
                })
              }
            >
              2초
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                addToasts({
                  message: '사라지지 않습니다',
                  closable: true,
                })
              }
            >
              무한 (닫기 버튼 필요)
            </Button>
          </div>
        </div>
      )
    }
    return <Component />
  },
}

// 모든 토스트 제거
export const DismissAll: Story = {
  render: () => {
    const Component = () => {
      const { addToasts, dismissAll } = useToast()
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>토스트 제거</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              onClick={() => {
                addToasts({ message: '토스트 1', closable: true })
                addToasts({ message: '토스트 2', closable: true })
                addToasts({ message: '토스트 3', closable: true })
              }}
            >
              여러 토스트 띄우기
            </Button>
            <Button variant="outline" onClick={() => dismissAll()}>
              모두 제거
            </Button>
          </div>
        </div>
      )
    }
    return <Component />
  },
}

// 전체 데모
export const FullDemo: Story = {
  render: () => {
    const Component = () => {
      const { addToasts } = useToast()
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
          <div>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Toast 컴포넌트</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
              화면 중앙 하단, 하단에서 40px 위에 위치합니다.
              <br />
              여러 개가 뜨는 경우 세로 10px 간격으로 아래부터 쌓입니다.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
            }}
          >
            <div
              style={{
                padding: '16px',
                border: '1px solid #eee',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Type 1: Icon + Text</h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#777' }}>
                4초 후 자동 사라짐
              </p>
              <Button size="sm" onClick={() => addToasts({ message: '저장되었습니다.' })}>
                토스트 띄우기
              </Button>
            </div>

            <div
              style={{
                padding: '16px',
                border: '1px solid #eee',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Type 2: Text + Close</h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#777' }}>
                10초 유지, 닫기 버튼
              </p>
              <Button
                size="sm"
                onClick={() =>
                  addToasts({
                    message: '선택은 최대 30개만 선택할 수 있습니다.',
                    closable: true,
                  })
                }
              >
                토스트 띄우기
              </Button>
            </div>
          </div>
        </div>
      )
    }
    return <Component />
  },
}

// 기본 사용 (Global without useToast)
export const GlobalUsage: Story = {
  render: () => {
    const Component = () => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Basic Usage</h3>
          <p style={{ margin: 0, fontSize: '12px', color: '#777' }}>
            전역 Provider를 통해 토스트를 표시합니다.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              onClick={() =>
                toast.add({
                  message: '기본 토스트입니다.',
                })
              }
            >
              토스트 띄우기
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast.add({ message: '토스트 1' })
                setTimeout(() => toast.add({ message: '토스트 2' }), 500)
              }}
            >
              여러 개 띄우기
            </Button>
          </div>
        </div>
      )
    }

    return <Component />
  },
}
