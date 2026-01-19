import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CheckBox } from '../check-box'

describe('CheckBox', () => {
  it('체크박스를 클릭하면 상태가 변경되어야 한다 (Uncontrolled)', () => {
    // CheckBox now handles label rendering if provided, but here we can just test the control
    render(<CheckBox id="c1" label="label" />)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('라벨을 클릭하면 상태가 변경되어야 한다 (htmlFor connection)', () => {
    // label prop automatically creates the label and connection
    render(<CheckBox id="c2" label="label" />)
    const label = screen.getByText('label')
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(label)
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('disabled 상태일 때는 클릭이 무시되어야 한다', () => {
    const onCheckedChange = vi.fn()
    render(<CheckBox id="c3" disabled onCheckedChange={onCheckedChange} label="label" />)
    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    expect(onCheckedChange).not.toHaveBeenCalled()
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  it('indeterminate 상태가 올바르게 표시되어야 한다', () => {
    render(<CheckBox id="c4" checked="indeterminate" label="label" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
  })

  it('mode가 squared일 때 라벨 영역에 체크 아이콘이 표시되어야 한다', () => {
    const { container } = render(<CheckBox id="c5" mode="squared" label="label" checked />)
    // squared 모드에서 라벨 영역에 Lucide Check (viewBox="0 0 24 24")가 렌더링되는지 확인
    const svgIcons = container.querySelectorAll('svg')
    // squared 모드 + checked 상태에서는 라벨 영역에 추가 아이콘이 있어야 함
    const labelIcon = Array.from(svgIcons).find(svg => svg.getAttribute('viewBox') === '0 0 24 24')
    expect(labelIcon).toBeInTheDocument()
  })

  it('mode가 squared가 아닐 때 라벨 영역에 체크 아이콘이 표시되지 않아야 한다', () => {
    const { container } = render(<CheckBox id="c6" mode="default" label="label" checked />)
    // default 모드에서는 라벨 영역에 Lucide Check가 렌더링되지 않음
    // 라벨 내부의 Check 아이콘은 squared 모드에서만 표시됨
    const labelElement = container.querySelector('label')
    const labelIcon = labelElement?.querySelector('svg[class*="lucide-check"]')
    expect(labelIcon).toBeNull()
  })
})

import { CheckBoxGroup, CheckBoxContent } from '../check-box-group'

describe('CheckBoxGroup', () => {
  it('defaultValue를 통해 초기 선택 상태를 설정할 수 있다 (Uncontrolled)', () => {
    render(
      <CheckBoxGroup defaultValue={['opt1']}>
        <CheckBoxContent>
          <CheckBox value="opt1" label="Option 1" />
          <CheckBox value="opt2" label="Option 2" />
        </CheckBoxContent>
      </CheckBoxGroup>,
    )

    expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByLabelText('Option 2')).toHaveAttribute('aria-checked', 'false')
  })

  it('항목을 클릭하면 상태가 변경된다 (Uncontrolled)', () => {
    render(
      <CheckBoxGroup defaultValue={['opt1']}>
        <CheckBoxContent>
          <CheckBox value="opt1" label="Option 1" />
          <CheckBox value="opt2" label="Option 2" />
        </CheckBoxContent>
      </CheckBoxGroup>,
    )

    const opt2 = screen.getByLabelText('Option 2')
    fireEvent.click(opt2)

    expect(opt2).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-checked', 'true') // Should still be checked (multi-select)
  })

  it('항목을 클릭하여 해제할 수 있다 (Uncontrolled)', () => {
    render(
      <CheckBoxGroup defaultValue={['opt1']}>
        <CheckBoxContent>
          <CheckBox value="opt1" label="Option 1" />
        </CheckBoxContent>
      </CheckBoxGroup>,
    )

    const opt1 = screen.getByLabelText('Option 1')
    fireEvent.click(opt1)

    expect(opt1).toHaveAttribute('aria-checked', 'false')
  })

  it('Controlled 모드에서 onValueChange가 호출되어야 한다', () => {
    const onValueChange = vi.fn()
    render(
      <CheckBoxGroup value={['opt1']} onValueChange={onValueChange}>
        <CheckBoxContent>
          <CheckBox value="opt1" label="Option 1" />
          <CheckBox value="opt2" label="Option 2" />
        </CheckBoxContent>
      </CheckBoxGroup>,
    )

    const opt2 = screen.getByLabelText('Option 2')
    fireEvent.click(opt2)

    expect(onValueChange).toHaveBeenCalledWith(['opt1', 'opt2'])
  })

  it('Controlled 모드에서는 외부 값에 의존한다', () => {
    const { rerender } = render(
      <CheckBoxGroup value={['opt1']}>
        <CheckBoxContent>
          <CheckBox value="opt1" label="Option 1" />
          <CheckBox value="opt2" label="Option 2" />
        </CheckBoxContent>
      </CheckBoxGroup>,
    )

    expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByLabelText('Option 2')).toHaveAttribute('aria-checked', 'false')

    rerender(
      <CheckBoxGroup value={['opt2']}>
        <CheckBoxContent>
          <CheckBox value="opt1" label="Option 1" />
          <CheckBox value="opt2" label="Option 2" />
        </CheckBoxContent>
      </CheckBoxGroup>,
    )

    expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByLabelText('Option 2')).toHaveAttribute('aria-checked', 'true')
  })
})
