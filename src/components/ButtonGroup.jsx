import { motion } from 'framer-motion'
import { FiRefreshCw, FiTwitter, FiShare2, FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { getTweetUrl } from '../utils/share'

export default function ButtonGroup({ quote, color, isLoading, onNewQuote, onShare, isFavorite, onToggleFavorite }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-3xl mx-auto mt-8">
      {/* Social buttons */}
      <div className="flex gap-3 w-full sm:w-auto order-2 sm:order-1">
        <motion.a
          id="tweet-quote"
          href={getTweetUrl(quote)}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl
            text-sm font-semibold border-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm
            hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300
            shadow-lg hover:shadow-xl"
          style={{ color, borderColor: color + '60' }}
          aria-label="Tweet this quote"
        >
          <FiTwitter className="w-4 h-4" />
          <span>Tweet</span>
        </motion.a>

        <motion.button
          onClick={onShare}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl
            text-sm font-semibold border-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm
            hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300
            shadow-lg hover:shadow-xl"
          style={{ color, borderColor: color + '60' }}
          aria-label="Share this quote"
        >
          <FiShare2 className="w-4 h-4" />
          <span>Share</span>
        </motion.button>

        <motion.button
          onClick={onToggleFavorite}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl
            text-sm font-semibold border-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm
            hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300
            shadow-lg hover:shadow-xl"
          style={{ borderColor: isFavorite ? '#ef444460' : color + '60', color: isFavorite ? '#ef4444' : color }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <FaHeart className="w-4 h-4" />
            </motion.div>
          ) : (
            <FiHeart className="w-4 h-4" />
          )}
          <span>{isFavorite ? 'Saved' : 'Save'}</span>
        </motion.button>
      </div>

      {/* New Quote button */}
      <motion.button
        id="new-quote"
        onClick={onNewQuote}
        disabled={isLoading}
        whileHover={!isLoading ? { scale: 1.05, y: -2 } : {}}
        whileTap={!isLoading ? { scale: 0.95 } : {}}
        className="w-full sm:w-auto order-1 sm:order-2 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl
          text-sm font-bold text-white shadow-2xl transition-all duration-300
          hover:shadow-3xl"
        style={{
          backgroundColor: color,
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          boxShadow: `0 20px 40px -10px ${color}60`,
        }}
      >
        <motion.div
          animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
          transition={isLoading ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : {}}
        >
          <FiRefreshCw className="w-4 h-4" />
        </motion.div>
        <span>{isLoading ? 'Loading...' : 'New Quote'}</span>
      </motion.button>
    </div>
  )
}
