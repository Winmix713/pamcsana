
"use client"

import { useState, useCallback, useMemo, lazy, Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Zap, Timer, Activity } from "lucide-react"

// Lazy load button components for better performance
const ProductivityButton = lazy(() => import("@/components/ProductivityButton/ProductivityButton"))
const Version1Button = lazy(() => import("@/components/version1_button"))
const Version2Button = lazy(() => import("@/components/version2_button"))
const Version4Button = lazy(() => import("@/components/version4_button"))
const Version5Button = lazy(() => import("@/components/version5_button"))
const Version6Button = lazy(() => import("@/components/version6_button"))
const Version7Button = lazy(() => import("@/components/version7_button"))
const Version8Button = lazy(() => import("@/components/version8_button"))

// Loading component for suspense
const ButtonSkeleton = () => (
  <div className="w-[125px] h-[63px] bg-gray-800/50 rounded-full animate-pulse" />
)

// Performance-optimized section wrapper
const Section = ({ 
  title, 
  children, 
  className = "" 
}: { 
  title: string
  children: React.ReactNode
  className?: string
}) => (
  <section className={`mb-16 ${className}`}>
    <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">{title}</h2>
    {children}
  </section>
)

// Button demo card component
const ButtonCard = ({ 
  title, 
  children, 
  variant = "default" 
}: { 
  title: string
  children: React.ReactNode
  variant?: "default" | "blue" | "gradient"
}) => {
  const cardClasses = useMemo(() => {
    const baseClasses = "p-8 rounded-2xl border backdrop-blur-sm"
    switch (variant) {
      case "blue":
        return `${baseClasses} bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-700/10 border-blue-500/20`
      case "gradient":
        return `${baseClasses} bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-400/10 border-white/10`
      default:
        return `${baseClasses} bg-black/20 border-white/10`
    }
  }, [variant])

  return (
    <div className={cardClasses}>
      <h3 className="text-white font-medium mb-4 text-center">{title}</h3>
      <div className="flex justify-center">
        {children}
      </div>
    </div>
  )
}

