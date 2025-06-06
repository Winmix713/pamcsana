"use client"

import type React from "react"

import { memo, useCallback, useState } from "react"
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
 * A clean, minimal design with subtle gradients and refined shadows.
 * Based on the original clean minimal design specifications.
 */
const Version1Button = memo<Version1ButtonProps>(
  ({
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
          "version1-button",
          {
            "version1-button--disabled": disabled,
            "version1-button--loading": loading,
            "version1-button--pressed": isPressed,
            "version1-button--hovered": isHovered,
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
          overflow: "hidden",
          width: "125px",
          height: "63px",
          background: "linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 50%, #0F0F0F 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "32px",
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2),
            0 4px 12px rgba(0, 0, 0, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.2)
          `,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.3s ease-out",
          transform: isPressed ? "scale(0.95)" : isHovered ? "scale(1.05)" : "scale(1)",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {/* Subtle inner glow */}
        <div
          style={{
            position: "absolute",
            inset: "1px",
            borderRadius: "31px",
            background: "radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.06) 0%, transparent 70%)",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        {/* Hover state overlay */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            borderRadius: "32px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "0.2px",
              color: "rgba(255, 255, 255, 0.9)",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
              userSelect: "none",
            }}
          >
            {loading ? "Loading..." : children}
          </span>
        </div>

        {/* Bottom highlight */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />

        {/* Top highlight */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40%",
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />
      </button>
    )
  },
)

Version1Button.displayName = "Version1Button"

export default Version1Button
