import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal, Button } from '@turbo-project/front-core-design'
import { useModal } from '@turbo-project/front-core-design/headless'

const meta = {
  title: 'Components/Modal',
  component: Modal.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal.Root>

export default meta
type Story = StoryObj<typeof Modal.Root>

// ============================================
// Basic Modal with useModal Hook
// ============================================

export const Basic: Story = {
  render: () => {
    const { open, setOpen } = useModal()

    return (
      <>
        <Button size="lg" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal.Root open={open} onOpenChange={setOpen} size="sm">
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>기본 모달</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="body2 text-gray-700">이것은 useModal 훅을 사용한 기본 모달입니다.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button size="lg" variant="ghost" onClick={() => setOpen(false)}>
                  취소
                </Button>
                <Button size="lg" onClick={() => setOpen(false)}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>
      </>
    )
  },
}

// ============================================
// Size Variants
// ============================================

export const Sizes: Story = {
  render: () => {
    const { open: openSm, setOpen: setOpenSm } = useModal()
    const { open: openMd, setOpen: setOpenMd } = useModal()
    const { open: openLg, setOpen: setOpenLg } = useModal()
    const { open: openXl, setOpen: setOpenXl } = useModal()

    return (
      <div className="flex gap-2">
        <Button size="lg" onClick={() => setOpenSm(true)}>
          Small (360px)
        </Button>
        <Button size="lg" onClick={() => setOpenMd(true)}>
          Medium (640px)
        </Button>
        <Button size="lg" onClick={() => setOpenLg(true)}>
          Large (840px)
        </Button>
        <Button size="lg" onClick={() => setOpenXl(true)}>
          XLarge (1280px)
        </Button>

        <Modal.Root open={openSm} onOpenChange={setOpenSm} size="sm">
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Small Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="body2 text-gray-700">Width: 360px</p>
              </Modal.Body>
              <Modal.Footer>
                <Button size="lg" onClick={() => setOpenSm(false)}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>

        <Modal.Root open={openMd} onOpenChange={setOpenMd} size="md">
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Medium Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="body2 text-gray-700">Width: 640px</p>
              </Modal.Body>
              <Modal.Footer>
                <Button size="lg" onClick={() => setOpenMd(false)}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>

        <Modal.Root open={openLg} onOpenChange={setOpenLg} size="lg">
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Large Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="body2 text-gray-700">Width: 840px</p>
              </Modal.Body>
              <Modal.Footer>
                <Button size="lg" onClick={() => setOpenLg(false)}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>

        <Modal.Root open={openXl} onOpenChange={setOpenXl} size="xl">
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>XLarge Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="body2 text-gray-700">Width: 1280px</p>
              </Modal.Body>
              <Modal.Footer>
                <Button size="lg" onClick={() => setOpenXl(false)}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>
      </div>
    )
  },
}

// ============================================
// With Custom Confirm/Cancel Logic
// ============================================

export const WithCustomLogic: Story = {
  render: () => {
    const { open, setOpen } = useModal()
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<string>('')

    const handleConfirm = async () => {
      setIsLoading(true)
      setResult('처리 중...')

      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000))

      setResult('저장 완료!')
      setIsLoading(false)
      setOpen(false)

      // Reset result after modal closes
      setTimeout(() => setResult(''), 500)
    }

    const handleCancel = () => {
      setResult('취소됨')
      setOpen(false)
      setTimeout(() => setResult(''), 500)
    }

    return (
      <>
        <div className="flex flex-col items-center gap-4">
          <Button size="lg" onClick={() => setOpen(true)}>
            Open Modal with Custom Logic
          </Button>
          {result && <p className="body2 text-gray-700">{result}</p>}
        </div>

        <Modal.Root open={open} onOpenChange={setOpen} size="md">
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>사용자 정의 로직</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="body2 text-gray-700">
                  확인 버튼을 클릭하면 2초간 비동기 작업이 실행됩니다.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button size="lg" variant="ghost" onClick={handleCancel} disabled={isLoading}>
                  취소
                </Button>
                <Button size="lg" onClick={handleConfirm} disabled={isLoading}>
                  {isLoading ? '처리 중...' : '확인'}
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>
      </>
    )
  },
}

