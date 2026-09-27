import { motion } from 'framer-motion'
import { FiGithub, FiHeart, FiZap, FiCode, FiSmartphone } from 'react-icons/fi'

export default function AboutPage() {
  const features = [
    { icon: FiZap, label: 'Endless Quotes', desc: 'Powered by API' },
    { icon: FiHeart, label: 'Favorites', desc: 'Save locally' },
    { icon: FiSmartphone, label: 'Responsive', desc: 'Mobile-first' },
    { icon: FiCode, label: 'Open Source', desc: 'On GitHub' },
  ]

  const techStack = ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Vitest']

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="rounded-3xl p-8 sm:p-10
        bg-white/80 dark:bg-white/[0.06] backdrop-blur-2xl
        border border-gray-200/50 dark:border-white/10
        shadow-2xl dark:shadow-black/30">
        
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500
            flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            About Quote Machine
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
            A premium random quote generator built with modern web technologies.
            Browse by category, save favorites, and share inspiration.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {features.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-2xl bg-gray-50/80 dark:bg-white/[0.03] text-center
                border border-gray-200/50 dark:border-white/5"
            >
              <Icon className="w-5 h-5 mx-auto mb-2 text-purple-500 dark:text-purple-400" />
              <div className="text-sm font-bold text-gray-800 dark:text-gray-200">{label}</div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="text-center mb-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map(tech => (
              <span key={tech} className="px-3 py-1.5 rounded-xl text-xs font-semibold
                bg-gray-100/80 dark:bg-white/5 text-gray-600 dark:text-gray-400
                border border-gray-200/50 dark:border-white/10">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* GitHub link */}
        <div className="text-center">
          <a
            href="https://github.com/Badboixixi77/quote-machine"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl
              bg-gray-900 dark:bg-white text-white dark:text-gray-900
              font-bold text-sm shadow-xl hover:shadow-2xl
              hover:opacity-90 transition-all duration-300"
          >
            <FiGithub className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </div>
    </motion.div>
  )
}
