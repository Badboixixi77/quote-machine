import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiHome, FiInfo } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'

export default function Layout({ children, theme, onToggleTheme }) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/favorites', label: 'Favorites', icon: FiHeart },
    { path: '/about', label: 'About', icon: FiInfo },
  ]

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden transition-colors duration-700
      bg-gradient-to-br from-slate-50 via-white to-slate-100
      dark:from-[#0a0e27] dark:via-[#111827] dark:to-[#0f172a]">
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 max-w-6xl w-full mx-auto">
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center
            shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
            Quote<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Machine</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <motion.div
              key={path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={path}
                className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer
                  ${location.pathname === path
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {location.pathname === path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-xl shadow-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="relative w-4 h-4" />
                <span className="relative hidden sm:inline">{label}</span>
              </Link>
            </motion.div>
          ))}
          <div className="ml-1 sm:ml-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-xs text-gray-400 dark:text-gray-600">
        <p>Crafted with precision using modern web technologies</p>
      </footer>
    </div>
  )
}
