"use client"

import { memo, useCallback, useState } from "react"
import { cn } from "@/lib/utils"

interface Version5ButtonProps {
  onClick?: () => void | Promise<void>
  className?: string
  disabled?: boolean
  loading?: boolean
  showIcon?: boolean
  "aria-label"?: string
  "data-testid"?: string
}

/**
 * Version 5: Blue Gradient Button Component
 *
 * A compact blue button with gradient background and optional icon.
 */
const Version5Button = memo<Version5ButtonProps>(
  ({
    onClick,
    className,
    disabled = false,
    loading = false,
    showIcon = true,
    "aria-label": ariaLabel,
    "data-testid": testId = "version5-button",
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
        console.error("Version5Button onClick error:", error)
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
      <div className="relative">
        {/* Button background */}
        <button
          type="button"
          className={cn(
            "version5-button",
            {
              "version5-button--disabled": disabled,
              "version5-button--loading": loading,
              "version5-button--pressed": isPressed,
              "version5-button--hovered": isHovered,
            },
            className,
          )}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={disabled}
          aria-label={ariaLabel || "Blue gradient button"}
          aria-pressed={isPressed}
          aria-busy={loading}
          data-testid={testId}
          style={{
            boxSizing: "border-box",
            position: "relative",
            width: "64px",
            height: "32px",
            background: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
            backdropFilter: "blur(16px)",
            borderRadius: "16px",
            border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            transition: "all 0.2s ease-out",
            transform: isPressed ? "scale(0.95)" : isHovered ? "scale(1.05)" : "scale(1)",
            boxShadow: isHovered
              ? "0 8px 16px rgba(45, 104, 255, 0.3), 0 0 20px rgba(119, 157, 255, 0.2)"
              : "0 4px 8px rgba(45, 104, 255, 0.2)",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {/* Icon container */}
          {showIcon && (
            <div
              style={{
                boxSizing: "border-box",
                position: "absolute",
                width: "24px",
                height: "24px",
                right: "4px",
                top: "4px",
                background: "linear-gradient(180deg, #EBEBEB -27.27%, #FDFDFD 127.27%)",
                border: "1.5px solid rgba(168, 168, 168, 0.1)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  background: "#2D68FF",
                  borderRadius: "2px",
                }}
              />
            </div>
          )}
        </button>
      </div>
    )
  },
)

Version5Button.displayName = "Version5Button"

export default Version5Button
