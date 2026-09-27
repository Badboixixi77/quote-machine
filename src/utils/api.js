// Multi-API Quote Service - Maximum quote variety
// Tries multiple free APIs for endless unique quotes

const API_TIMEOUT = 5000 // 5 seconds

// Map our categories to quotable tags
const categoryToTag = {
  Motivational: 'motivation|inspirational|success',
  Philosophy: 'philosophy|wisdom',
  Life: 'life|future',
  Wisdom: 'wisdom|knowledge|learning',
  Love: 'love|friendship',
  Humor: 'humor|funny',
}

// API 1: Quotable.io (when it works)
async function fetchFromQuotable(category = 'All') {
  try {
    let url = 'https://api.quotable.io/random'
    
    if (category !== 'All' && categoryToTag[category]) {
      url += `?tags=${categoryToTag[category]}`
    }

    const response = await fetch(url, { signal: AbortSignal.timeout(API_TIMEOUT) })
    
    if (response.ok) {
      const data = await response.json()
      if (data && data.content) {
        return {
          text: data.content,
          author: data.author,
          category: category === 'All' ? detectCategory(data.tags) : category,
        }
      }
    }
  } catch (error) {
    console.warn('Quotable API failed:', error.message)
  }
  return null
}

// API 2: Type.fit (1600+ quotes, very reliable)
async function fetchFromTypeFit(category = 'All') {
  try {
    const response = await fetch('https://type.fit/api/quotes', {
      signal: AbortSignal.timeout(API_TIMEOUT)
    })
    
    if (response.ok) {
      const data = await response.json()
      const randomIndex = Math.floor(Math.random() * data.length)
      const quote = data[randomIndex]
      
      return {
        text: quote.text?.trim() || '',
        author: quote.author?.trim() || 'Unknown',
        category: category === 'All' ? 'Life' : category,
      }
    }
  } catch (error) {
    console.warn('Type.fit API failed:', error.message)
  }
  return null
}

// API 3: Quote Garden (large database)
async function fetchFromQuoteGarden(category = 'All') {
  try {
    const response = await fetch('https://quote-garden.onrender.com/api/v3/quotes/random', {
      signal: AbortSignal.timeout(API_TIMEOUT)
    })
    
    if (response.ok) {
      const data = await response.json()
      if (data && data.data && data.data[0]) {
        const quote = data.data[0]
        return {
          text: quote.quoteText?.trim() || '',
          author: quote.quoteAuthor?.trim() || 'Unknown',
          category: category === 'All' ? 'Life' : category,
        }
      }
    }
  } catch (error) {
    console.warn('Quote Garden API failed:', error.message)
  }
  return null
}

// API 4: Forismatic (motivational quotes)
async function fetchFromForismatic(category = 'All') {
  try {
    const response = await fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', {
      signal: AbortSignal.timeout(API_TIMEOUT)
    })
    
    if (response.ok) {
      const data = await response.json()
      if (data && data.quoteText) {
        return {
          text: data.quoteText?.trim() || '',
          author: data.quoteAuthor?.trim() || 'Unknown',
          category: category === 'All' ? 'Motivational' : category,
        }
      }
    }
  } catch (error) {
    console.warn('Forismatic API failed:', error.message)
  }
  return null
}

// Main function - tries multiple APIs in order
export async function fetchRandomQuote(category = 'All') {
  // Try APIs in order of reliability
  const apis = [
    fetchFromTypeFit,      // Most reliable
    fetchFromQuoteGarden,  // Large database
    fetchFromForismatic,   // Motivational focus
    fetchFromQuotable,     // When it works
  ]

  for (const api of apis) {
    const quote = await api(category)
    if (quote && quote.text && quote.text.length > 10) {
      return quote
    }
  }

  // All APIs failed
  console.error('All quote APIs failed')
  return null
}

// Helper to map API tags to our categories
function detectCategory(tags = []) {
  if (tags.some(t => ['motivation', 'inspirational', 'success'].includes(t))) return 'Motivational'
  if (tags.some(t => ['philosophy', 'wisdom'].includes(t))) return 'Philosophy'
  if (tags.some(t => ['life', 'future'].includes(t))) return 'Life'
  if (tags.some(t => ['wisdom', 'knowledge', 'learning'].includes(t))) return 'Wisdom'
  if (tags.some(t => ['love', 'friendship'].includes(t))) return 'Love'
  if (tags.some(t => ['humor', 'funny'].includes(t))) return 'Humor'
  return 'Life'
}
