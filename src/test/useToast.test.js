import { renderHook, act } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { useToast } from '../hooks/useToast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  test('starts with no toast', () => {
    const { result } = renderHook(() => useToast())
    expect(result.current.toast).toBeNull()
  })

  test('shows a toast message', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast('Hello!')
    })

    expect(result.current.toast).toEqual({ message: 'Hello!', type: 'success' })
  })

  test('auto-dismisses after 2500ms', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast('Hello!')
    })
    expect(result.current.toast).not.toBeNull()

    act(() => {
      vi.advanceTimersByTime(2500)
    })
    expect(result.current.toast).toBeNull()
  })

  test('hides toast manually', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast('Hello!')
    })
    expect(result.current.toast).not.toBeNull()

    act(() => {
      result.current.hideToast()
    })
    expect(result.current.toast).toBeNull()
  })

  test('supports error type', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast('Error!', 'error')
    })

    expect(result.current.toast).toEqual({ message: 'Error!', type: 'error' })
  })
})
