import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Progress } from '../progress'

describe('Progress', () => {
  describe('렌더링', () => {
    it('기본 Progress를 렌더링한다', () => {
      render(<Progress value={50} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('data-slot="progress-root" 속성을 가진다', () => {
      render(<Progress value={50} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('data-slot', 'progress-root')
    })

    it('progress-indicator를 렌더링한다', () => {
      render(<Progress value={50} />)
      const indicator = screen
        .getByRole('progressbar')
        .querySelector('[data-slot="progress-indicator"]')
      expect(indicator).toBeInTheDocument()
    })
  })

  describe('value', () => {
    it('value에 따라 aria-valuenow를 설정한다', () => {
      render(<Progress value={75} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75')
    })

    it('value가 0일 때 aria-valuenow가 0이다', () => {
      render(<Progress value={0} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
    })

    it('value가 100일 때 aria-valuenow가 100이다', () => {
      render(<Progress value={100} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
    })

    it('value가 100을 초과해도 100%로 제한된다', () => {
      render(<Progress value={150} showValue />)
      expect(screen.getAllByText('100%')[0]).toBeInTheDocument()
    })

    it('value가 0 미만이어도 0%로 제한된다', () => {
      render(<Progress value={-10} showValue />)
      expect(screen.getAllByText('0%')[0]).toBeInTheDocument()
    })
  })

  describe('max', () => {
    it('기본 max는 100이다', () => {
      render(<Progress value={50} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100')
    })

    it('커스텀 max 값을 설정할 수 있다', () => {
      render(<Progress value={50} max={200} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200')
    })

    it('커스텀 max에 따라 퍼센트가 계산된다', () => {
      render(<Progress value={50} max={200} showValue />)
      expect(screen.getAllByText('25%')[0]).toBeInTheDocument()
    })
  })

  describe('showValue', () => {
    it('showValue가 false일 때 퍼센트를 표시하지 않는다', () => {
      render(<Progress value={50} showValue={false} />)
      expect(screen.queryByText('50%')).not.toBeInTheDocument()
    })

    it('showValue가 true일 때 퍼센트를 표시한다', () => {
      render(<Progress value={50} showValue />)
      expect(screen.getAllByText('50%')[0]).toBeInTheDocument()
    })

    it('50% 미만일 때 progress-value가 렌더링된다', () => {
      render(<Progress value={30} showValue />)
      const progressValue = screen
        .getByRole('progressbar')
        .querySelector('[data-slot="progress-value"]')
      expect(progressValue).toBeInTheDocument()
      expect(progressValue).toHaveTextContent('30%')
    })

    it('50% 이상일 때 progress-value가 렌더링된다', () => {
      render(<Progress value={70} showValue />)
      const progressValue = screen
        .getByRole('progressbar')
        .querySelector('[data-slot="progress-value"]')
      expect(progressValue).toBeInTheDocument()
      expect(progressValue).toHaveTextContent('70%')
    })
  })

  describe('sizes', () => {
    it('default size를 렌더링한다', () => {
      render(<Progress value={50} size="default" />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('data-size', 'default')
    })

    it('sm size를 렌더링한다', () => {
      render(<Progress value={50} size="sm" />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('data-size', 'sm')
    })

    it('lg size를 렌더링한다', () => {
      render(<Progress value={50} size="lg" />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('data-size', 'lg')
    })
  })

  describe('skeleton', () => {
    it('skeleton 상태에서 data-skeleton 속성을 가진다', () => {
      render(<Progress skeleton />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('data-skeleton')
    })

    it('skeleton 상태에서 aria-valuenow가 없다', () => {
      render(<Progress skeleton />)
      expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
    })

    it('skeleton 상태에서 showValue가 true여도 퍼센트를 표시하지 않는다', () => {
      render(<Progress skeleton showValue />)
      expect(screen.queryByText(/%/)).not.toBeInTheDocument()
    })
  })

  describe('접근성', () => {
    it('role="progressbar"를 가진다', () => {
      render(<Progress value={50} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('aria-valuemin="0"을 가진다', () => {
      render(<Progress value={50} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0')
    })

    it('aria-valuemax를 가진다', () => {
      render(<Progress value={50} max={100} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100')
    })
  })

  describe('className', () => {
    it('추가 className을 적용한다', () => {
      render(<Progress value={50} className="custom-class" />)
      expect(screen.getByRole('progressbar')).toHaveClass('custom-class')
    })
  })
})
