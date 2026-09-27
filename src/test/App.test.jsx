import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  test('renders the home page by default', () => {
    render(<App />)
    expect(screen.getByTestId('quote-text')).toBeInTheDocument()
    expect(screen.getByTestId('quote-author')).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    render(<App />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Favorites')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  test('renders the New Quote button', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /new quote/i })).toBeInTheDocument()
  })

  test('renders category filter buttons', () => {
    render(<App />)
    expect(screen.getByText('All')).toBeInTheDocument()
    // Category names may appear in both filter chips and quote badges
    expect(screen.getAllByText('Motivational').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Philosophy').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Life').length).toBeGreaterThanOrEqual(1)
  })
})
