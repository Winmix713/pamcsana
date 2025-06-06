"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import ProductivityButton from "@/components/ProductivityButton/ProductivityButton"
import Version1Button from "@/components/version1_button"
import Version2Button from "@/components/version2_button"
import Version4Button from "@/components/version4_button"
import Version5Button from "@/components/version5_button"
import Version6Button from "@/components/version6_button"
import Version7Button from "@/components/version7_button"
import Version8Button from "@/components/version8_button"
import { Zap, Timer, Activity } from "lucide-react"

export default function Home() {
  const [clickCount, setClickCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleAsyncClick = async () => {
    setIsLoading(true)
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setClickCount((prev) => prev + 1)
    setIsLoading(false)
  }

  const handleErrorClick = async () => {
    throw new Error("Simulated error for testing")
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="productivity-ui-theme">
      <main className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#121217] p-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Complete Button Collection</h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Production-ready button components with diverse designs, from glassmorphic to gradient styles
            </p>
          </header>

          {/* Version 8: Hybrid Productivity */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Version 8: Hybrid Productivity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-400/10 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Default</h3>
                <div className="flex justify-center">
                  <Version8Button onClick={() => console.log("🎉 Hibrid Productivity gomb aktiválva!")} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-400/10 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Custom Text</h3>
                <div className="flex justify-center">
                  <Version8Button onClick={() => console.log("Hybrid Focus clicked!")}>Focus</Version8Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-400/10 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Disabled</h3>
                <div className="flex justify-center">
                  <Version8Button disabled />
                </div>
              </div>
            </div>
          </section>

          {/* Version 1: Clean Minimal Design */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibent text-white mb-8">Version 1: Clean Minimal Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Default</h3>
                <div className="flex justify-center">
                  <Version1Button onClick={() => console.log("Version 1 clicked!")} />
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Custom Text</h3>
                <div className="flex justify-center">
                  <Version1Button onClick={() => console.log("Focus clicked!")}>Focus</Version1Button>
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Loading State</h3>
                <div className="flex justify-center">
                  <Version1Button loading />
                </div>
              </div>
            </div>
          </section>

          {/* Version 2: Enhanced with Icon */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Version 2: Enhanced with Icon</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Default Clock</h3>
                <div className="flex justify-center">
                  <Version2Button onClick={() => console.log("Version 2 clicked!")} />
                </div>
              </div>

              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Timer Icon</h3>
                <div className="flex justify-center">
                  <Version2Button icon={Timer} onClick={() => console.log("Timer clicked!")}>
                    Timer
                  </Version2Button>
                </div>
              </div>

              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Activity Icon</h3>
                <div className="flex justify-center">
                  <Version2Button icon={Activity} onClick={() => console.log("Activity clicked!")}>
                    Activity
                  </Version2Button>
                </div>
              </div>

              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Loading</h3>
                <div className="flex justify-center">
                  <Version2Button loading />
                </div>
              </div>
            </div>
          </section>

          {/* Version 3: Glassmorphic ProductivityButton */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Version 3: Glassmorphic Productivity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Default</h3>
                <div className="flex justify-center">
                  <ProductivityButton
                    onClick={() => console.log("Glassmorphic clicked!")}
                    title="Glassmorphic productivity button"
                  />
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Glow Effect</h3>
                <div className="flex justify-center">
                  <ProductivityButton
                    variant="glow"
                    onClick={() => console.log("Glow clicked!")}
                    title="Glow effect button"
                  />
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Custom Icon</h3>
                <div className="flex justify-center">
                  <ProductivityButton icon={Zap} variant="subtle" onClick={() => console.log("Custom icon clicked!")}>
                    Boost
                  </ProductivityButton>
                </div>
              </div>
            </div>
          </section>

          {/* Version 4: Withdraw Button */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Version 4: Withdraw Button</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Default</h3>
                <div className="flex justify-center">
                  <Version4Button onClick={() => console.log("Withdraw clicked!")} />
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Custom Text</h3>
                <div className="flex justify-center">
                  <Version4Button onClick={() => console.log("Transfer clicked!")}>Transfer</Version4Button>
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Loading State</h3>
                <div className="flex justify-center">
                  <Version4Button loading />
                </div>
              </div>
            </div>
          </section>

          {/* Version 5: Compact Blue Button */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Version 5: Compact Blue Button</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Blue Gradient</h3>
                <div className="flex justify-center">
                  <Version5Button onClick={() => console.log("Blue button clicked!")} />
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Blue No Icon</h3>
                <div className="flex justify-center">
                  <Version5Button showIcon={false} onClick={() => console.log("Blue no icon clicked!")} />
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Loading</h3>
                <div className="flex justify-center">
                  <Version5Button loading />
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Disabled</h3>
                <div className="flex justify-center">
                  <Version5Button disabled />
                </div>
              </div>
            </div>
          </section>

          {/* Version 6: Enhanced Blue Gradient Productivity */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Version 6: Enhanced Blue Gradient Productivity</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-700/10 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Clean Design</h3>
                <div className="flex justify-center">
                  <Version6Button onClick={() => console.log("🎉 Enhanced Blue Gradient aktiválva!")} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-700/10 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Custom Text</h3>
                <div className="flex justify-center">
                  <Version6Button onClick={() => console.log("Focus mode activated!")}>Focus</Version6Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-700/10 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Loading State</h3>
                <div className="flex justify-center">
                  <Version6Button loading />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-700/10 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Disabled</h3>
                <div className="flex justify-center">
                  <Version6Button disabled />
                </div>
              </div>
            </div>
          </section>

          {/* Version 7: Enhanced Productivity Button */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Version 7: Enhanced Productivity Button</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Default with Icon</h3>
                <div className="flex justify-center">
                  <Version7Button onClick={() => console.log("Enhanced productivity clicked!")} />
                </div>
              </div>

              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Custom Text</h3>
                <div className="flex justify-center">
                  <Version7Button onClick={() => console.log("Focus clicked!")}>Focus</Version7Button>
                </div>
              </div>

              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">No Icon</h3>
                <div className="flex justify-center">
                  <Version7Button showIcon={false} onClick={() => console.log("No icon clicked!")}>
                    Minimal
                  </Version7Button>
                </div>
              </div>

              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Loading State</h3>
                <div className="flex justify-center">
                  <Version7Button loading />
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Demo */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Interactive Demo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Async Operation</h3>
                <div className="flex justify-center">
                  <Version4Button onClick={handleAsyncClick} loading={isLoading}>
                    {isLoading ? "Processing..." : `Process (${clickCount})`}
                  </Version4Button>
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Error Handling</h3>
                <div className="flex justify-center">
                  <ProductivityButton
                    onClick={handleErrorClick}
                    variant="glow"
                    title="This will throw an error (check console)"
                  >
                    Error Test
                  </ProductivityButton>
                </div>
              </div>

              <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-4 text-center">Click Counter</h3>
                <div className="flex justify-center">
                  <Version6Button onClick={() => setClickCount((prev) => prev + 1)}>
                    Clicked {clickCount}x
                  </Version6Button>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Version Comparison</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-white text-sm font-medium mb-3 text-center">V1</h4>
                <div className="flex justify-center">
                  <Version1Button>V1</Version1Button>
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-white text-sm font-medium mb-3 text-center">V2</h4>
                <div className="flex justify-center">
                  <Version2Button>V2</Version2Button>
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-white text-sm font-medium mb-3 text-center">V3</h4>
                <div className="flex justify-center">
                  <ProductivityButton>V3</ProductivityButton>
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-white text-sm font-medium mb-3 text-center">V4</h4>
                <div className="flex justify-center">
                  <Version4Button>V4</Version4Button>
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-white text-sm font-medium mb-3 text-center">V5</h4>
                <div className="flex justify-center">
                  <Version5Button />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-700/10 p-4 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                <h4 className="text-white text-sm font-medium mb-3 text-center">V6</h4>
                <div className="flex justify-center">
                  <Version6Button>V6</Version6Button>
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-white text-sm font-medium mb-3 text-center">V7</h4>
                <div className="flex justify-center">
                  <Version7Button />
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-400/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-white text-sm font-medium mb-3 text-center">V8</h4>
                <div className="flex justify-center">
                  <Version8Button>V8</Version8Button>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="mb-16">
            <div className="bg-black/30 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white mb-6">Complete Button Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="space-y-3">
                  <h3 className="text-white font-medium">🎨 Version 1 & 2</h3>
                  <ul className="text-gray-400 space-y-1">
                    <li>
                      <strong>V1:</strong> 125×63px, Clean minimal
                    </li>
                    <li>
                      <strong>V2:</strong> 125×63px, Enhanced with icon
                    </li>
                    <li>Oval shape, subtle gradients</li>
                    <li>Refined shadow system</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-white font-medium">💎 Version 3 & 8</h3>
                  <ul className="text-gray-400 space-y-1">
                    <li>
                      <strong>V3:</strong> 130×60px, Glassmorphic
                    </li>
                    <li>
                      <strong>V8:</strong> 140×70px, Hybrid design
                    </li>
                    <li>Advanced blur effects</li>
                    <li>Premium animations</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-white font-medium">💰 Version 4</h3>
                  <ul className="text-gray-400 space-y-1">
                    <li>Size: 256×48px</li>
                    <li>Radial gradient</li>
                    <li>SF Pro Display font</li>
                    <li>Withdraw style</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-white font-medium">🔵 Version 5-7</h3>
                  <ul className="text-gray-400 space-y-1">
                    <li>
                      <strong>V5:</strong> 64×32px compact
                    </li>
                    <li>
                      <strong>V6:</strong> 140×70px clean design
                    </li>
                    <li>
                      <strong>V7:</strong> 125×63px enhanced
                    </li>
                    <li>CSS variables integration</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20">
                <h3 className="text-lg font-medium text-white mb-4">Evolution Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-8 gap-4 text-xs">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <p className="text-gray-400">Clean Minimal</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <p className="text-gray-400">Enhanced Icon</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <p className="text-gray-400">Glassmorphic</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <p className="text-gray-400">Withdraw Style</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      5
                    </div>
                    <p className="text-gray-400">Compact Blue</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      6
                    </div>
                    <p className="text-gray-400">Clean Blue</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-orange-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      7
                    </div>
                    <p className="text-gray-400">Enhanced Design</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      8
                    </div>
                    <p className="text-gray-400">Hybrid Design</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </ThemeProvider>
  )
}
