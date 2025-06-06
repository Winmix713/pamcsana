"use client"

import type React from "react"
import { memo, useCallback, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface Version6ButtonProps {
  onClick?: () => void | Promise<void>
  className?: string
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  "aria-label"?: string
  "data-testid"?: string
}

/**
 * Version 6: Enhanced Blue Gradient Productivity Button
 *
 * A sophisticated blue gradient button with glassmorphic effects,
 * CSS custom properties integration, and premium animations.
 * Size: 140×70px with clean design without toggle indicator.
 */
const Version6Button = memo<Version6ButtonProps>(
  ({
    onClick,
    className,
    disabled = false,
    loading = false,
    children = "Productivity",
    "aria-label": ariaLabel,
    "data-testid": testId = "version6-button",
  }) => {
    const [isPressed, setIsPressed] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null)

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return

        try {
          // Enhanced press animation
          setIsPressed(true)
          setTimeout(() => setIsPressed(false), 150)

          // Ripple effect
          const btn = btnRef.current
          if (btn) {
            const circle = document.createElement("span")
            const diameter = Math.max(btn.clientWidth, btn.clientHeight)
            const radius = diameter / 2
            const rect = btn.getBoundingClientRect()

            circle.style.width = circle.style.height = `${diameter}px`
            circle.style.left = `${event.clientX - rect.left - radius}px`
            circle.style.top = `${event.clientY - rect.top - radius}px`
            circle.classList.add("ripple")

            btn.appendChild(circle)
            setTimeout(() => {
              if (circle.parentNode) {
                circle.remove()
              }
            }, 400)
          }

          if (onClick) {
            const result = onClick()
            if (result instanceof Promise) {
              await result
            }
          }
        } catch (error) {
          console.error("Version6Button onClick error:", error)
        }
      },
      [disabled, loading, onClick],
    )

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
          handleClick(event as any)
        }
      },
      [handleClick],
    )

    return (
      <>
        <button
          ref={btnRef}
          type="button"
          className={cn(
            "version6-button-enhanced",
            {
              "version6-button-enhanced--disabled": disabled,
              "version6-button-enhanced--loading": loading,
              "version6-button-enhanced--pressed": isPressed,
              "version6-button-enhanced--hovered": isHovered,
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
        >
          {/* Glassmorphic overlay */}
          <div className="version6-button-enhanced__overlay" />

          {/* Content */}
          <span className="version6-button-enhanced__text">{loading ? "Loading..." : children}</span>

          {/* Glow effect */}
          <div className="version6-button-enhanced__glow" />
        </button>

        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

          .version6-button-enhanced {
            /* CSS Custom Properties - Global Design System Integration */
            --blur-2: 12px;
            --radius-4: 25px;
            --blue-transparent: rgba(119, 157, 255, 0.85);
            --blue-solid: rgba(45, 104, 255, 1);
            --blue-hover: rgba(65, 124, 255, 1);
            --easing-ease-out-expo: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            --accent-solid: rgba(119, 157, 255, 0.6);
            --selection: rgba(255, 255, 255, 0.3);
            --color-window-bg1: transparent;

            /* Layout - Clean Design */
            position: relative;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 6px;
            width: 140px;
            height: 70px;
            padding: 12px 24px;

            /* Enhanced Blue Gradient Background with Glassmorphic Effect */
            background: linear-gradient(100.09deg, var(--blue-transparent) 4.87%, var(--blue-solid) 75.88%);

            /* Glassmorphic backdrop blur */
            backdrop-filter: blur(var(--blur-2));
            -webkit-backdrop-filter: blur(var(--blur-2));

            /* Enhanced Border System */
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-bottom: 2px solid rgba(40, 40, 40, 0.6);
            border-right: 2px solid rgba(40, 40, 40, 0.5);
            border-radius: var(--radius-4);

            /* Enhanced Shadow System */
            box-shadow: inset 0.5px 1.5px 0px 1px rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.4) 3px 10px 15px,
              0 2px 8px rgba(255, 255, 255, 0.1);

            /* Smooth Transitions with Custom Easing */
            transition: all 0.4s var(--easing-ease-out-expo);
            cursor: pointer;
            overflow: hidden;

            /* States */
            opacity: 1;
          }

          .version6-button-enhanced__overlay {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 60%);
            transform: scale(0.8);
            opacity: 0.7;
            pointer-events: none;
            transition: transform 0.5s var(--easing-ease-out-expo), opacity 0.5s var(--easing-ease-out-expo);
          }

          .version6-button-enhanced__text {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0.4px;
            color: #ffffff;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            user-select: none;
            position: relative;
            z-index: 10;
            transition: all 0.3s var(--easing-ease-out-expo);
          }

          .version6-button-enhanced__glow {
            position: absolute;
            inset: -20px;
            background: radial-gradient(circle at center, var(--blue-transparent) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.6s var(--easing-ease-out-expo);
            pointer-events: none;
            z-index: -1;
          }

          /* Hover State - Enhanced */
          .version6-button-enhanced:hover:not(.version6-button-enhanced--disabled):not(.version6-button-enhanced--loading),
          .version6-button-enhanced--hovered:not(.version6-button-enhanced--disabled):not(.version6-button-enhanced--loading) {
            transform: scale(1.08) translateY(-2px);
            background: linear-gradient(100.09deg, var(--blue-solid) 4.87%, var(--blue-hover) 75.88%);
            box-shadow: inset 0.5px 2px 0px 1px rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.5) 5px 15px 25px,
              0 8px 20px rgba(255, 255, 255, 0.15), 0 0 30px var(--blue-transparent);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-bottom: 2px solid rgba(40, 40, 40, 0.7);
            border-right: 2px solid rgba(40, 40, 40, 0.6);
          }

          .version6-button-enhanced:hover .version6-button-enhanced__overlay,
          .version6-button-enhanced--hovered .version6-button-enhanced__overlay {
            transform: scale(1);
            opacity: 1;
          }

          .version6-button-enhanced:hover .version6-button-enhanced__text,
          .version6-button-enhanced--hovered .version6-button-enhanced__text {
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.2);
          }

          .version6-button-enhanced:hover .version6-button-enhanced__glow,
          .version6-button-enhanced--hovered .version6-button-enhanced__glow {
            opacity: 0.4;
          }

          /* Active/Pressed State */
          .version6-button-enhanced:active:not(.version6-button-enhanced--disabled):not(.version6-button-enhanced--loading),
          .version6-button-enhanced--pressed:not(.version6-button-enhanced--disabled):not(.version6-button-enhanced--loading) {
            transform: scale(0.98) translateY(1px);
            transition: all 0.1s ease;
          }

          .version6-button-enhanced--pressed .version6-button-enhanced__glow {
            opacity: 0.8;
          }

          /* Focus State - Enhanced Accessibility */
          .version6-button-enhanced:focus-visible {
            outline: none;
            box-shadow: inset 0.5px 1.5px 0px 1px rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.4) 3px 10px 15px,
              0 2px 8px rgba(255, 255, 255, 0.1), 0 0 0 3px var(--accent-solid);
          }

          /* Disabled State */
          .version6-button-enhanced--disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
          }

          /* Loading State */
          .version6-button-enhanced--loading {
            pointer-events: none;
          }

          .version6-button-enhanced--loading .version6-button-enhanced__text {
            opacity: 0.8;
          }

          /* Ripple Effect - Enhanced */
          :global(.ripple) {
            position: absolute;
            border-radius: 50%;
            background: var(--selection);
            transform: scale(0);
            animation: ripple 0.6s var(--easing-ease-out-expo);
            pointer-events: none;
          }

          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 0.8;
            }
            100% {
              transform: scale(4);
              opacity: 0;
            }
          }

          /* Responsive Design */
          @media (max-width: 480px) {
            .version6-button-enhanced {
              width: 120px;
              height: 60px;
              padding: 10px 20px;
            }

            .version6-button-enhanced__text {
              font-size: 14px;
              line-height: 20px;
              letter-spacing: 0.3px;
            }
          }

          /* High DPI displays */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .version6-button-enhanced {
              border-width: 1px;
            }

            .version6-button-enhanced__text {
              text-shadow: 0 0.5px 1.5px rgba(0, 0, 0, 0.3);
            }
          }

          /* Reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .version6-button-enhanced,
            .version6-button-enhanced__overlay,
            .version6-button-enhanced__text,
            .version6-button-enhanced__glow {
              transition: none;
            }

            .version6-button-enhanced:hover,
            .version6-button-enhanced--hovered {
              transform: none;
            }

            .version6-button-enhanced:active,
            .version6-button-enhanced--pressed {
              transform: none;
            }

            :global(.ripple) {
              animation: none;
            }
          }

          /* High contrast mode */
          @media (prefers-contrast: high) {
            .version6-button-enhanced {
              border: 3px solid #ffffff;
              background: var(--blue-solid);
            }

            .version6-button-enhanced__text {
              color: #ffffff;
              text-shadow: none;
            }
          }

          /* Dark theme adjustments */
          @media (prefers-color-scheme: dark) {
            .version6-button-enhanced {
              --blue-transparent: rgba(119, 157, 255, 0.9);
              --blue-solid: rgba(45, 104, 255, 1);
            }
          }
        `}</style>
      </>
    )
  },
)

Version6Button.displayName = "Version6Button"

export default Version6Button
