"use client"

import type React from "react"

import { memo, useCallback, useState } from "react"
import { cn } from "@/lib/utils"

interface Version4ButtonProps {
  onClick?: () => void | Promise<void>
  className?: string
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  "aria-label"?: string
  "data-testid"?: string
}

/**
 * Version 4: Withdraw Button Component
 *
 * A sleek withdraw button with radial gradient background
 * and sophisticated shadow effects.
 */
const Version4Button = memo<Version4ButtonProps>(
  ({
    onClick,
    className,
    disabled = false,
    loading = false,
    children = "Withdraw",
    "aria-label": ariaLabel,
    "data-testid": testId = "version4-button",
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
        console.error("Version4Button onClick error:", error)
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

    return (
      <button
        type="button"
        className={cn(
          "version4-button",
          {
            "version4-button--disabled": disabled,
            "version4-button--loading": loading,
            "version4-button--pressed": isPressed,
            "version4-button--hovered": isHovered,
          },
          className,
        )}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        aria-label={ariaLabel || `${children} button`}
        aria-pressed={isPressed}
        aria-busy={loading}
        data-testid={testId}
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 40px",
          gap: "8px",
          width: "256px",
          height: "48px",
          background: "radial-gradient(145.77% 145.77% at 50% 50%, #3A3A3A 0%, #A0A0A0 100%)",
          border: "1.25px solid #515151",
          boxShadow: "0px 4px 4px -3px rgba(0, 0, 0, 0.25), inset 0px 2px 0px rgba(255, 255, 255, 0.19)",
          borderRadius: "48px",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.2s ease-out",
          transform: isPressed ? "scale(0.98)" : isHovered ? "scale(1.02)" : "scale(1)",
          filter: isHovered ? "brightness(1.1)" : "brightness(1)",
        }}
      >
        <span
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "16px",
            color: "#F5F5F5",
            opacity: disabled ? 0.5 : 1,
            userSelect: "none",
          }}
        >
          {loading ? "Processing..." : children}
        </span>
      </button>
    )
  },
)

Version4Button.displayName = "Version4Button"

export default Version4Button
