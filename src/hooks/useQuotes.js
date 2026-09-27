import { useState, useCallback, useMemo, useRef } from 'react'
import { quotes as localQuotes } from '../data/quotes'
import { fetchRandomQuote } from '../utils/api'

const colors = ['#22C55E', '#EC4899', '#F97316', '#6366F1', '#06B6D4', '#FACC15']

const pickRandom = (arr, exclude) => {
  if (arr.length <= 1) return arr[0]
  let item
  do {
    item = arr[Math.floor(Math.random() * arr.length)]
  } while (exclude && item.text === exclude.text)
  return item
}

const pickColor = (exclude) => {
  if (colors.length <= 1) return colors[0]
  let color
  do {
    color = colors[Math.floor(Math.random() * colors.length)]
  } while (color === exclude)
  return color
}

export function useQuotes() {
  const [category, setCategory] = useState('All')
  const [currentQuote, setCurrentQuote] = useState(() => pickRandom(localQuotes))
  const [currentColor, setCurrentColor] = useState(() => colors[0])
  const [isLoading, setIsLoading] = useState(false)
  
  // Track shown quotes to avoid repetition
  const shownQuotesRef = useRef(new Set())
  const apiQuotePoolRef = useRef([])

  const filteredQuotes = useMemo(
    () => category === 'All' ? localQuotes : localQuotes.filter(q => q.category === category),
    [category]
  )

  const totalInCategory = filteredQuotes.length

  const getRandomQuote = useCallback(async () => {
    setIsLoading(true)

    try {
      // Try to fetch from API first
      let newQuote = await fetchRandomQuote(category)
      
      // If API fails or returns a quote we've already shown, try again (up to 3 times)
      let attempts = 0
      while (newQuote && shownQuotesRef.current.has(newQuote.text) && attempts < 3) {
        newQuote = await fetchRandomQuote(category)
        attempts++
      }
      
      // If API fails completely, fall back to local quotes
      if (!newQuote) {
        const pool = category === 'All' ? localQuotes : localQuotes.filter(q => q.category === category)
        if (pool.length > 0) {
          newQuote = pickRandom(pool, currentQuote)
        }
      }
      
      if (newQuote) {
        // Track this quote as shown
        shownQuotesRef.current.add(newQuote.text)
        
        // Keep the set from growing too large (keep last 100)
        if (shownQuotesRef.current.size > 100) {
          const arr = Array.from(shownQuotesRef.current)
          shownQuotesRef.current = new Set(arr.slice(-50))
        }
        
        const newColor = pickColor(currentColor)
        setCurrentQuote(newQuote)
        setCurrentColor(newColor)
      }
    } catch (error) {
      console.error('Error getting random quote:', error)
      // Fallback to local quotes
      const pool = category === 'All' ? localQuotes : localQuotes.filter(q => q.category === category)
      if (pool.length > 0) {
        const newQuote = pickRandom(pool, currentQuote)
        setCurrentQuote(newQuote)
        setCurrentColor(pickColor(currentColor))
      }
    } finally {
      setIsLoading(false)
    }
  }, [category, currentQuote, currentColor])

  const changeCategory = useCallback(async (newCategory) => {
    setCategory(newCategory)
    
    // Try to fetch from API for the new category
    const apiQuote = await fetchRandomQuote(newCategory)
    
    if (apiQuote) {
      setCurrentQuote(apiQuote)
      setCurrentColor(pickColor(currentColor))
    } else {
      // Fallback to local quotes
      const pool = newCategory === 'All' ? localQuotes : localQuotes.filter(q => q.category === newCategory)
      if (pool.length > 0) {
        setCurrentQuote(pickRandom(pool))
        setCurrentColor(pickColor(currentColor))
      }
    }
  }, [currentColor])

  return {
    currentQuote,
    currentColor,
    isLoading,
    category,
    filteredQuotes,
    totalInCategory,
    getRandomQuote,
    changeCategory,
  }
}
