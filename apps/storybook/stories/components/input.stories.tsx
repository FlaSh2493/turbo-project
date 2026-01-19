import type { Meta, StoryFn } from '@storybook/react'
import { Input } from '@turbo-project/front-core-design'
import { useState, type ComponentProps } from 'react'

type InputProps = ComponentProps<typeof Input>

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: 'sm',
    placeholder: 'Placeholder',
    clearable: true,
  },
} satisfies Meta<typeof Input>

export default meta

// Default
export const Default: StoryFn<InputProps> = (args: InputProps) => (
  <div style={{ width: '300px' }}>
    <Input {...args} />
  </div>
)

// All States
export const AllStates: StoryFn<InputProps> = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '300px',
    }}
  >
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Enabled (기본)</p>
      <Input placeholder="Placeholder" />
    </div>
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Fixed (읽기 전용)</p>
      <Input defaultValue="Fixed Value" readOnly />
    </div>
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Completed (입력 완료)</p>
      <Input defaultValue="Completed Value" />
    </div>
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Error (에러)</p>
      <Input error={true} placeholder="Placeholder" />
    </div>
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>
        Error with Message (에러 메시지)
      </p>
      <Input error="이메일 형식이 올바르지 않습니다" placeholder="이메일 입력" />
    </div>
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Disabled (비활성화)</p>
      <Input disabled placeholder="Placeholder" />
    </div>
  </div>
)

// All Sizes
export const AllSizes: StoryFn<InputProps> = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      width: '300px',
    }}
  >
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Small (34px) - Default</p>
      <Input size="sm" placeholder="Placeholder" />
    </div>
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Medium (44px)</p>
      <Input size="md" placeholder="Placeholder" />
    </div>
  </div>
)

// With Clear Button
export const WithClearButton: StoryFn<InputProps> = function WithClearButtonStory() {
  const [value, setValue] = useState('Clear me!')

  return (
    <div style={{ width: '300px' }}>
      <Input
        value={value}
        onChange={setValue}
        placeholder="Type something..."
        onClear={() => console.log('Cleared!')}
      />
      <p style={{ marginTop: '8px', fontSize: '12px', color: '#888' }}>
        값이 있을 때만 Clear 버튼이 표시됩니다.
      </p>
    </div>
  )
}

// Without Clear Button
export const WithoutClearButton: StoryFn<InputProps> = () => (
  <div style={{ width: '300px' }}>
    <Input defaultValue="No clear button" clearable={false} />
  </div>
)

// Controlled
export const Controlled: StoryFn<InputProps> = function ControlledInput() {
  const [value, setValue] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <Input value={value} onChange={setValue} placeholder="Type something..." />
      <p style={{ fontSize: '14px', color: '#3d3d3d' }}>
        입력된 값: <strong>{value || '(없음)'}</strong>
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setValue('Hello')}
          style={{
            padding: '4px 12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
        >
          Set "Hello"
        </button>
        <button
          onClick={() => setValue('')}
          style={{
            padding: '4px 12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

// Error States
export const ErrorStates: StoryFn<InputProps> = function ErrorStatesStory() {
  const [value, setValue] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '300px',
      }}
    >
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>
          error=true (에러 테두리만)
        </p>
        <Input error={true} placeholder="Placeholder" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>
          error="메시지" + 값 없음 (placeholder에 에러 메시지)
        </p>
        <Input error="이메일 형식이 올바르지 않습니다" placeholder="이메일 입력" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>
          error="메시지" + 값 있음 (에러 테두리만)
        </p>
        <Input
          error="이메일 형식이 올바르지 않습니다"
          defaultValue="invalid@"
          placeholder="이메일 입력"
        />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>
          동적 에러 상태 (입력해보세요)
        </p>
        <Input
          value={value}
          onChange={setValue}
          error={value.length > 0 && value.length < 3 ? '최소 3자 이상 입력하세요' : undefined}
          placeholder="최소 3자 이상"
        />
      </div>
    </div>
  )
}

// Interactive Demo
export const InteractiveDemo: StoryFn<InputProps> = function InteractiveDemoStory() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>()

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError(undefined)
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setEmailError('올바른 이메일 형식이 아닙니다')
    } else {
      setEmailError(undefined)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
        padding: '24px',
        border: '1px solid #eee',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>로그인</h3>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: '#666' }}>
          이메일
        </label>
        <Input
          value={email}
          onChange={(value: string) => {
            setEmail(value)
            validateEmail(value)
          }}
          error={emailError}
          placeholder="이메일을 입력하세요"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: '#666' }}>
          비밀번호
        </label>
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="비밀번호를 입력하세요"
          clearable={false}
        />
      </div>
      <button
        style={{
          padding: '10px 16px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#556af9',
          color: 'white',
          cursor: 'pointer',
          fontSize: '14px',
        }}
        onClick={() => alert(`Email: ${email}\nPassword: ${password}`)}
      >
        로그인
      </button>
    </div>
  )
}
