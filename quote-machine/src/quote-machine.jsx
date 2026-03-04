"use client"

import { useState, useEffect } from "react"
import { quotes } from "./quotes"
import { colors } from "./theme"
import "./QuoteMachine.css"

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

  return (
    <div className="quote-app">
      <div
        id="quote-box"
        className="quote-app__box"
        style={{
          transform: isLoading ? "scale(0.98)" : "scale(1)",
          opacity: isLoading ? 0.9 : 1,
        }}
      >
        <div
          id="text"
          data-testid="quote-text"
          className="quote-app__text"
          style={{
            color: currentColor,
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <span style={{ fontSize: "40px" }}>"</span>
          {currentQuote.text}
          <span style={{ fontSize: "40px" }}>"</span>
        </div>

        <div
          id="author"
          data-testid="quote-author"
          className="quote-app__author"
          style={{
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          - {currentQuote.author}
        </div>

        <div className="quote-app__buttons">
          <a
            id="tweet-quote"
            href={getTweetUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="quote-app__button--secondary"
            style={{
              color: currentColor,
              borderColor: currentColor,
            }}
            aria-label="Tweet this quote"
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "scale(1.05)"
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "scale(1)"
            }}
          >
            <svg className="quote-app__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            Tweet
          </a>

          <button
            id="new-quote"
            onClick={getRandomQuote}
            disabled={isLoading}
            className="quote-app__button"
            style={{
              backgroundColor: currentColor,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(event) => {
              if (!isLoading) {
                event.currentTarget.style.transform = "scale(1.05)"
              }
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "scale(1)"
            }}
          >
            <svg
              className="quote-app__icon"
              style={{
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

      <div className="quote-app__footer">
        by <strong>maxwell</strong>
      </div>
    </div>
  )
}

export default QuoteMachine
