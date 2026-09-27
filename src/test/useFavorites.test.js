import { renderHook, act } from '@testing-library/react'
import { describe, test, expect, beforeEach } from 'vitest'
import { useFavorites } from '../hooks/useFavorites'

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('starts with empty favorites', () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([])
  })

  test('adds a favorite', () => {
    const { result } = renderHook(() => useFavorites())
    const quote = { text: 'Test quote', author: 'Test Author', category: 'Life' }

    act(() => {
      result.current.toggleFavorite(quote)
    })

    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.favorites[0].text).toBe('Test quote')
  })

  test('removes a favorite', () => {
    const { result } = renderHook(() => useFavorites())
    const quote = { text: 'Test quote', author: 'Test Author', category: 'Life' }

    act(() => {
      result.current.toggleFavorite(quote)
    })
    expect(result.current.favorites).toHaveLength(1)

    act(() => {
      result.current.toggleFavorite(quote)
    })
    expect(result.current.favorites).toHaveLength(0)
  })

  test('isFavorite returns correct value', () => {
    const { result } = renderHook(() => useFavorites())
    const quote = { text: 'Test quote', author: 'Test Author', category: 'Life' }

    expect(result.current.isFavorite(quote)).toBe(false)

    act(() => {
      result.current.toggleFavorite(quote)
    })

    expect(result.current.isFavorite(quote)).toBe(true)
  })

  test('removeFavorite removes the quote', () => {
    const { result } = renderHook(() => useFavorites())
    const quote = { text: 'Test quote', author: 'Test Author', category: 'Life' }

    act(() => {
      result.current.toggleFavorite(quote)
    })
    expect(result.current.favorites).toHaveLength(1)

    act(() => {
      result.current.removeFavorite(quote)
    })
    expect(result.current.favorites).toHaveLength(0)
  })

  test('persists favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites())
    const quote = { text: 'Test quote', author: 'Test Author', category: 'Life' }

    act(() => {
      result.current.toggleFavorite(quote)
    })

    const stored = JSON.parse(localStorage.getItem('quote-machine-favorites'))
    expect(stored).toHaveLength(1)
    expect(stored[0].text).toBe('Test quote')
  })
})
