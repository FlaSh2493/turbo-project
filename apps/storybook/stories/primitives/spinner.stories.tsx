import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from '@turbo-project/front-core-design'

const meta = {
  title: 'Primitives/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '로딩 상태를 시각적으로 표시하는 스피너 컴포넌트입니다. Figma 디자인 스펙에 맞춘 정밀한 사이즈(xs, sm, md, lg)를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    size: 'sm',
    fullscreen: 'container',
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// Basic Stories
// ============================================================================

export const Default: Story = {
  args: {
    size: 'sm',
  },
}

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

// ============================================================================
// Showcase
// ============================================================================

/**
 * 모든 사이즈를 한눈에 볼 수 있는 예시입니다.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner size="xs" fullscreen="static" />
        <span className="text-xs text-gray-500">xs (16px)</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner size="sm" fullscreen="static" />
        <span className="text-xs text-gray-500">sm (24px)</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner size="md" fullscreen="static" />
        <span className="text-xs text-gray-500">md (32px)</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner size="lg" fullscreen="static" />
        <span className="text-xs text-gray-500">lg (48px)</span>
      </div>
    </div>
  ),
}

// ============================================================================
// Fullscreen Modes
// ============================================================================

/**
 * `fullscreen="container"` 모드는 `relative` 위치를 가진 부모 요소를 가득 채웁니다.
 */
export const ContainerOverlay: Story = {
  render: () => (
    <div className="relative w-[300px] h-[200px] border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-gray-900">콘텐츠 로딩 중...</h3>
        <p className="text-sm text-gray-500">
          이 영역은 로딩 중이므로 사용자가 조작할 수 없습니다. 스피너가 오버레이됩니다.
        </p>
        <div className="w-full h-8 bg-gray-100 rounded animate-pulse" />
        <div className="w-3/4 h-8 bg-gray-100 rounded animate-pulse" />
      </div>
      <Spinner fullscreen="container" size="md" />
    </div>
  ),
}

/**
 * `fullscreen="page"` 모드는 뷰포트 전체를 덮습니다. (미리보기를 위해 iframe 내에서만 동작할 수 있음)
 */
export const PageOverlayPreview: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="relative w-full h-[300px] bg-gray-50">
      <div className="p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">전체 페이지 로딩 예시</h1>
        <p className="text-gray-600">
          `fullscreen="page"`를 사용하면 화면 전체를 `fixed` 포지션으로 덮습니다.
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          버튼 (클릭 불가)
        </button>
      </div>
      <Spinner fullscreen="page" size="lg" />
    </div>
  ),
}
