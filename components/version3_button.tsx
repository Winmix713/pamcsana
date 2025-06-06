"use client"

import { useCallback, useState } from "react"
import { Clock } from "lucide-react"
import "./ProductivityButton.css"

interface Version3ButtonProps {
  onClick?: () => void
  className?: string
  disabled?: boolean
  loading?: boolean
  glow?: boolean
  title?: string
  "aria-label"?: string
}

export default function Version3Button({
  onClick,
  className = "",
  disabled = false,
  loading = false,
  glow = false,
  title = "Indítsd el a produktivitásmérőt",
  "aria-label": ariaLabel = "Version 3 Glassmorphic Productivity Button",
}: Version3ButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = useCallback(() => {
    if (!disabled && !loading && onClick) {
      onClick()
    } else if (!disabled && !loading) {
      console.log("📈 Version 3: Glassmorphic productivity button clicked!")
    }
  }, [disabled, loading, onClick])

  const handleMouseDown = useCallback(() => {
    setIsPressed(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsPressed(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false)
  }, [])

  const buttonClasses = [
    "productivity-button",
    loading && "productivity-button--loading",
    glow && "productivity-button--glow",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
      title={title}
      aria-label={ariaLabel}
      type="button"
    >
      {/* üveg-overlay */}
      <div className="productivity-overlay" />

      {/* ikon + szöveg */}
      <div className="productivity-content">
        <Clock size={18} aria-hidden="true" />
        {loading ? "Loading..." : "Productivity"}
      </div>
    </button>
  )
}