// ============================================
// With Form Input
// ============================================

export const WithFormInput: Story = {
  render: () => {
    const { open, setOpen } = useModal()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = () => {
      console.log('Submitted:', { name, email })
      setOpen(false)
      setName('')
      setEmail('')
    }

    return (
      <>
        <Button size="lg" onClick={() => setOpen(true)}>
          Open Form Modal
        </Button>

        <Modal.Root open={open} onOpenChange={setOpen} size="md">
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>사용자 정보 입력</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="title3 text-gray-700 mb-2 block">
                      이름 *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="이름을 입력하세요"
                      className="w-full rounded-[5px] border border-gray-200 bg-gray-100 px-3.5 py-2.5 body2 text-gray-700 outline-none focus:border-primary-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="title3 text-gray-700 mb-2 block">
                      이메일 *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="이메일을 입력하세요"
                      className="w-full rounded-[5px] border border-gray-200 bg-gray-100 px-3.5 py-2.5 body2 text-gray-700 outline-none focus:border-primary-300"
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => {
                    setOpen(false)
                    setName('')
                    setEmail('')
                  }}
                >
                  취소
                </Button>
                <Button size="lg" onClick={handleSubmit} disabled={!name || !email}>
                  저장
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>
      </>
    )
  },
}

// ============================================
// With Scrollable Content
// ============================================

export const WithScrollableContent: Story = {
  render: () => {
    const { open, setOpen } = useModal()

    return (
      <>
        <Button size="lg" onClick={() => setOpen(true)}>
          Open Modal with Long Content
        </Button>

        <Modal.Root open={open} onOpenChange={setOpen} size="md">
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>스크롤 가능한 콘텐츠</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-4">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <p key={i} className="body2 text-gray-700">
                      {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  ))}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button size="lg" variant="ghost" onClick={() => setOpen(false)}>
                  취소
                </Button>
                <Button size="lg" onClick={() => setOpen(false)}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>
      </>
    )
  },
}

// ============================================
// Controlled Mode
// ============================================

export const ControlledMode: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <Button size="lg" onClick={() => setOpen(true)}>
              Open
            </Button>
            <Button size="lg" onClick={() => setOpen(false)} variant="secondary">
              Close
            </Button>
          </div>
          <p className="body2 text-gray-700">Modal is {open ? 'open' : 'closed'}</p>
        </div>

        <Modal.Root open={open} onOpenChange={setOpen} size="sm">
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Controlled Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="body2 text-gray-700">이 모달은 외부 상태로 제어됩니다.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button size="lg" onClick={() => setOpen(false)}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>
      </>
    )
  },
}

// ============================================
// Without Footer
// ============================================

export const WithoutFooter: Story = {
  render: () => {
    const { open, setOpen } = useModal()

    return (
      <>
        <Button size="lg" onClick={() => setOpen(true)}>
          Open Modal without Footer
        </Button>

        <Modal.Root open={open} onOpenChange={setOpen} size="sm">
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Footer 없는 모달</Modal.Title>
                <Modal.Close className="ml-auto">
                  <Button variant="ghost" size="icon-sm">
                    ✕
                  </Button>
                </Modal.Close>
              </Modal.Header>
              <Modal.Body>
                <p className="body2 text-gray-700">
                  이 모달은 Footer가 없습니다. 헤더의 X 버튼으로 닫을 수 있습니다.
                </p>
              </Modal.Body>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>
      </>
    )
  },
}

// ============================================
// With Trigger Component
// ============================================

export const WithTrigger: Story = {
  render: () => {
    return (
      <Modal.Root size="sm">
        <Modal.Trigger asChild>
          <Button size="lg">Open with Trigger</Button>
        </Modal.Trigger>
        <Modal.Portal>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Trigger로 열린 모달</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="body2 text-gray-700">
                이 모달은 Modal.Trigger 컴포넌트를 사용하여 열립니다.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close asChild>
                <Button size="lg" variant="ghost">
                  취소
                </Button>
              </Modal.Close>
              <Modal.Close asChild>
                <Button size="lg">확인</Button>
              </Modal.Close>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
    )
  },
}
