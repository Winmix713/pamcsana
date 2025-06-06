"use client"

import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductivityButton from "./ProductivityButton"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock console.error to test error handling
const mockConsoleError = jest.spyOn(console, "error").mockImplementation(() => {})

describe("ProductivityButton", () => {
  beforeEach(() => {
    mockConsoleError.mockClear()
  })

  afterAll(() => {
    mockConsoleError.mockRestore()
  })

  it("renders with default props", () => {
    render(<ProductivityButton />)

    const button = screen.getByTestId("productivity-button")
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent("Productivity")
  })

  it("handles click events", async () => {
    const handleClick = jest.fn()
    render(<ProductivityButton onClick={handleClick} />)

    const button = screen.getByTestId("productivity-button")
    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("handles async click events", async () => {
    const asyncClick = jest.fn().mockResolvedValue(undefined)
    render(<ProductivityButton onClick={asyncClick} />)

    const button = screen.getByTestId("productivity-button")
    await userEvent.click(button)

    await waitFor(() => {
      expect(asyncClick).toHaveBeenCalledTimes(1)
    })
  })

  it("shows loading state", () => {
    render(<ProductivityButton loading />)

    const button = screen.getByTestId("productivity-button")
    expect(button).toHaveAttribute("aria-busy", "true")
    expect(button).toHaveTextContent("Loading...")
  })

  it("disables interaction when disabled", async () => {
    const handleClick = jest.fn()
    render(<ProductivityButton onClick={handleClick} disabled />)

    const button = screen.getByTestId("productivity-button")
    expect(button).toBeDisabled()

    await userEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it("supports keyboard navigation", async () => {
    const handleClick = jest.fn()
    render(<ProductivityButton onClick={handleClick} />)

    const button = screen.getByTestId("productivity-button")
    button.focus()

    await userEvent.keyboard("{Enter}")
    expect(handleClick).toHaveBeenCalledTimes(1)

    await userEvent.keyboard(" ")
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it("applies custom className", () => {
    render(<ProductivityButton className="custom-class" />)

    const button = screen.getByTestId("productivity-button")
    expect(button).toHaveClass("custom-class")
  })

  it("renders different sizes", () => {
    const { rerender } = render(<ProductivityButton size="sm" />)
    let button = screen.getByTestId("productivity-button")
    expect(button).toHaveClass("productivity-button--sm")

    rerender(<ProductivityButton size="lg" />)
    button = screen.getByTestId("productivity-button")
    expect(button).toHaveClass("productivity-button--lg")
  })

  it("renders different variants", () => {
    const { rerender } = render(<ProductivityButton variant="glow" />)
    let button = screen.getByTestId("productivity-button")
    expect(button).toHaveClass("productivity-button--glow")

    rerender(<ProductivityButton variant="subtle" />)
    button = screen.getByTestId("productivity-button")
    expect(button).toHaveClass("productivity-button--subtle")
  })

  it("handles custom children", () => {
    render(<ProductivityButton>Custom Text</ProductivityButton>)

    const button = screen.getByTestId("productivity-button")
    expect(button).toHaveTextContent("Custom Text")
  })

  it("handles focus and blur events", async () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()

    render(<ProductivityButton onFocus={handleFocus} onBlur={handleBlur} />)

    const button = screen.getByTestId("productivity-button")

    await userEvent.tab()
    expect(handleFocus).toHaveBeenCalledTimes(1)

    await userEvent.tab()
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it("handles error in onClick gracefully", async () => {
    const errorClick = jest.fn().mockRejectedValue(new Error("Test error"))

    render(<ProductivityButton onClick={errorClick} />)

    const button = screen.getByTestId("productivity-button")
    await userEvent.click(button)

    await waitFor(() => {
      expect(mockConsoleError).toHaveBeenCalledWith("ProductivityButton onClick error:", expect.any(Error))
    })
  })

  it("prevents multiple clicks during loading", async () => {
    const handleClick = jest.fn()
    render(<ProductivityButton onClick={handleClick} loading />)

    const button = screen.getByTestId("productivity-button")
    await userEvent.click(button)
    await userEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it("sets aria-pressed correctly", async () => {
    render(<ProductivityButton />)

    const button = screen.getByTestId("productivity-button")
    expect(button).toHaveAttribute("aria-pressed", "false")

    await userEvent.pointer({ keys: "[MouseLeft>]", target: button })
    expect(button).toHaveAttribute("aria-pressed", "true")

    await userEvent.pointer({ keys: "[/MouseLeft]", target: button })
    expect(button).toHaveAttribute("aria-pressed", "false")
  })
})
