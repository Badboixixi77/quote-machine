import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiX } from 'react-icons/fi'

export default function Toast({ toast, onClose }) {
  if (!toast) return null

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
            flex items-center gap-3 px-5 py-3 rounded-xl
            bg-gray-900 dark:bg-white text-white dark:text-gray-900
            shadow-2xl font-medium text-sm"
        >
          {toast.type === 'success' ? (
            <FiCheck className="w-4 h-4 text-green-400 dark:text-green-600" />
          ) : (
            <FiX className="w-4 h-4 text-red-400 dark:text-red-600" />
          )}
          {toast.message}
          <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
            <FiX className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
