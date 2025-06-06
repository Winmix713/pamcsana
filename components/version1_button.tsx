"use client"

import type React from "react"
import { memo, useCallback, useState, useMemo } from "react"
import { cn } from "@/lib/utils"

interface Version1ButtonProps {
  onClick?: () => void | Promise<void>
  className?: string
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  "aria-label"?: string
  "data-testid"?: string
}

/**
 * Version 1: Clean Minimal Button Component
 * 
 * Optimized for performance with:
 * - Memoized styles
 * - Reduced re-renders
 * - CSS custom properties
 * - Hardware acceleration
 */
const Version1Button = memo<Version1ButtonProps>(({
  onClick,
  className,
  disabled = false,
  loading = false,
  children = "Productivity",
  "aria-label": ariaLabel,
  "data-testid": testId = "version1-button",
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Memoized styles for better performance
  const buttonStyles = useMemo(() => ({
    position: "relative" as const,
    overflow: "hidden" as const,
    width: "125px",
    height: "63px",
    background: isHovered 
      ? "linear-gradient(135deg, #3A3A3A 0%, #2A2A2A 50%, #1A1A1A 100%)"
      : "linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 50%, #0F0F0F 100%)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "32px",
    boxShadow: isHovered
      ? `inset 0 1px 0 rgba(255, 255, 255, 0.15),
         inset 0 -1px 0 rgba(0, 0, 0, 0.3),
         0 8px 20px rgba(0, 0, 0, 0.5),
         0 4px 8px rgba(0, 0, 0, 0.3)`
      : `inset 0 1px 0 rgba(255, 255, 255, 0.1),
         inset 0 -1px 0 rgba(0, 0, 0, 0.2),
         0 4px 12px rgba(0, 0, 0, 0.4),
         0 2px 4px rgba(0, 0, 0, 0.2)`,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transform: isPressed 
      ? "scale(0.95)" 
      : isHovered 
        ? "scale(1.05)" 
        : "scale(1)",
    opacity: disabled ? 0.5 : 1,
    willChange: "transform",
  }), [isPressed, isHovered, disabled])

  const textStyles = useMemo(() => ({
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: "500" as const,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
    color: "rgba(255, 255, 255, 0.9)",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
    userSelect: "none" as const,
  }), [])

  // Event handlers with useCallback for performance
  const handleClick = useCallback(async () => {
    if (disabled || loading) return

    try {
      if (onClick) {
        const result = onClick()
        if (result instanceof Promise) {
          await result
        }
      }
    } catch (error) {
      console.error("Version1Button onClick error:", error)
    }
  }, [disabled, loading, onClick])

  const handleMouseDown = useCallback(() => {
    if (!disabled && !loading) setIsPressed(true)
  }, [disabled, loading])

  const handleMouseUp = useCallback(() => {
    setIsPressed(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true)
  }, [disabled])

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false)
    setIsHovered(false)
  }, [])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && !disabled && !loading) {
      event.preventDefault()
      setIsPressed(true)
    }
  }, [disabled, loading])

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setIsPressed(false)
      handleClick()
    }
  }, [handleClick])

  return (
    <button
      type="button"
      className={cn("v1-button", className)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      disabled={disabled}
      aria-label={ariaLabel || `${children} button`}
      aria-pressed={isPressed}
      aria-busy={loading}
      data-testid={testId}
      style={buttonStyles}
    >
      {/* Inner glow overlay */}
      <div
        className="absolute inset-1 rounded-[31px] opacity-60 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <span style={textStyles}>
          {loading ? "Loading..." : children}
        </span>
      </div>

      {/* Highlight accents */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 h-px opacity-30 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
        }}
      />

      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/5 h-px opacity-40 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
        }}
      />
    </button>
  )
})

Version1Button.displayName = "Version1Button"

export default Version1Button