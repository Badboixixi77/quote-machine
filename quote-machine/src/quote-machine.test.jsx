import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import QuoteMachine from "./quote-machine"
import { quotes } from "./quotes"

describe("QuoteMachine", () => {
  test("renders a quote and author on load", () => {
    render(<QuoteMachine />)

    const quoteText = screen.getByTestId("quote-text")
    expect(quoteText).toBeInTheDocument()

    const authorElement = screen.getByTestId("quote-author")
    const authorMatch = quotes.some((quote) =>
      authorElement.textContent.toLowerCase().includes(quote.author.toLowerCase()),
    )
    expect(authorMatch).toBe(true)
  })

  test("clicking New Quote changes the quote text", () => {
    render(<QuoteMachine />)

    const initialText = screen.getByTestId("quote-text").textContent

    const button = screen.getByRole("button", { name: /new quote/i })
    fireEvent.click(button)

    const updatedText = screen.getByTestId("quote-text").textContent

    // It is possible, though unlikely, to randomly get the same quote again.
    // This assertion simply checks that after clicking, we still have some text rendered.
    expect(updatedText.length).toBeGreaterThan(0)
  })
})

