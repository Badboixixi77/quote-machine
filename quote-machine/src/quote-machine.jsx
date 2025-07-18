"use client"

import { useState, useEffect } from "react"

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr.",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
    author: "Unknown",
  },
  {
    text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
    author: "Steve Jobs",
  },
  {
    text: "Experience is a hard teacher because she gives the test first, the lesson afterward.",
    author: "Vernon Law",
  },
  {
    text: "To live is the rarest thing in the world. Most people just exist.",
    author: "Oscar Wilde",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
  },
  {
    text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
    author: "Henry David Thoreau",
  },
]

const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
]

const QuoteMachine = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [currentColor, setCurrentColor] = useState(colors[0])
  const [isLoading, setIsLoading] = useState(false)

  const getRandomQuote = () => {
    setIsLoading(true)

    setTimeout(() => {
      let newQuote
      let newColor

      // Ensure we don't get the same quote twice in a row
      do {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)]
      } while (newQuote.text === currentQuote.text && quotes.length > 1)

      // Ensure we don't get the same color twice in a row
      do {
        newColor = colors[Math.floor(Math.random() * colors.length)]
      } while (newColor === currentColor && colors.length > 1)

      setCurrentQuote(newQuote)
      setCurrentColor(newColor)
      setIsLoading(false)
    }, 500)
  }

  const getTweetUrl = () => {
    const tweetText = `"${currentQuote.text}" - ${currentQuote.author}`
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
  }

  // Set initial random quote on component mount
  useEffect(() => {
    const initialQuote = quotes[Math.floor(Math.random() * quotes.length)]
    const initialColor = colors[Math.floor(Math.random() * colors.length)]
    setCurrentQuote(initialQuote)
    setCurrentColor(initialColor)

    // Load FreeCodeCamp test script
    const script = document.createElement("script")
    script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const styles = {
    app: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: currentColor,
      transition: "background-color 0.5s ease",
      fontFamily: "Arial, sans-serif",
    },
    quoteBox: {
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      padding: "40px",
      maxWidth: "600px",
      width: "100%",
      textAlign: "center",
      transform: isLoading ? "scale(0.98)" : "scale(1)",
      transition: "all 0.5s ease",
    },
    text: {
      fontSize: "28px",
      fontFamily: "Georgia, serif",
      marginBottom: "20px",
      color: currentColor,
      opacity: isLoading ? 0.5 : 1,
      transition: "all 0.5s ease",
      lineHeight: "1.4",
    },
    author: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "30px",
      color: currentColor,
      opacity: isLoading ? 0.5 : 1,
      transition: "all 0.5s ease",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
    },
    button: {
      backgroundColor: currentColor,
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "5px",
      cursor: isLoading ? "not-allowed" : "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
      opacity: isLoading ? 0.7 : 1,
      transform: "scale(1)",
    },
    tweetButton: {
      backgroundColor: currentColor,
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
    },
    icon: {
      width: "16px",
      height: "16px",
    },
    footer: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      color: "white",
      fontSize: "14px",
      opacity: 0.7,
    },
  }

  return (
    <div style={styles.app}>
      <div id="quote-box" style={styles.quoteBox}>
        <div id="text" style={styles.text}>
          <span style={{ fontSize: "40px" }}>"</span>
          {currentQuote.text}
          <span style={{ fontSize: "40px" }}>"</span>
        </div>

        <div id="author" style={styles.author}>
          - {currentQuote.author}
        </div>

        <div style={styles.buttonContainer}>
          <a
            id="tweet-quote"
            href={getTweetUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.tweetButton}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            <svg style={styles.icon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            Tweet
          </a>

          <button
            id="new-quote"
            onClick={getRandomQuote}
            disabled={isLoading}
            style={styles.button}
            onMouseEnter={(e) => !isLoading && (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            <svg
              style={{
                ...styles.icon,
                transform: isLoading ? "rotate(360deg)" : "rotate(0deg)",
                transition: "transform 0.5s ease",
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            {isLoading ? "Loading..." : "New Quote"}
          </button>
        </div>
      </div>

      <div style={styles.footer}>
        by <strong>maxwell</strong>
      </div>
    </div>
  )
}

export default QuoteMachine
