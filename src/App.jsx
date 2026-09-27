import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Toast from './components/Toast'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'
import AboutPage from './pages/AboutPage'
import { useTheme } from './hooks/useTheme'
import { useFavorites } from './hooks/useFavorites'
import { useToast } from './hooks/useToast'

function AppContent() {
  const { theme, toggleTheme } = useTheme()
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites()
  const { toast, showToast, hideToast } = useToast()

  const handleToggleFavorite = (quote) => {
    const added = toggleFavorite(quote)
    showToast(added ? 'Added to favorites!' : 'Removed from favorites', added ? 'success' : 'error')
  }

  return (
    <Layout theme={theme} onToggleTheme={toggleTheme}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              showToast={showToast}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onRemove={removeFavorite}
              showToast={showToast}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Toast toast={toast} onClose={hideToast} />
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
