import { motion } from 'framer-motion'
import { categories } from '../data/quotes'

export default function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 w-full max-w-3xl mx-auto px-2">
      {categories.map((cat, i) => (
        <motion.button
          key={cat}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(cat)}
          className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300
            overflow-hidden group
            ${activeCategory === cat
              ? 'text-gray-900 dark:text-white shadow-xl'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
        >
          {activeCategory === cat && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-white dark:bg-white/15 backdrop-blur-sm rounded-2xl shadow-lg"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat}</span>
          {activeCategory !== cat && (
            <div className="absolute inset-0 bg-white/0 dark:bg-white/0 group-hover:bg-white/50 dark:group-hover:bg-white/5 transition-colors duration-300 rounded-2xl" />
          )}
        </motion.button>
      ))}
    </div>
  )
}
