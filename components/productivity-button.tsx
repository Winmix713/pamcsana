"use client"

import { useCallback } from "react"

export default function ProductivityButton() {
  const handleClick = useCallback(() => {
    console.log("Basic productivity button clicked")
  }, [])

  return (
    <button
      onClick={handleClick}
      className="group relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
      style={{
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
      }}
      aria-label="Productivity button - clean minimal design"
    >
      {/* Subtle inner glow */}
      <div
        className="absolute inset-[1px] rounded-[31px] opacity-60"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Hover state overlay */}
      <div
        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <span
          className="font-medium text-white/90 select-none tracking-wide"
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "0.2px",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
          }}
        >
          Productivity
        </span>
      </div>

      {/* Bottom highlight */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-30"
        style={{
          width: "60%",
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
        }}
      />
    </button>
  )
}