// Comparison timeline component
const VersionTimeline = () => {
  const versions = useMemo(() => [
    { id: 1, name: "Clean Minimal", color: "bg-gray-600" },
    { id: 2, name: "Enhanced Icon", color: "bg-blue-600" },
    { id: 3, name: "Glassmorphic", color: "bg-purple-600" },
    { id: 4, name: "Withdraw Style", color: "bg-green-600" },
    { id: 5, name: "Compact Blue", color: "bg-blue-500" },
    { id: 6, name: "Clean Blue", color: "bg-gradient-to-br from-blue-400 to-blue-600" },
    { id: 7, name: "Enhanced Design", color: "bg-orange-600" },
    { id: 8, name: "Hybrid Design", color: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400" },
  ], [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-4 text-xs">
      {versions.map((version) => (
        <div key={version.id} className="text-center">
          <div className={`w-8 h-8 ${version.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold`}>
            {version.id}
          </div>
          <p className="text-gray-400">{version.name}</p>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  const [clickCount, setClickCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Optimized async handler with useCallback
  const handleAsyncClick = useCallback(async () => {
    setIsLoading(true)
    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setClickCount((prev) => prev + 1)
    } catch (error) {
      console.error("Async operation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Error handler with proper error boundary
  const handleErrorClick = useCallback(async () => {
    try {
      throw new Error("Simulated error for testing")
    } catch (error) {
      console.error("Button error:", error)
    }
  }, [])

  // Increment counter with useCallback
  const incrementCounter = useCallback(() => {
    setClickCount((prev) => prev + 1)
  }, [])

  // Console handlers with useCallback
  const handleVersion8Click = useCallback(() => {
    console.log("🎉 Hybrid Productivity button activated!")
  }, [])

  const handleVersion1Click = useCallback(() => {
    console.log("Version 1 clicked!")
  }, [])

  const handleFocusClick = useCallback(() => {
    console.log("Focus clicked!")
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="productivity-ui-theme">
      <main className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#121217] p-8">
        <div className="max-w-7xl mx-auto">
          {/* Optimized header */}
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Complete Button Collection
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Production-ready button components with diverse designs, from glassmorphic to gradient styles
            </p>
          </header>

          {/* Version 8: Hybrid Productivity */}
          <Section title="Version 8: Hybrid Productivity">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ButtonCard title="Default" variant="gradient">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version8Button onClick={handleVersion8Click} />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Custom Text" variant="gradient">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version8Button onClick={handleFocusClick}>Focus</Version8Button>
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Disabled" variant="gradient">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version8Button disabled />
                </Suspense>
              </ButtonCard>
            </div>
          </Section>

          {/* Version 1: Clean Minimal Design */}
          <Section title="Version 1: Clean Minimal Design">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ButtonCard title="Default">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version1Button onClick={handleVersion1Click} />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Custom Text">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version1Button onClick={handleFocusClick}>Focus</Version1Button>
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Loading State">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version1Button loading />
                </Suspense>
              </ButtonCard>
            </div>
          </Section>

          {/* Version 2: Enhanced with Icon */}
          <Section title="Version 2: Enhanced with Icon">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ButtonCard title="Default Clock">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version2Button onClick={handleVersion1Click} />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Timer Icon">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version2Button icon={Timer} onClick={handleFocusClick}>
                    Timer
                  </Version2Button>
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Activity Icon">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version2Button icon={Activity} onClick={handleFocusClick}>
                    Activity
                  </Version2Button>
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Loading">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version2Button loading />
                </Suspense>
              </ButtonCard>
            </div>
          </Section>

          {/* Version 3: Glassmorphic ProductivityButton */}
          <Section title="Version 3: Glassmorphic Productivity">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ButtonCard title="Default">
                <Suspense fallback={<ButtonSkeleton />}>
                  <ProductivityButton
                    onClick={handleFocusClick}
                    title="Glassmorphic productivity button"
                  />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Glow Effect">
                <Suspense fallback={<ButtonSkeleton />}>
                  <ProductivityButton
                    variant="glow"
                    onClick={handleFocusClick}
                    title="Glow effect button"
                  />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Custom Icon">
                <Suspense fallback={<ButtonSkeleton />}>
                  <ProductivityButton icon={Zap} variant="subtle" onClick={handleFocusClick}>
                    Boost
                  </ProductivityButton>
                </Suspense>
              </ButtonCard>
            </div>
          </Section>

          {/* Version 4: Withdraw Button */}
          <Section title="Version 4: Withdraw Button">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ButtonCard title="Default">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version4Button onClick={handleFocusClick} />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Custom Text">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version4Button onClick={handleFocusClick}>Transfer</Version4Button>
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Loading State">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version4Button loading />
                </Suspense>
              </ButtonCard>
            </div>
          </Section>

          {/* Version 5: Compact Blue Button */}
          <Section title="Version 5: Compact Blue Button">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <ButtonCard title="Blue Gradient">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version5Button onClick={handleFocusClick} />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Blue No Icon">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version5Button showIcon={false} onClick={handleFocusClick} />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Loading">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version5Button loading />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Disabled">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version5Button disabled />
                </Suspense>
              </ButtonCard>
            </div>
          </Section>

          {/* Version 6: Enhanced Blue Gradient Productivity */}
          <Section title="Version 6: Enhanced Blue Gradient Productivity">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ButtonCard title="Clean Design" variant="blue">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version6Button onClick={handleVersion8Click} />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Custom Text" variant="blue">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version6Button onClick={handleFocusClick}>Focus</Version6Button>
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Loading State" variant="blue">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version6Button loading />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Disabled" variant="blue">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version6Button disabled />
                </Suspense>
              </ButtonCard>
            </div>
          </Section>

          {/* Version 7: Enhanced Productivity Button */}
          <Section title="Version 7: Enhanced Productivity Button">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ButtonCard title="Default with Icon">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version7Button onClick={handleFocusClick} />
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Custom Text">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version7Button onClick={handleFocusClick}>Focus</Version7Button>
                </Suspense>
              </ButtonCard>

              <ButtonCard title="No Icon">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version7Button showIcon={false} onClick={handleFocusClick}>
                    Minimal
                  </Version7Button>
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Loading State">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version7Button loading />
                </Suspense>
              </ButtonCard>
            </div>
          </Section>

          {/* Interactive Demo */}
          <Section title="Interactive Demo">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ButtonCard title="Async Operation">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version4Button onClick={handleAsyncClick} loading={isLoading}>
                    {isLoading ? "Processing..." : `Process (${clickCount})`}
                  </Version4Button>
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Error Handling">
                <Suspense fallback={<ButtonSkeleton />}>
                  <ProductivityButton
                    onClick={handleErrorClick}
                    variant="glow"
                    title="This will throw an error (check console)"
                  >
                    Error Test
                  </ProductivityButton>
                </Suspense>
              </ButtonCard>

              <ButtonCard title="Click Counter">
                <Suspense fallback={<ButtonSkeleton />}>
                  <Version6Button onClick={incrementCounter}>
                    Clicked {clickCount}x
                  </Version6Button>
                </Suspense>
              </ButtonCard>
            </div>
          </Section>

          {/* Comparison Grid */}
          <Section title="Version Comparison">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((version) => (
                <ButtonCard key={version} title={`V${version}`} variant={version === 6 ? "blue" : version === 8 ? "gradient" : "default"}>
                  <Suspense fallback={<ButtonSkeleton />}>
                    {version === 1 && <Version1Button>V1</Version1Button>}
                    {version === 2 && <Version2Button>V2</Version2Button>}
                    {version === 3 && <ProductivityButton>V3</ProductivityButton>}
                    {version === 4 && <Version4Button>V4</Version4Button>}
                    {version === 5 && <Version5Button />}
                    {version === 6 && <Version6Button>V6</Version6Button>}
                    {version === 7 && <Version7Button />}
                    {version === 8 && <Version8Button>V8</Version8Button>}
                  </Suspense>
                </ButtonCard>
              ))}
            </div>
          </Section>

          {/* Technical Specifications */}
          <Section title="Complete Button Specifications">
            <div className="bg-black/30 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="space-y-3">
                  <h3 className="text-white font-medium">🎨 Version 1 & 2</h3>
                  <ul className="text-gray-400 space-y-1">
                    <li><strong>V1:</strong> 125×63px, Clean minimal</li>
                    <li><strong>V2:</strong> 125×63px, Enhanced with icon</li>
                    <li>Oval shape, subtle gradients</li>
                    <li>Refined shadow system</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-white font-medium">💎 Version 3 & 8</h3>
                  <ul className="text-gray-400 space-y-1">
                    <li><strong>V3:</strong> 130×60px, Glassmorphic</li>
                    <li><strong>V8:</strong> 140×70px, Hybrid design</li>
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
                    <li><strong>V5:</strong> 64×32px compact</li>
                    <li><strong>V6:</strong> 140×70px clean design</li>
                    <li><strong>V7:</strong> 125×63px enhanced</li>
                    <li>CSS variables integration</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20">
                <h3 className="text-lg font-medium text-white mb-4">Evolution Timeline</h3>
                <VersionTimeline />
              </div>
            </div>
          </Section>
        </div>
      </main>
    </ThemeProvider>
  )
}
