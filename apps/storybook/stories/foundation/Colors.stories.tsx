import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

/** 컬러 스케일 행 (Tailwind 스타일) */
const ColorRow = ({
  name,
  colors,
}: {
  name: string
  colors: { step: string; variable: string; hex: string }[]
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 1500)
  }

  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
      {/* 컬러 이름 */}
      <div className="w-20 shrink-0">
        <span className="text-sm font-medium text-slate-900">{name}</span>
      </div>

      {/* 컬러 스케일 */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-11 gap-2 min-w-0">
        {colors.map(color => (
          <button
            key={color.step}
            onClick={() => handleCopy(color.hex)}
            className="group relative flex flex-col items-center cursor-pointer"
          >
            {/* 컬러 박스 */}
            <div
              className="w-full aspect-[3/2] sm:aspect-[2/3] rounded-md sm:rounded-lg ring-1 ring-inset ring-black/10 transition-transform hover:scale-105"
              style={{ backgroundColor: color.hex }}
            />
            {/* 스텝 번호 */}
            <span className="mt-1.5 text-[10px] font-medium text-slate-500">{color.step}</span>
            {/* 복사됨 툴팁 */}
            {copiedHex === color.hex && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded whitespace-nowrap">
                Copied!
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

/** 단일 컬러 (의미 컬러용) */
const SingleColor = ({
  name,
  label,
  hex,
  variable,
}: {
  name: string
  label?: string
  hex: string
  variable: string
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="group relative flex flex-col items-start cursor-pointer"
    >
      <div
        className="w-full aspect-square rounded-lg ring-1 ring-inset ring-black/10 transition-transform hover:scale-105"
        style={{ backgroundColor: hex }}
      />
      <div className="mt-2 text-left">
        <span className="block text-xs font-semibold text-slate-900">{name}</span>
        {label && <span className="block text-[10px] text-slate-500">{label}</span>}
        <span className="block text-[10px] font-mono text-slate-400 uppercase">{hex}</span>
      </div>
      {copied && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded whitespace-nowrap">
          Copied!
        </div>
      )}
    </button>
  )
}

/** 그래프 컬러 아이템 */
const GraphColor = ({ num, hex }: { num: string; hex: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="group relative flex flex-col items-center cursor-pointer"
    >
      <div
        className="w-full aspect-square rounded-md ring-1 ring-inset ring-black/10 transition-transform hover:scale-110"
        style={{ backgroundColor: hex }}
      />
      <span className="mt-1 text-[10px] font-medium text-slate-500">{num}</span>
      {copied && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded whitespace-nowrap z-10">
          Copied!
        </div>
      )}
    </button>
  )
}

const ColorsPalette = () => {
  // Primary 컬러 스케일
  const primaryColors = [
    { step: '100', variable: '--color-primary-100', hex: '#fafaff' },
    { step: '200', variable: '--color-primary-200', hex: '#8896ff' },
    { step: '300', variable: '--color-primary-300', hex: '#556af9' },
    { step: '400', variable: '--color-primary-400', hex: '#1a1f3f' },
  ]

  // Gray 컬러 스케일
  const grayColors = [
    { step: '0', variable: '--color-gray-0', hex: '#ffffff' },
    { step: '100', variable: '--color-gray-100', hex: '#f8f8f8' },
    { step: '200', variable: '--color-gray-200', hex: '#eeeeee' },
    { step: '300', variable: '--color-gray-300', hex: '#dddddd' },
    { step: '400', variable: '--color-gray-400', hex: '#bbbbbb' },
    { step: '500', variable: '--color-gray-500', hex: '#888888' },
    { step: '600', variable: '--color-gray-600', hex: '#777777' },
    { step: '700', variable: '--color-gray-700', hex: '#3d3d3d' },
    { step: '800', variable: '--color-gray-800', hex: '#222222' },
  ]

  // 그래프 컬러
  const graphColors = [
    { num: '01', hex: '#99d75e' },
    { num: '02', hex: '#a78cf1' },
    { num: '03', hex: '#f18b5f' },
    { num: '04', hex: '#97dce8' },
    { num: '05', hex: '#5ab5ab' },
    { num: '06', hex: '#727dbf' },
    { num: '07', hex: '#4fadf7' },
    { num: '08', hex: '#e694b0' },
    { num: '09', hex: '#ffca63' },
    { num: '10', hex: '#4f7499' },
    { num: '11', hex: '#b9aba4' },
    { num: '12', hex: '#87c660' },
    { num: '13', hex: '#c596cc' },
    { num: '14', hex: '#ffb7a1' },
    { num: '15', hex: '#a9b1df' },
    { num: '16', hex: '#ef7876' },
    { num: '17', hex: '#6a9fbd' },
    { num: '18', hex: '#b88672' },
    { num: '19', hex: '#acb9c9' },
    { num: '20', hex: '#919f88' },
  ]

  return (
    <div className="min-h-screen bg-white font-pretendard">
      {/* 헤더 */}
      <div className="border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Colors</h1>
          <p className="mt-3 text-lg text-slate-600">
            XDS 디자인 시스템의 컬러 팔레트입니다. 클릭하면 HEX 값이 복사됩니다.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-16">
        {/* Primary & Gray 스케일 */}
        <section>
          <h2 className="text-sm font-semibold text-slate-900 mb-6">Color Scales</h2>
          <div className="space-y-6">
            <ColorRow name="primary" colors={primaryColors} />
            <ColorRow name="gray" colors={grayColors} />
          </div>
        </section>

        {/* Semantic Colors */}
        <section>
          <h2 className="text-sm font-semibold text-slate-900 mb-2">Semantic Colors</h2>
          <p className="text-sm text-slate-500 mb-6">상태와 피드백을 전달하는 의미 기반 컬러</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            <SingleColor name="red" label="Danger" hex="#c00000" variable="--color-red" />
            <SingleColor name="yellow" label="Warning" hex="#f8b300" variable="--color-yellow" />
            <SingleColor name="green" label="Success" hex="#00a000" variable="--color-green" />
            <SingleColor name="blue" label="Info" hex="#579aff" variable="--color-blue" />
            <SingleColor name="darkblue" label="Link" hex="#3e70bb" variable="--color-darkblue" />
            <SingleColor
              name="lightyellow"
              label="Highlight"
              hex="#fff8e6"
              variable="--color-lightyellow"
            />
          </div>
        </section>

        {/* Graph Colors */}
        <section>
          <h2 className="text-sm font-semibold text-slate-900 mb-2">Graph Colors</h2>
          <p className="text-sm text-slate-500 mb-6">
            차트, 그래프, 배지 등 데이터 시각화에 사용되는 컬러
          </p>
          <div className="grid grid-cols-10 gap-2">
            {graphColors.map(color => (
              <GraphColor key={color.num} num={color.num} hex={color.hex} />
            ))}
          </div>
        </section>

        {/* Special Effects */}
        <section>
          <h2 className="text-sm font-semibold text-slate-900 mb-2">Special Effects</h2>
          <p className="text-sm text-slate-500 mb-6">오버레이, 딤 처리 등 특수 효과용 컬러</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border border-slate-200">
              <div className="w-full h-12 rounded-md bg-[rgba(0,0,0,0.03)] ring-1 ring-inset ring-black/10 mb-3" />
              <span className="text-xs font-semibold text-slate-900">hover</span>
              <span className="block text-[10px] font-mono text-slate-400">rgba(0,0,0,0.03)</span>
            </div>
            <div className="p-4 rounded-lg border border-slate-200">
              <div className="w-full h-12 rounded-md bg-[rgba(85,106,249,0.05)] ring-1 ring-inset ring-black/10 mb-3" />
              <span className="text-xs font-semibold text-slate-900">selected</span>
              <span className="block text-[10px] font-mono text-slate-400">
                rgba(85,106,249,0.05)
              </span>
            </div>
            <div className="p-4 rounded-lg border border-slate-200">
              <div className="w-full h-12 rounded-md bg-[rgba(0,0,0,0.3)] mb-3" />
              <span className="text-xs font-semibold text-slate-900">dimmed-black</span>
              <span className="block text-[10px] font-mono text-slate-400">rgba(0,0,0,0.3)</span>
            </div>
            <div className="p-4 rounded-lg border border-slate-200">
              <div className="w-full h-12 rounded-md bg-[rgba(255,255,255,0.3)] ring-1 ring-inset ring-black/10 mb-3" />
              <span className="text-xs font-semibold text-slate-900">dimmed-white</span>
              <span className="block text-[10px] font-mono text-slate-400">
                rgba(255,255,255,0.3)
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const meta = {
  title: 'Foundation/Color',
  component: ColorsPalette,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorsPalette>

export default meta
type Story = StoryObj<typeof meta>

export const Palette: Story = {}
