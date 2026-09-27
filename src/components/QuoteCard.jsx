import { motion } from 'framer-motion'

export default function QuoteCard({ quote, color, isLoading }) {
  return (
    <motion.div
      id="quote-box"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      className="relative w-full max-w-3xl mx-auto"
    >
      {/* Glow effect behind card */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-20 blur-2xl transition-all duration-700"
        style={{ backgroundColor: color }}
      />
      
      <div
        className="relative rounded-3xl p-6 sm:p-8 md:p-12 text-center
          bg-white/90 dark:bg-white/[0.07] backdrop-blur-2xl
          border border-gray-200/50 dark:border-white/10
          shadow-2xl dark:shadow-black/40
          transition-all duration-500"
        style={{
          transform: isLoading ? 'scale(0.98)' : 'scale(1)',
          opacity: isLoading ? 0.9 : 1,
        }}
      >
        {/* Quote text */}
        <motion.div
          id="text"
          data-testid="quote-text"
          key={quote.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-6 transition-all duration-500"
          style={{ color, opacity: isLoading ? 0.3 : 1 }}
        >
          <span className="text-3xl sm:text-4xl md:text-5xl leading-none opacity-30 font-serif">"</span>
          <span className="mx-1">{quote.text}</span>
          <span className="text-3xl sm:text-4xl md:text-5xl leading-none opacity-30 font-serif">"</span>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-16 h-px mx-auto mb-6 rounded-full"
          style={{ backgroundColor: color + '40' }}
        />

        {/* Author */}
        <motion.div
          id="author"
          data-testid="quote-author"
          key={quote.author + quote.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 mb-6 transition-opacity duration-500"
          style={{ opacity: isLoading ? 0.3 : 1 }}
        >
          — {quote.author}
        </motion.div>

        {/* Category badge */}
        {quote.category && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-2"
          >
            <span
              className="px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase
                bg-gradient-to-r from-transparent to-transparent border-2
                transition-all duration-500"
              style={{ color, borderColor: color + '50' }}
            >
              {quote.category}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
