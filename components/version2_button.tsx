"use client"

import type React from "react"

import { memo, useCallback, useState } from "react"
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
 * An enhanced button design with icon support, improved animations,
 * and sophisticated visual effects.
 */
const Version2Button = memo<Version2ButtonProps>(
  ({
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
          "version2-button",
          {
            "version2-button--disabled": disabled,
            "version2-button--loading": loading,
            "version2-button--pressed": isPressed,
            "version2-button--hovered": isHovered,
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
        aria-label={ariaLabel || `${children} button with icon`}
        aria-pressed={isPressed}
        aria-busy={loading}
        data-testid={testId}
        style={{
          position: "relative",
          overflow: "hidden",
          width: "125px",
          height: "63px",
          background: isHovered
            ? "linear-gradient(135deg, #3A3A3A 0%, #2A2A2A 30%, #1A1A1A 70%, #0F0F0F 100%)"
            : "linear-gradient(135deg, #2F2F2F 0%, #1F1F1F 30%, #151515 70%, #0A0A0A 100%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "50%",
          boxShadow: isHovered
            ? `
              inset 0 2px 0 rgba(255, 255, 255, 0.2),
              inset 0 -2px 0 rgba(0, 0, 0, 0.4),
              0 10px 30px rgba(0, 0, 0, 0.6),
              0 5px 15px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.08),
              0 0 20px rgba(100, 150, 255, 0.1)
            `
            : `
              inset 0 2px 0 rgba(255, 255, 255, 0.15),
              inset 0 -2px 0 rgba(0, 0, 0, 0.3),
              0 6px 20px rgba(0, 0, 0, 0.5),
              0 3px 8px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.05)
            `,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.5s ease-out",
          transform: isPressed ? "scale(0.92)" : isHovered ? "scale(1.08)" : "scale(1)",
          filter: isPressed ? "brightness(0.9)" : "brightness(1)",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {/* Enhanced inner glow overlay */}
        <div
          style={{
            position: "absolute",
            inset: "2px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 80%)",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        />

        {/* Animated hover state overlay */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(100, 150, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(100, 150, 255, 0.02) 100%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}
        />

        {/* Subtle rotating glow effect */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, transparent 0%, rgba(100, 150, 255, 0.1) 50%, transparent 100%)",
            opacity: isHovered ? 0.3 : 0,
            transition: "opacity 0.7s ease",
            animation: isHovered ? "pulse 2s ease-in-out infinite" : "none",
            pointerEvents: "none",
          }}
        />

        {/* Main content container with icon */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Clock Icon with enhanced styling */}
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            {loading ? (
              <Loader2
                size={16}
                className="animate-spin"
                style={{
                  color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                  filter: "drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8))",
                  transition: "color 0.3s ease",
                }}
              />
            ) : (
              <IconComponent
                size={16}
                style={{
                  color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                  filter: "drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8))",
                  transition: "color 0.3s ease",
                }}
              />
            )}
          </div>

          {/* Enhanced text styling */}
          <span
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: "600",
              fontSize: "15px",
              lineHeight: "22px",
              letterSpacing: "0.3px",
              color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.8)",
              userSelect: "none",
              transition: "color 0.3s ease",
            }}
          >
            {loading ? "Loading..." : children}
          </span>
        </div>

        {/* Enhanced bottom highlight with gradient */}
        <div
          style={{
            position: "absolute",
            bottom: "4px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(100, 150, 255, 0.3) 20%, rgba(255, 255, 255, 0.4) 50%, rgba(100, 150, 255, 0.3) 80%, transparent 100%)",
            opacity: 0.6,
            borderRadius: "1px",
            pointerEvents: "none",
          }}
        />

        {/* Enhanced top highlight */}
        <div
          style={{
            position: "absolute",
            top: "4px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50%",
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />

        {/* Side accent lights */}
        <div
          style={{
            position: "absolute",
            left: "4px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "1px",
            height: "30%",
            background: "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "4px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "1px",
            height: "30%",
            background: "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        {/* Subtle pulsing effect on hover */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            borderRadius: "50%",
            background: "radial-gradient(circle at center, rgba(100, 150, 255, 0.2) 0%, transparent 70%)",
            opacity: isHovered ? 0.2 : 0,
            transition: "opacity 1s ease",
            animation: isHovered ? "pulse 2s infinite" : "none",
            pointerEvents: "none",
          }}
        />
      </button>
    )
  },
)

Version2Button.displayName = "Version2Button"

export default Version2Button
