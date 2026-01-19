import { type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { spinnerVariants } from './spinner.css'

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg'
export type SpinnerFullscreen = VariantProps<typeof spinnerVariants>['fullscreen']
export type SpinnerDim = VariantProps<typeof spinnerVariants>['dim']

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinnerVariants> {
  /** 스피너 크기 */
  size?: SpinnerSize
  /** 전체 화면 모드 */
  fullscreen?: SpinnerFullscreen
  /** 딤 처리 */
  dim?: SpinnerDim
}

/**
 * 로딩 상태를 시각적으로 표시하는 스피너 컴포넌트
 *
 * @example
 * // 기본 사용
 * <Spinner />
 *
 * // 사이즈 변경
 * <Spinner size="l" />
 *
 * // 전체 페이지 로딩
 * <Spinner fullscreen="page" />
 *
 * // 컨테이너 기준 로딩
 * <div style={{ position: 'relative' }}>
 *   <Spinner fullscreen="container" />
 * </div>
 */
export const Spinner = ({
  size = 'sm',
  fullscreen = 'container',
  className,
  dim = 'white',
  ...props
}: SpinnerProps) => {
  // Figma 디자인 스펙에 맞춘 사이즈별 형상 정보
  // CVA로 처리하기 어려운 SVG 내부 속성(radius, viewBox 등)을 관리
  const geometry = {
    xs: { viewBox: 16, radius: 6, strokeWidth: 2 },
    sm: { viewBox: 24, radius: 10, strokeWidth: 2 },
    md: { viewBox: 32, radius: 14, strokeWidth: 4 },
    lg: { viewBox: 48, radius: 22, strokeWidth: 4 },
  }[size]

  const center = geometry.viewBox / 2
  const circumference = 2 * Math.PI * geometry.radius

  return (
    <div
      data-slot="spinner"
      role="status"
      aria-label="loading"
      className={cn(spinnerVariants({ fullscreen, dim, className }))}
      {...props}
    >
      <svg
        data-slot="spinner-svg"
        viewBox={`0 0 ${geometry.viewBox} ${geometry.viewBox}`}
        fill="none"
        className="spinner-svg-base"
        width={geometry.viewBox}
        height={geometry.viewBox}
      >
        {/* 배경 원 (트랙) */}
        <circle
          data-slot="spinner-track"
          cx={center}
          cy={center}
          r={geometry.radius}
          strokeWidth={geometry.strokeWidth}
          className="spinner-track-base"
        />
        {/* 회전하는 원 (인디케이터) */}
        <circle
          data-slot="spinner-indicator"
          cx={center}
          cy={center}
          r={geometry.radius}
          strokeWidth={geometry.strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          className="spinner-indicator-base"
        />
      </svg>
    </div>
  )
}
