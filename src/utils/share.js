export const getTweetUrl = (quote) => {
  const tweetText = `"${quote.text}" - ${quote.author}`
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
}

export const shareQuote = async (quote, url) => {
  const shareText = `"${quote.text}" - ${quote.author}`

  if (navigator.share) {
    try {
      await navigator.share({ text: shareText, url })
      return { success: true, cancelled: false }
    } catch (err) {
      if (err.name === 'AbortError') return { success: true, cancelled: true }
      return { success: false, cancelled: false, error: err }
    }
  }

  try {
    await navigator.clipboard.writeText(shareText)
    return { success: true, cancelled: false, method: 'clipboard' }
  } catch (err) {
    return { success: false, cancelled: false, error: err }
  }
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
