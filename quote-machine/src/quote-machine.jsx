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
    text: "To live is the rarest thing in the world. Most people exist, that is all.",
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
  {
    text: "In the end, it is not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
  },
  {
    text: "The unexamined life is not worth living.",
    author: "Socrates",
  },
  {
    text: "Get busy living or get busy dying.",
    author: "Stephen King",
  },
  {
    text: "Time moves slowly, but passes quickly.",
    author: "Alice Walker",
  },
  {
    text: "There are years that ask questions and years that answer.",
    author: "Zora Neale Hurston",
  },
  {
    text: "Life, although it may only be an accumulation of anguish, is dear to me and I will defend it.",
    author: "Mary Shelley",
  },
  {
    text: "What do we live for, if it is not to make life less difficult to each other?",
    author: "George Eliot",
  },
  {
    text: "Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.",
    author: "Paulo Coelho",
  },
  {
    text: "There is no greater agony than bearing an untold story inside you.",
    author: "Maya Angelou",
  },
  {
    text: "Isn't it nice to think that tomorrow is a new day with no mistakes in it yet?",
    author: "Lucy Maud Montgomery",
  },
  {
    text: "Anything worth dying for is certainly worth living for.",
    author: "Joseph Heller",
  },
  {
    text: "I took a deep breath and listened to the old brag of my heart: I am, I am, I am.",
    author: "Sylvia Plath",
  },
  {
    text: "It is the possibility of having a dream come true that makes life interesting.",
    author: "Paulo Coelho",
  },
  {
    text: "I can't stand it to think my life is going so fast and I'm not really living it.",
    author: "Ernest Hemingway",
  },
  {
    text: "This is your life and it's ending one minute at a time.",
    author: "Chuck Palahniuk",
  },
  {
    text: "I have a dream.",
    author: "Martin Luther King Jr.",
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    text: "The best way to find out if you can trust somebody is to trust them.",
    author: "Ernest Hemingway",
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "The only thing that feels better than winning is winning when nobody thought you could.",
    author: "Hank Aaron",
  },
  {
    text: "The most important thing is to enjoy your life — to be happy — it's all that matters.",
    author: "Audrey Hepburn",
  },
  {
    text: "You can have anything you want if you are willing to give up everything you have.",
    author: "Oprah Winfrey",
  },
  {
    text: "In order to be truly happy, you must pursue your dreams and goals.",
    author: "Oprah Winfrey",
  },
  {
    text: "If you want something you've never had, you must be willing to do something you've never done.",
    author: "Unknown",
  },
]

const colors = [
  // Deep teal
  "#0F766E",
  // Indigo
  "#3730A3",
  // Royal blue
  "#1D4ED8",
  // Emerald
  "#059669",
  // Amber
  "#D97706",
  // Slate
  "#334155",
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
      background: "linear-gradient(135deg, #020617 0%, #0f172a 40%, #111827 100%)",
      transition: "background 0.6s ease",
      fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    quoteBox: {
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: "0 24px 60px rgba(15,23,42,0.65)",
      padding: "32px 32px 28px",
      maxWidth: "600px",
      width: "100%",
      textAlign: "center",
      transform: isLoading ? "scale(0.98)" : "scale(1)",
      transition: "all 0.5s ease",
    },
    text: {
      fontSize: "clamp(1.6rem, 2vw + 0.5rem, 2rem)",
      fontWeight: 500,
      marginBottom: "16px",
      color: currentColor,
      opacity: isLoading ? 0.5 : 1,
      transition: "all 0.5s ease",
      lineHeight: "1.4",
    },
    author: {
      fontSize: "0.95rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      marginBottom: "26px",
      color: "#4b5563",
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
      padding: "10px 20px",
      borderRadius: "999px",
      cursor: isLoading ? "not-allowed" : "pointer",
      fontSize: "0.95rem",
      fontWeight: 600,
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
      opacity: isLoading ? 0.7 : 1,
      transform: "scale(1)",
      boxShadow: "0 14px 30px rgba(15,23,42,0.35)",
    },
    tweetButton: {
      backgroundColor: "transparent",
      color: currentColor,
      border: `1px solid ${currentColor}`,
      padding: "10px 18px",
      borderRadius: "999px",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: 500,
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
      fontSize: "12px",
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
