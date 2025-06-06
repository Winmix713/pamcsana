"use client"

import type React from "react"

import { memo, useCallback, useState } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Version7ButtonProps {
  onClick?: () => void | Promise<void>
  className?: string
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  showIcon?: boolean
  "aria-label"?: string
  "data-testid"?: string
}

/**
 * Version 7: Enhanced Productivity Button
 *
 * A sophisticated button with complex layered design,
 * radial gradients, SVG masks, and premium visual effects.
 */
const Version7Button = memo<Version7ButtonProps>(
  ({
    onClick,
    className,
    disabled = false,
    loading = false,
    children = "Productivity",
    showIcon = true,
    "aria-label": ariaLabel,
    "data-testid": testId = "version7-button",
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
        console.error("Version7Button onClick error:", error)
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
      <div
        className={cn(
          "version7-button",
          {
            "version7-button--disabled": disabled,
            "version7-button--loading": loading,
            "version7-button--pressed": isPressed,
            "version7-button--hovered": isHovered,
          },
          className,
        )}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel || `${children} button`}
        aria-pressed={isPressed}
        aria-busy={loading}
        data-testid={testId}
        style={{
          position: "relative",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.3s ease-in-out",
          transform: isPressed ? "scale(0.95)" : isHovered ? "scale(1.05)" : "scale(1)",
          background: isHovered
            ? "linear-gradient(100.09deg, #1a1c1f 4.87%, #15161a 75.88%)"
            : "linear-gradient(100.09deg, #111214 4.87%, #0C0D0F 75.88%)",
          boxShadow: isHovered
            ? "inset 0.25px 1.25px 0px 0.75px rgba(255, 255, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.3)"
            : "inset 0.25px 1.25px 0px 0.75px rgba(255, 255, 255, 0.1)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "rgba(255, 255, 255, 0.06)",
          borderRadius: "50px",
          width: "125px",
          height: "63px",
          padding: "9px 21px 8px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          isolation: "isolate",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {/* Inner radial gradient layer */}
        <div
          style={{
            position: "absolute",
            width: "107px",
            height: "46px",
            left: "9px",
            top: "9px",
            background: "radial-gradient(51.07% 92.4% at 51% 7.61%, #5A5A5A 0%, #1A1A1A 100%)",
            backdropFilter: "blur(1px)",
            borderRadius: "36px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "rgb(77, 77, 82)",
            zIndex: 0,
          }}
        >
          {/* SVG mask overlay */}
          <svg
            width={109}
            height={49}
            viewBox="0 0 109 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              left: "-1px",
              top: "-1px",
            }}
          >
            <mask
              id="mask0_productivity"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={109}
              height={49}
            >
              <rect y="0.5" width={109} height={48} fill="white" />
            </mask>
            <g mask="url(#mask0_productivity)">
              <rect opacity="0.2" y="0.5" width={109} height={48} rx={24} fill="url(#paint0_linear_productivity)" />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_productivity"
                x1="54.5"
                y1="0.5"
                x2="54.5"
                y2="48.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset={1} stopColor="white" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content container */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            zIndex: 1,
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: "22px",
              textAlign: "center",
              letterSpacing: "0.3px",
              color: "#FFFFFF",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            {showIcon && (
              <Clock
                size={16}
                style={{
                  color: "#FFFFFF",
                  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))",
                }}
                aria-hidden="true"
              />
            )}
            <span>{loading ? "Loading..." : children}</span>
          </div>
        </div>
      </div>
    )
  },
)

Version7Button.displayName = "Version7Button"

export default Version7Button
