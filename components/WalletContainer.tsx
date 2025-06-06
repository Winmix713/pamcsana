"use client"

import { useCallback } from "react"
import "./WalletContainer.css"

interface WalletContainerProps {
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function WalletContainer({ onClick, className = "", disabled = false }: WalletContainerProps) {
  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick()
    } else if (!disabled) {
      console.log("Version 3: Wallet container productivity clicked")
    }
  }, [disabled, onClick])

  return (
    <div className={`wallet-container ${className}`}>
      {/* Productivity Text */}
      <div className="productivity-text">Productivity</div>

      {/* Wallet Label Container */}
      <div className="wallet-label-container">
        {/* Inner Container with Horizontal Bars */}
        <div className="wallet-label-inner-container">
          <div className="testimonial-browser-tab-inner-left-1"></div>
          <div className="testimonial-browser-tab-inner-left-2"></div>
        </div>

        {/* Right Side Button Container */}
        <div className="wallet-label-container-2" onClick={handleClick}>
          <div className="wallet-label-inner-container-2"></div>
        </div>
      </div>
    </div>
  )
}
