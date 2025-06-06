"use client"

import type React from "react"
import { memo, useCallback, useState, useRef, useEffect } from "react"
import { Clock, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import "./ProductivityButton.css"

/**
 * Props interface for the ProductivityButton component
 */
export interface ProductivityButtonProps {
  /** Click handler function */
  onClick?: () => void | Promise<void>
  /** Additional CSS classes */
  className?: string
  /** Disabled state */
  disabled?: boolean
  /** Loading state with spinner */
  loading?: boolean
  /** Glow effect variant */
  variant?: "default" | "glow" | "subtle"
  /** Button size */
  size?: "sm" | "md" | "lg"
  /** Tooltip text */
  title?: string
  /** Accessibility label */
  "aria-label"?: string
  /** Test ID for testing */
  "data-testid"?: string
  /** Icon component (optional override) */
  icon?: React.ComponentType<{ size?: number; className?: string }>
  /** Button text (optional override) */
  children?: React.ReactNode
  /** Auto-focus on mount */
  autoFocus?: boolean
  /** Callback for focus events */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void
  /** Callback for blur events */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
}

/**
 * Size configuration mapping
 */
const SIZE_CONFIG = {
  sm: {
    width: "110px",
    height: "50px",
    padding: "0 16px",
    fontSize: "14px",
    iconSize: 16,
  },
  md: {
    width: "130px",
    height: "60px",
    padding: "0 20px",
    fontSize: "16px",
    iconSize: 18,
  },
  lg: {
    width: "150px",
    height: "70px",
    padding: "0 24px",
    fontSize: "18px",
    iconSize: 20,
  },
} as const

/**
 * Glassmorphic ProductivityButton Component
 *
 * A modern, accessible button component with glassmorphic design,
 * optimized for performance and production use.
 *
 * @example
 * ```tsx
 * <ProductivityButton
 *   onClick={() => console.log('Clicked!')}
 *   variant="glow"
 *   size="md"
 *   title="Start productivity tracking"
 * />
 * ```
 */
const ProductivityButton = memo<ProductivityButtonProps>(
  ({
    onClick,
    className,
    disabled = false,
    loading = false,
    variant = "default",
    size = "md",
    title = "Start productivity tracking",
    "aria-label": ariaLabel,
    "data-testid": testId = "productivity-button",
    icon: IconComponent = Clock,
    children,
    autoFocus = false,
    onFocus,
    onBlur,
  }) => {
    // State management
    const [isPressed, setIsPressed] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [asyncLoading, setAsyncLoading] = useState(false)

    // Refs
    const buttonRef = useRef<HTMLButtonElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout>()

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    // Auto-focus handling
    useEffect(() => {
      if (autoFocus && buttonRef.current) {
        buttonRef.current.focus()
      }
    }, [autoFocus])

    /**
     * Optimized click handler with async support and error handling
     */
    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (disabled || loading || asyncLoading) {
          return
        }

        try {
          if (onClick) {
            setAsyncLoading(true)
            const result = onClick()

            // Handle both sync and async onClick handlers
            if (result instanceof Promise) {
              await result
            }
          }
        } catch (error) {
          console.error("ProductivityButton onClick error:", error)
          // In production, you might want to show a toast notification
        } finally {
          // Add small delay to prevent flickering
          timeoutRef.current = setTimeout(() => {
            setAsyncLoading(false)
          }, 100)
        }
      },
      [disabled, loading, asyncLoading, onClick],
    )

    /**
     * Mouse event handlers for visual feedback
     */
    const handleMouseDown = useCallback(() => {
      if (!disabled && !loading) {
        setIsPressed(true)
      }
    }, [disabled, loading])

    const handleMouseUp = useCallback(() => {
      setIsPressed(false)
    }, [])

    const handleMouseEnter = useCallback(() => {
      if (!disabled) {
        setIsHovered(true)
      }
    }, [disabled])

    const handleMouseLeave = useCallback(() => {
      setIsPressed(false)
      setIsHovered(false)
    }, [])

    /**
     * Keyboard event handler for accessibility
     */
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

    // Compute current size configuration
    const sizeConfig = SIZE_CONFIG[size]
    const isLoading = loading || asyncLoading
    const isInteractive = !disabled && !isLoading

    // Generate CSS custom properties for dynamic styling
    const cssVariables = {
      "--btn-width": sizeConfig.width,
      "--btn-height": sizeConfig.height,
      "--btn-padding": sizeConfig.padding,
      "--btn-font-size": sizeConfig.fontSize,
    } as React.CSSProperties

    // Compute class names
    const buttonClasses = cn(
      "productivity-button",
      `productivity-button--${variant}`,
      `productivity-button--${size}`,
      {
        "productivity-button--disabled": disabled,
        "productivity-button--loading": isLoading,
        "productivity-button--pressed": isPressed,
        "productivity-button--hovered": isHovered,
      },
      className,
    )

    // Determine button content
    const buttonContent = children || "Productivity"
    const effectiveAriaLabel = ariaLabel || `${buttonContent} button`

    return (
      <button
        ref={buttonRef}
        type="button"
        className={buttonClasses}
        style={cssVariables}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        title={title}
        aria-label={effectiveAriaLabel}
        aria-pressed={isPressed}
        aria-busy={isLoading}
        data-testid={testId}
      >
        {/* Glassmorphic overlay layer */}
        <div className="productivity-button__overlay" aria-hidden="true" />

        {/* Content container */}
        <div className="productivity-button__content">
          {/* Icon with loading state */}
          <div className="productivity-button__icon" aria-hidden="true">
            {isLoading ? (
              <Loader2 size={sizeConfig.iconSize} className="productivity-button__spinner" />
            ) : (
              <IconComponent size={sizeConfig.iconSize} />
            )}
          </div>

          {/* Text content */}
          <span className="productivity-button__text">{isLoading ? "Loading..." : buttonContent}</span>
        </div>

        {/* Focus ring for accessibility */}
        <div className="productivity-button__focus-ring" aria-hidden="true" />
      </button>
    )
  },
)

// Set display name for debugging
ProductivityButton.displayName = "ProductivityButton"

export default ProductivityButton
