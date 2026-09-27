// Quote API service using multiple free APIs for reliability
// Primary: quotable.io, Fallback: quote-garden

const APIs = {
  quotable: {
    url: 'https://api.quotable.io/random',
    parse: (data) => ({
      text: data.content,
      author: data.author,
      tags: data.tags || [],
    }),
  },
  quotecatalog: {
    url: 'https://api.quotecatalog.com/quotes/random',
    parse: (data) => ({
      text: data.quote?.text || data.text,
      author: data.quote?.author || data.author,
      tags: [],
    }),
  },
}

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
  // Try quotable.io first
  try {
    let url = APIs.quotable.url
    
    if (category !== 'All' && categoryToTag[category]) {
      url += `?tags=${categoryToTag[category]}`
    }

    const response = await fetch(url, { 
      signal: AbortSignal.timeout(5000) // 5 second timeout
    })
    
    if (response.ok) {
      const data = await response.json()
      if (data && data.content) {
        return {
          text: data.content,
          author: data.author,
          category: category === 'All' ? detectCategory(data.tags) : category,
          source: 'quotable',
        }
      }
    }
  } catch (error) {
    console.warn('Quotable API failed, trying fallback...', error.message)
  }

  // Fallback: Use a different approach - fetch from a CORS-friendly API
  try {
    const response = await fetch('https://type.fit/api/quotes', {
      signal: AbortSignal.timeout(5000)
    })
    
    if (response.ok) {
      const data = await response.json()
      const randomIndex = Math.floor(Math.random() * data.length)
      const quote = data[randomIndex]
      
      return {
        text: quote.text?.trim() || '',
        author: quote.author?.trim() || 'Unknown',
        category: category === 'All' ? 'Life' : category,
        source: 'typefit',
      }
    }
  } catch (error) {
    console.warn('Type.fit API also failed:', error.message)
  }

  // All APIs failed
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
