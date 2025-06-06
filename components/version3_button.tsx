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
"use client"

import type React from "react"
import { memo, useCallback, useState, useMemo } from "react"
import { Zap, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Version3ButtonProps {
  onClick?: () => void | Promise<void>
  className?: string
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  icon?: React.ComponentType<{ size?: number; className?: string }>
  variant?: "default" | "glow" | "subtle"
  "aria-label"?: string
  "data-testid"?: string
}

/**
 * Version 3: Glassmorphic Productivity Button
 * 
 * Features advanced glassmorphic design with:
 * - Enhanced backdrop blur effects
 * - Multiple visual variants
 * - Sophisticated lighting and shadows
 * - Premium animation system
 */
const Version3Button = memo<Version3ButtonProps>(({
  onClick,
  className,
  disabled = false,
  loading = false,
  children = "Productivity",
  icon: IconComponent = Zap,
  variant = "default",
  "aria-label": ariaLabel,
  "data-testid": testId = "version3-button",
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Memoized styles based on variant
  const buttonStyles = useMemo(() => {
    const baseStyles = {
      position: "relative" as const,
      overflow: "hidden" as const,
      width: "130px",
      height: "60px",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "30px",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      transform: isPressed 
        ? "scale(0.93)" 
        : isHovered 
          ? "scale(1.06) translateY(-3px)" 
          : "scale(1)",
      opacity: disabled ? 0.5 : 1,
      willChange: "transform",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    }

    const variantStyles = {
      default: {
        background: isHovered
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 30%, rgba(0, 0, 0, 0.1) 100%)"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 30%, rgba(0, 0, 0, 0.05) 100%)",
        boxShadow: isHovered
          ? `inset 0 2px 0 rgba(255, 255, 255, 0.3),
             inset 0 -2px 0 rgba(0, 0, 0, 0.2),
             0 15px 35px rgba(0, 0, 0, 0.6),
             0 8px 20px rgba(0, 0, 0, 0.4),
             0 0 30px rgba(255, 255, 255, 0.1)`
          : `inset 0 2px 0 rgba(255, 255, 255, 0.2),
             inset 0 -2px 0 rgba(0, 0, 0, 0.1),
             0 8px 25px rgba(0, 0, 0, 0.5),
             0 4px 12px rgba(0, 0, 0, 0.3)`,
      },
      glow: {
        background: isHovered
          ? "linear-gradient(135deg, rgba(100, 200, 255, 0.3) 0%, rgba(150, 100, 255, 0.2) 50%, rgba(255, 100, 200, 0.2) 100%)"
          : "linear-gradient(135deg, rgba(100, 200, 255, 0.2) 0%, rgba(150, 100, 255, 0.1) 50%, rgba(255, 100, 200, 0.1) 100%)",
        boxShadow: isHovered
          ? `inset 0 2px 0 rgba(255, 255, 255, 0.4),
             0 15px 35px rgba(0, 0, 0, 0.6),
             0 0 40px rgba(100, 200, 255, 0.4),
             0 0 20px rgba(150, 100, 255, 0.3)`
          : `inset 0 2px 0 rgba(255, 255, 255, 0.2),
             0 8px 25px rgba(0, 0, 0, 0.5),
             0 0 20px rgba(100, 200, 255, 0.2)`,
      },
      subtle: {
        background: isHovered
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)",
        boxShadow: isHovered
          ? `inset 0 1px 0 rgba(255, 255, 255, 0.25),
             0 10px 25px rgba(0, 0, 0, 0.4)`
          : `inset 0 1px 0 rgba(255, 255, 255, 0.15),
             0 6px 15px rgba(0, 0, 0, 0.3)`,
      },
    }

    return { ...baseStyles, ...variantStyles[variant] }
  }, [variant, isPressed, isHovered, disabled])

  const textStyles = useMemo(() => ({
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: "600" as const,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.3px",
    color: variant === "glow" ? "#ffffff" : "rgba(255, 255, 255, 0.95)",
    textShadow: variant === "glow" 
      ? "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.3)"
      : "0 2px 6px rgba(0, 0, 0, 0.8)",
    userSelect: "none" as const,
    transition: "all 0.3s ease",
  }), [variant])

  const iconStyles = useMemo(() => ({
    color: variant === "glow" ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
    filter: variant === "glow" 
      ? "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))"
      : "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.8))",
    transition: "all 0.3s ease",
  }), [variant])

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
      console.error("Version3Button onClick error:", error)
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

  const IconElement = useMemo(() => {
    if (loading) {
      return <Loader2 size={16} className="animate-spin" style={iconStyles} />
    }
    return <IconComponent size={16} style={iconStyles} />
  }, [loading, IconComponent, iconStyles])

  return (
    <button
      type="button"
      className={cn("v3-button", className)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      disabled={disabled}
      aria-label={ariaLabel || `${children} glassmorphic button`}
      aria-pressed={isPressed}
      aria-busy={loading}
      data-testid={testId}
      style={buttonStyles}
    >
      {/* Advanced glass overlay system */}
      <div
        className="absolute inset-0.5 rounded-[29px] opacity-80 pointer-events-none"
        style={{
          background: variant === "glow"
            ? "radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.2) 0%, rgba(100, 200, 255, 0.1) 40%, transparent 80%)"
            : "radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 80%)",
        }}
      />

      {/* Dynamic lighting effect */}
      <div
        className="absolute inset-0 rounded-[30px] pointer-events-none transition-opacity duration-500"
        style={{
          background: variant === "glow"
            ? "linear-gradient(135deg, rgba(100, 200, 255, 0.2) 0%, rgba(150, 100, 255, 0.15) 50%, rgba(255, 100, 200, 0.1) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%)",
          opacity: isHovered ? 1 : 0.3,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex items-center justify-center gap-2 w-full h-full px-4">
        <div className="flex items-center flex-shrink-0">
          {IconElement}
        </div>
        <span style={textStyles}>
          {loading ? "Loading..." : children}
        </span>
      </div>

      {/* Enhanced glass accents */}
      <div
        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 opacity-60 rounded-full pointer-events-none"
        style={{
          background: variant === "glow"
            ? "linear-gradient(90deg, transparent 0%, rgba(100, 200, 255, 0.8) 20%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 100, 200, 0.8) 80%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 20%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.4) 80%, transparent 100%)",
        }}
      />

      <div
        className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3/5 h-px opacity-70 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
        }}
      />

      {/* Variant-specific effects */}
      {variant === "glow" && (
        <div
          className="absolute inset-0 rounded-[30px] pointer-events-none transition-opacity duration-1000"
          style={{
            background: "radial-gradient(circle at center, rgba(100, 200, 255, 0.3) 0%, rgba(150, 100, 255, 0.2) 50%, transparent 80%)",
            opacity: isHovered ? 0.4 : 0.1,
            animation: isHovered ? "pulse 3s infinite" : "none",
          }}
        />
      )}

      {/* Subtle border enhancement */}
      <div
        className="absolute inset-0 rounded-[30px] pointer-events-none"
        style={{
          border: `1px solid ${variant === "glow" ? "rgba(100, 200, 255, 0.3)" : "rgba(255, 255, 255, 0.2)"}`,
          opacity: isHovered ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }}
      />
    </button>
  )
})

Version3Button.displayName = "Version3Button"

export default Version3Button
