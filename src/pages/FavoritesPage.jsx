import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiHeart, FiTwitter } from 'react-icons/fi'
import { getTweetUrl } from '../utils/share'

export default function FavoritesPage({ favorites, onRemove, showToast }) {
  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gray-100/80 dark:bg-white/5 flex items-center justify-center
          border border-gray-200/50 dark:border-white/10">
          <FiHeart className="w-8 h-8 text-gray-300 dark:text-gray-700" />
        </div>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No favorites yet</h2>
        <p className="text-sm text-gray-400 dark:text-gray-600 max-w-sm mx-auto">
          Tap the heart icon on any quote to save it here. Your favorites are stored locally.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Your Favorites
        </h2>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          {favorites.length} quote{favorites.length !== 1 ? 's' : ''} saved
        </p>
      </motion.div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {favorites.map((quote, i) => (
            <motion.div
              key={quote.text + quote.author}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="group relative p-6 sm:p-8 rounded-2xl
                bg-white/80 dark:bg-white/[0.06] backdrop-blur-xl
                border border-gray-200/50 dark:border-white/10
                shadow-xl dark:shadow-black/20
                hover:shadow-2xl transition-all duration-300"
            >
              <p className="font-serif text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-3 pr-16">
                "{quote.text}"
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
                — {quote.author}
              </p>

              {quote.category && (
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-bold
                  uppercase tracking-widest bg-gray-100/80 dark:bg-white/5 text-gray-500 dark:text-gray-400
                  border border-gray-200/50 dark:border-white/10">
                  {quote.category}
                </span>
              )}

              <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={getTweetUrl(quote)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-gray-100/80 dark:bg-white/10 hover:bg-blue-50 dark:hover:bg-blue-500/10
                    text-gray-400 hover:text-blue-500 transition-all duration-200"
                  aria-label="Tweet this quote"
                >
                  <FiTwitter className="w-4 h-4" />
                </a>
                <button
                  onClick={() => {
                    onRemove(quote)
                    showToast('Removed from favorites', 'error')
                  }}
                  className="p-2 rounded-xl bg-gray-100/80 dark:bg-white/10 hover:bg-red-50 dark:hover:bg-red-500/10
                    text-gray-400 hover:text-red-500 transition-all duration-200"
                  aria-label="Remove from favorites"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
