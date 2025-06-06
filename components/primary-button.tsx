"use client"

import { useCallback } from "react"
import { Clock } from "lucide-react"
import BaseButton from "./base-button"

export default function PrimaryButton() {
  const handleClick = useCallback(() => {
    console.log("Primary productivity button clicked")
  }, [])

  return (
    <BaseButton onClick={handleClick} variant="primary" aria-label="Primary productivity button">
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-white/90 drop-shadow-sm" aria-hidden="true" />
        <span className="font-semibold text-[15px] leading-[22px] text-white tracking-[0.3px] drop-shadow-sm">
          Productivity
        </span>
      </div>
    </BaseButton>
  )
}
