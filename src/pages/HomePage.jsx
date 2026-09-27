import { useEffect, useCallback } from 'react'
import QuoteCard from '../components/QuoteCard'
import ButtonGroup from '../components/ButtonGroup'
import CategoryFilter from '../components/CategoryFilter'
import { useQuotes } from '../hooks/useQuotes'
import { shareQuote } from '../utils/share'

export default function HomePage({ isFavorite, onToggleFavorite, showToast }) {
  const {
    currentQuote,
    currentColor,
    isLoading,
    category,
    totalInCategory,
    getRandomQuote,
    changeCategory,
  } = useQuotes()

  const handleShare = useCallback(async () => {
    const result = await shareQuote(currentQuote, window.location.href)
    if (result.success && !result.cancelled) {
      if (result.method === 'clipboard') {
        showToast('Quote copied to clipboard!')
      }
    }
  }, [currentQuote, showToast])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        getRandomQuote()
      }
      if (e.key === 'f' || e.key === 'F') {
        onToggleFavorite(currentQuote)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [getRandomQuote, onToggleFavorite, currentQuote])

  return (
    <div className="w-full flex flex-col items-center">
      <CategoryFilter activeCategory={category} onChange={changeCategory} />

      <QuoteCard
        quote={currentQuote}
        color={currentColor}
        isLoading={isLoading}
      />

      <ButtonGroup
        quote={currentQuote}
        color={currentColor}
        isLoading={isLoading}
        onNewQuote={getRandomQuote}
        onShare={handleShare}
        isFavorite={isFavorite(currentQuote)}
        onToggleFavorite={() => onToggleFavorite(currentQuote)}
      />

      {/* Quote counter */}
      <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span>Endless quotes powered by API</span>
      </div>

      {/* Keyboard hint */}
      <div className="mt-3 hidden md:flex items-center gap-4 text-[11px] text-gray-400/60 dark:text-gray-600">
        <span className="flex items-center gap-1.5">
          <kbd className="px-2 py-1 rounded-lg bg-gray-100/80 dark:bg-white/5 text-gray-500 dark:text-gray-500 font-mono text-[10px] border border-gray-200/50 dark:border-white/10 shadow-sm">Space</kbd>
          <span>New quote</span>
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-2 py-1 rounded-lg bg-gray-100/80 dark:bg-white/5 text-gray-500 dark:text-gray-500 font-mono text-[10px] border border-gray-200/50 dark:border-white/10 shadow-sm">F</kbd>
          <span>Favorite</span>
        </span>
      </div>
    </div>
  )
}
