// Quote API service using quotable.io (free, no auth required)
// Docs: https://github.com/lukePeavey/quotable

const API_BASE = 'https://api.quotable.io'

// Map our categories to quotable tags
const categoryToTag = {
  Motivational: 'motivation|inspirational|success',
  Philosophy: 'philosophy|wisdom',
  Life: 'life|future',
  Wisdom: 'wisdom|knowledge|learning',
  Love: 'love|friendship',
  Humor: 'humor|funny',
}

export async function fetchRandomQuote(category = 'All') {
  try {
    let url = `${API_BASE}/random`
    
    // Add tag filter if category is specified
    if (category !== 'All' && categoryToTag[category]) {
      url += `?tags=${categoryToTag[category]}`
    }

    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Transform to our format
    return {
      text: data.content,
      author: data.author,
      category: category === 'All' ? detectCategory(data.tags) : category,
    }
  } catch (error) {
    console.error('Failed to fetch quote from API:', error)
    return null
  }
}

export async function fetchMultipleQuotes(count = 10, category = 'All') {
  try {
    let url = `${API_BASE}/quotes/random?limit=${count}`
    
    if (category !== 'All' && categoryToTag[category]) {
      url += `&tags=${categoryToTag[category]}`
    }

    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    
    return data.map(quote => ({
      text: quote.content,
      author: quote.author,
      category: category === 'All' ? detectCategory(quote.tags) : category,
    }))
  } catch (error) {
    console.error('Failed to fetch quotes from API:', error)
    return []
  }
}

// Helper to map API tags to our categories
function detectCategory(tags = []) {
  if (tags.some(t => ['motivation', 'inspirational', 'success'].includes(t))) return 'Motivational'
  if (tags.some(t => ['philosophy', 'wisdom'].includes(t))) return 'Philosophy'
  if (tags.some(t => ['life', 'future'].includes(t))) return 'Life'
  if (tags.some(t => ['wisdom', 'knowledge', 'learning'].includes(t))) return 'Wisdom'
  if (tags.some(t => ['love', 'friendship'].includes(t))) return 'Love'
  if (tags.some(t => ['humor', 'funny'].includes(t))) return 'Humor'
  return 'Life' // default
}
