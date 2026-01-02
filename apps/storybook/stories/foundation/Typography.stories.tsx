import type { Meta, StoryObj } from '@storybook/react'

const TypographyItem = ({
  name,
  className,
  description,
}: {
  name: string
  className: string
  description: string
}) => (
  <div className="flex flex-col gap-2 py-6 border-b border-gray-100 last:border-0">
    <div className="flex items-baseline gap-4 mb-2">
      <span className="text-sm font-bold text-primary-300">{name}</span>
      <span className="text-xs text-gray-400 font-mono">{description}</span>
    </div>
    <div className={className}>
      다람쥐 헌 쳇바퀴에 타고파. The quick brown fox jumps over the lazy dog. 1234567890
    </div>
  </div>
)

const TypographyPalette = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto font-pretendard">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">XDS Typography</h1>
        <p className="text-gray-500">전용 서체: Pretendard</p>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-800 pb-2">
          Headings
        </h2>
        <TypographyItem name="Heading 0" className="heading0" description="36px / Bold / 1.44" />
        <TypographyItem name="Heading 1" className="heading1" description="24px / Bold / 1.5" />
        <TypographyItem name="Heading 2" className="heading2" description="20px / Bold / 1.4" />
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-800 pb-2">Titles</h2>
        <TypographyItem name="Title 1" className="title1" description="18px / Bold / 1.44" />
        <TypographyItem name="Title 2" className="title2" description="16px / Bold / 1.625" />
        <TypographyItem name="Title 3" className="title3" description="14px / Bold / 1.71" />
        <TypographyItem name="Title 4" className="title4" description="12px / Bold / 1.33" />
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-800 pb-2">Bodies</h2>
        <TypographyItem name="Body 1" className="body1" description="16px / Medium / 1.625" />
        <TypographyItem name="Body 2" className="body2" description="14px / Medium / 1.71" />
        <TypographyItem name="Body 3" className="body3" description="12px / Medium / 1.33" />
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-800 pb-2">
          Captions
        </h2>
        <TypographyItem name="Caption 1" className="caption1" description="12px / Medium / 1.33" />
        <TypographyItem name="Caption 2" className="caption2" description="10px / Bold / 1.6" />
      </div>
    </div>
  )
}

const meta = {
  title: 'Foundation/Typography',
  component: TypographyPalette,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TypographyPalette>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
