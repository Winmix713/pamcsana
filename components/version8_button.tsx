"use client"

import type React from "react"
import { memo, useCallback, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Version8ButtonProps {
  onClick?: () => void | Promise<void>
  className?: string
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  "aria-label"?: string
  "data-testid"?: string
}

/**
 * Version 8: Hybrid Productivity Button
 *
 * A sophisticated hybrid button with advanced glassmorphic effects,
 * smooth animations, and premium visual design.
 */
const Version8Button = memo<Version8ButtonProps>(
  ({
    onClick,
    className,
    disabled = false,
    loading = false,
    children = "Productivity",
    "aria-label": ariaLabel,
    "data-testid": testId = "version8-button",
  }) => {
    const [isPressed, setIsPressed] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    // Handle animation reset
    useEffect(() => {
      if (isAnimating) {
        const timer = setTimeout(() => {
          setIsAnimating(false)
        }, 400)
        return () => clearTimeout(timer)
      }
    }, [isAnimating])

    const handleClick = useCallback(async () => {
      if (disabled || loading) return

      try {
        setIsAnimating(true)
        setIsPressed(true)
        setTimeout(() => setIsPressed(false), 150)

        if (onClick) {
          const result = onClick()
          if (result instanceof Promise) {
            await result
          }
        }
      } catch (error) {
        console.error("Version8Button onClick error:", error)
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
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        setIsPressed(true)
      }
    }, [])

    const handleKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          setIsPressed(false)
          handleClick()
        }
      },
      [handleClick],
    )

    return (
      <button
        type="button"
        className={cn(
          "version8-button",
          {
            "version8-button--disabled": disabled,
            "version8-button--loading": loading,
            "version8-button--pressed": isPressed,
            "version8-button--hovered": isHovered,
            "version8-button--animating": isAnimating,
          },
          className,
        )}
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
        style={{
          position: "relative",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          width: "140px",
          height: "70px",
          padding: "12px 24px",

          /* Dark gradient background with glassmorphic effect */
          background: "linear-gradient(100.09deg, rgba(17, 18, 20, 0.85) 4.87%, rgba(12, 13, 15, 0.9) 75.88%)",

          /* Glassmorphic backdrop blur */
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",

          /* Combined border - refined glassmorphic style */
          border: "2px solid rgba(255, 255, 255, 0.2)",
          borderBottom: "2px solid rgba(40, 40, 40, 0.6)",
          borderRight: "2px solid rgba(40, 40, 40, 0.5)",
          borderRadius: "25px",

          /* Combined shadows */
          boxShadow: `
            inset 0.5px 1.5px 0px 1px rgba(255, 255, 255, 0.15),
            rgba(0, 0, 0, 0.4) 3px 10px 15px,
            0 2px 8px rgba(255, 255, 255, 0.1)
          `,

          /* Smooth transitions */
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          cursor: disabled ? "not-allowed" : "pointer",
          overflow: "hidden",

          /* Interactive states */
          transform: isPressed
            ? "scale(0.96) translateY(1px)"
            : isHovered
              ? "scale(1.08) translateY(-2px)"
              : "scale(1)",
          opacity: disabled ? 0.4 : 1,
        }}
      >
        {/* Hover state overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "25px",
            background: "linear-gradient(100.09deg, rgba(17, 18, 20, 0.9) 4.87%, rgba(12, 13, 15, 0.95) 75.88%)",
            boxShadow: `
              inset 0.5px 2px 0px 1px rgba(255, 255, 255, 0.25),
              rgba(0, 0, 0, 0.5) 5px 15px 25px,
              0 8px 20px rgba(255, 255, 255, 0.15),
              0 0 30px rgba(255, 255, 255, 0.1)
            `,
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderBottom: "2px solid rgba(40, 40, 40, 0.7)",
            borderRight: "2px solid rgba(40, 40, 40, 0.6)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            pointerEvents: "none",
          }}
        />

        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
            opacity: isAnimating ? 0.8 : isHovered ? 0.4 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
          }}
        />

        {/* Text content */}
        <span
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.4px",
            color: "white",
            textShadow: isHovered
              ? "0 1px 3px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.2)"
              : "0 1px 3px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.1)",
            opacity: isHovered ? 1 : 0.95,
            transition: "all 0.3s ease",
            userSelect: "none",
            position: "relative",
            zIndex: 10,
          }}
        >
          {loading ? "Loading..." : children}
        </span>

        {/* Ripple effect on click */}
        {isAnimating && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
              borderRadius: "25px",
              transform: "scale(0)",
              opacity: 0.8,
              animation: "ripple 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              pointerEvents: "none",
            }}
          />
        )}

        <style jsx>{`
          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 0.8;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}</style>
      </button>
    )
  },
)

Version8Button.displayName = "Version8Button"

export default Version8Button
