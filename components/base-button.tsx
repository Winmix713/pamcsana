"use client"

import { type ReactNode, useCallback, useMemo } from "react"
import { cn } from "@/lib/utils"

export interface BaseButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "basic" | "primary" | "secondary"
  disabled?: boolean
  "aria-label"?: string
}

interface ButtonStyles {
  container: string
  background: string
  hoverBackground: string
  innerGlow: string
  borderColor: string
}

export default function BaseButton({
  children,
  onClick,
  className,
  variant = "basic",
  disabled = false,
  "aria-label": ariaLabel,
}: BaseButtonProps) {
  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick()
    }
  }, [disabled, onClick])

  const styles = useMemo((): ButtonStyles => {
    const baseStyles = {
      container: "relative w-[125px] h-[63px] rounded-full border transition-all duration-300 ease-out transform-gpu",
      background: "",
      hoverBackground: "",
      innerGlow: "",
      borderColor: "border-white/6",
    }

    switch (variant) {
      case "primary":
        return {
          ...baseStyles,
          background: "bg-gradient-to-r from-[#1C1C1C] via-[#2A2A2A] to-[#333333]",
          hoverBackground: "hover:from-[#2A2A2A] hover:via-[#383838] hover:to-[#444444]",
          innerGlow: "from-[#5A5A5A] to-[#1A1A1A]",
        }
      case "secondary":
        return {
          ...baseStyles,
          background: "bg-gradient-to-r from-[#2D1B69] via-[#3D2580] to-[#1A0F3D]",
          hoverBackground: "hover:from-[#3D2580] hover:via-[#4D2F90] hover:to-[#251454]",
          innerGlow: "from-[#6B46C1] to-[#2D1B69]",
          borderColor: "border-purple-500/20",
        }
      default:
        return {
          ...baseStyles,
          background: "bg-gradient-to-r from-[#111214] via-[#1A1C1F] to-[#0C0D0F]",
          hoverBackground: "hover:from-[#1A1C1F] hover:via-[#252830] hover:to-[#15161A]",
          innerGlow: "from-[#5A5A5A] to-[#1A1A1A]",
        }
    }
  }, [variant])

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        styles.container,
        styles.background,
        styles.hoverBackground,
        styles.borderColor,
        "hover:scale-105 hover:shadow-2xl",
        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent",
        "active:scale-95 active:transition-transform active:duration-75",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        "cursor-pointer select-none",
        "shadow-[inset_0.25px_1.25px_0px_0.75px_rgba(255,255,255,0.1)]",
        "hover:shadow-[inset_0.25px_1.25px_0px_0.75px_rgba(255,255,255,0.15),_0_8px_32px_rgba(0,0,0,0.3)]",
        className,
      )}
    >
      {/* Inner glow effect */}
      <div
        className={cn(
          "absolute inset-[9px] rounded-full border backdrop-blur-sm",
          `bg-gradient-radial ${styles.innerGlow}`,
          variant === "secondary" ? "border-purple-500/30" : "border-gray-500/30",
        )}
      >
        {/* Subtle highlight overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">{children}</div>
    </button>
  )
}
