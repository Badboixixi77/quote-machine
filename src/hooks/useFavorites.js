import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'quote-machine-favorites'

const loadFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = useCallback(
    (quote) => favorites.some(f => f.text === quote.text && f.author === quote.author),
    [favorites]
  )

  const toggleFavorite = useCallback((quote) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.text === quote.text && f.author === quote.author)
      if (exists) return prev.filter(f => !(f.text === quote.text && f.author === quote.author))
      return [...prev, quote]
    })
    return !isFavorite(quote)
  }, [isFavorite])

  const removeFavorite = useCallback((quote) => {
    setFavorites(prev => prev.filter(f => !(f.text === quote.text && f.author === quote.author)))
  }, [])

  return { favorites, isFavorite, toggleFavorite, removeFavorite }
}
