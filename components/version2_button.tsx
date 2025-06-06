"use client"

import type React from "react"
import { memo, useCallback, useState, useMemo } from "react"
import { Clock, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Version2ButtonProps {
  onClick?: () => void | Promise<void>
  className?: string
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  icon?: React.ComponentType<{ size?: number; className?: string }>
  "aria-label"?: string
  "data-testid"?: string
}

/**
 * Version 2: Enhanced Button with Icon
 * 
 * Optimized for performance with:
 * - Memoized styles and icon rendering
 * - Efficient state management
 * - Hardware acceleration
 * - Reduced DOM manipulation
 */
const Version2Button = memo<Version2ButtonProps>(({
  onClick,
  className,
  disabled = false,
  loading = false,
  children = "Productivity",
  icon: IconComponent = Clock,
  "aria-label": ariaLabel,
  "data-testid": testId = "version2-button",
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Memoized button styles for performance
  const buttonStyles = useMemo(() => ({
    position: "relative" as const,
    overflow: "hidden" as const,
    width: "125px",
    height: "63px",
    background: isHovered
      ? "linear-gradient(135deg, #3A3A3A 0%, #2A2A2A 30%, #1A1A1A 70%, #0F0F0F 100%)"
      : "linear-gradient(135deg, #2F2F2F 0%, #1F1F1F 30%, #151515 70%, #0A0A0A 100%)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "50%",
    boxShadow: isHovered
      ? `inset 0 2px 0 rgba(255, 255, 255, 0.2),
         inset 0 -2px 0 rgba(0, 0, 0, 0.4),
         0 10px 30px rgba(0, 0, 0, 0.6),
         0 5px 15px rgba(0, 0, 0, 0.4),
         0 0 20px rgba(100, 150, 255, 0.1)`
      : `inset 0 2px 0 rgba(255, 255, 255, 0.15),
         inset 0 -2px 0 rgba(0, 0, 0, 0.3),
         0 6px 20px rgba(0, 0, 0, 0.5),
         0 3px 8px rgba(0, 0, 0, 0.3)`,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transform: isPressed 
      ? "scale(0.92)" 
      : isHovered 
        ? "scale(1.08)" 
        : "scale(1)",
    filter: isPressed ? "brightness(0.9)" : "brightness(1)",
    opacity: disabled ? 0.5 : 1,
    willChange: "transform",
  }), [isPressed, isHovered, disabled])

  // Memoized icon and text styles
  const iconStyles = useMemo(() => ({
    color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
    filter: "drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8))",
    transition: "color 0.3s ease",
  }), [isHovered])

  const textStyles = useMemo(() => ({
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: "600" as const,
    fontSize: "15px",
    lineHeight: "22px",
    letterSpacing: "0.3px",
    color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.8)",
    userSelect: "none" as const,
    transition: "color 0.3s ease",
  }), [isHovered])

  // Memoized icon component
  const IconElement = useMemo(() => {
    if (loading) {
      return <Loader2 size={16} className="animate-spin" style={iconStyles} />
    }
    return <IconComponent size={16} style={iconStyles} />
  }, [loading, IconComponent, iconStyles])

  // Event handlers
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
      console.error("Version2Button onClick error:", error)
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
      className={cn("v2-button", className)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      disabled={disabled}
      aria-label={ariaLabel || `${children} button with icon`}
      aria-pressed={isPressed}
      aria-busy={loading}
      data-testid={testId}
      style={buttonStyles}
    >
      {/* Inner glow overlay */}
      <div
        className="absolute inset-0.5 rounded-full opacity-80 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 80%)",
        }}
      />

      {/* Hover state overlay */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(100, 150, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(100, 150, 255, 0.02) 100%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 w-full h-full">
        <div className="flex items-center flex-shrink-0">
          {IconElement}
        </div>
        <span style={textStyles}>
          {loading ? "Loading..." : children}
        </span>
      </div>

      {/* Enhanced highlight accents */}
      <div
        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 opacity-60 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(100, 150, 255, 0.3) 20%, rgba(255, 255, 255, 0.4) 50%, rgba(100, 150, 255, 0.3) 80%, transparent 100%)",
        }}
      />

      <div
        className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1/2 h-px opacity-70 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
        }}
      />

      {/* Side accent lights */}
      <div
        className="absolute left-1 top-1/2 transform -translate-y-1/2 w-px h-1/3 opacity-50 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
        }}
      />

      <div
        className="absolute right-1 top-1/2 transform -translate-y-1/2 w-px h-1/3 opacity-50 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
        }}
      />

      {/* Pulsing glow effect on hover */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-1000"
        style={{
          background: "radial-gradient(circle at center, rgba(100, 150, 255, 0.2) 0%, transparent 70%)",
          opacity: isHovered ? 0.2 : 0,
          animation: isHovered ? "pulse 2s infinite" : "none",
        }}
      />
    </button>
  )
})

Version2Button.displayName = "Version2Button"

export default Version2Button