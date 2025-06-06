"use client"

import { useState, useCallback, useMemo } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Zap, Timer, Activity, Sparkles, Coffee, Target } from "lucide-react"

// Direct imports to prevent hydration issues
import ProductivityButton from "@/components/ProductivityButton/ProductivityButton"
import Version1Button from "@/components/version1_button"
import Version2Button from "@/components/version2_button"
import Version3Button from "@/components/version3_button"
import Version4Button from "@/components/version4_button"
import Version5Button from "@/components/version5_button"
import Version6Button from "@/components/version6_button"
import Version7Button from "@/components/version7_button"
import Version8Button from "@/components/version8_button"

// Enhanced section wrapper with better typography
const Section = ({ 
  title, 
  children, 
  className = "",
  description,
  icon: Icon
}: { 
  title: string
  children: React.ReactNode
  className?: string
  description?: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
}) => (
  <section className={`mb-20 ${className}`}>
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        {Icon && <Icon size={28} className="text-blue-400" />}
        <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {description && (
        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
    {children}
  </section>
)

// Enhanced button card with better styling
const ButtonCard = ({ 
  title, 
  children, 
  variant = "default",
  description
}: { 
  title: string
  children: React.ReactNode
  variant?: "default" | "blue" | "gradient" | "premium"
  description?: string
}) => {
  const cardClasses = useMemo(() => {
    const baseClasses = "group relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl"

    switch (variant) {
      case "blue":
        return `${baseClasses} bg-gradient-to-br from-blue-500/15 via-blue-600/10 to-blue-700/5 border-blue-400/30 hover:border-blue-400/50`
      case "gradient":
        return `${baseClasses} bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-pink-400/5 border-purple-400/30 hover:border-purple-400/50`
      case "premium":
        return `${baseClasses} bg-gradient-to-br from-amber-500/10 via-orange-500/8 to-red-500/5 border-amber-400/30 hover:border-amber-400/50`
      default:
        return `${baseClasses} bg-gradient-to-br from-white/8 via-white/5 to-white/2 border-white/20 hover:border-white/30`
    }
  }, [variant])

  return (
    <div className={cardClasses}>
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5" />
      </div>

      <div className="relative z-10">
        <h3 className="text-white font-semibold mb-2 text-center group-hover:text-blue-200 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-gray-400 text-sm mb-4 text-center">
            {description}
          </p>
        )}
        <div className="flex justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}

// Enhanced version timeline
const VersionTimeline = () => {
  const versions = useMemo(() => [
    { id: 1, name: "Clean Minimal", color: "from-gray-500 to-gray-600", icon: "✨" },
    { id: 2, name: "Enhanced Icon", color: "from-blue-500 to-blue-600", icon: "🎯" },
    { id: 3, name: "Glassmorphic", color: "from-purple-500 to-purple-600", icon: "💎" },
    { id: 4, name: "Withdraw Style", color: "from-green-500 to-green-600", icon: "💰" },
    { id: 5, name: "Compact Blue", color: "from-cyan-500 to-blue-500", icon: "🔵" },
    { id: 6, name: "Clean Blue", color: "from-blue-400 to-blue-600", icon: "🎨" },
    { id: 7, name: "Enhanced Design", color: "from-orange-500 to-red-500", icon: "🚀" },
    { id: 8, name: "Hybrid Design", color: "from-indigo-500 via-purple-500 to-pink-400", icon: "⚡" },
  ], [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {versions.map((version, index) => (
        <div 
          key={version.id} 
          className="text-center group cursor-pointer transition-all duration-300 hover:scale-110"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`w-12 h-12 bg-gradient-to-br ${version.color} rounded-2xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12`}>
            <span className="text-xl">{version.icon}</span>
          </div>
          <p className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
            {version.name}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  const [clickCount, setClickCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Optimized handlers
  const handleAsyncClick = useCallback(async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setClickCount((prev) => prev + 1)
    } catch (error) {
      console.error("Async operation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleErrorClick = useCallback(async () => {
    try {
      throw new Error("Simulated error for testing")
    } catch (error) {
      console.error("Button error:", error)
    }
  }, [])

  const incrementCounter = useCallback(() => {
    setClickCount((prev) => prev + 1)
  }, [])

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
      <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#1a0f1a] relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="max-w-7xl mx-auto p-8 relative z-10">
          {/* Enhanced header */}
          <header className="text-center mb-20">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ultimate Button
                </span>
                <br />
                Collection
              </h1>
              <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
                Discover the most comprehensive collection of premium button components, 
                featuring cutting-edge designs from glassmorphic to gradient styles
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Sparkles size={16} className="text-yellow-400" />
                  8 Unique Designs
                </span>
                <span className="flex items-center gap-2">
                  <Target size={16} className="text-green-400" />
                  Production Ready
                </span>
                <span className="flex items-center gap-2">
                  <Coffee size={16} className="text-orange-400" />
                  Modern & Clean
                </span>
              </div>
            </div>
          </header>

          {/* Featured Version 8 */}
          <Section 
            title="Featured: Hybrid Productivity" 
            description="Our flagship button design combining the best elements from all versions"
            icon={Zap}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <ButtonCard title="Default State" variant="gradient" description="Standard hybrid button">
                <Version8Button onClick={handleVersion8Click} />
              </ButtonCard>

              <ButtonCard title="Custom Text" variant="gradient" description="Personalized content">
                <Version8Button onClick={handleFocusClick}>Focus Mode</Version8Button>
              </ButtonCard>

              <ButtonCard title="Disabled State" variant="gradient" description="Inactive button demo">
                <Version8Button disabled />
              </ButtonCard>
            </div>
          </Section>

          {/* Version 1: Clean Minimal */}
          <Section 
            title="Clean Minimal Design" 
            description="Elegant simplicity with refined typography and subtle gradients"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ButtonCard title="Standard" description="Default minimal design">
                <Version1Button onClick={handleVersion1Click} />
              </ButtonCard>

              <ButtonCard title="Custom Text" description="Personalized content">
                <Version1Button onClick={handleFocusClick}>Focus</Version1Button>
              </ButtonCard>

              <ButtonCard title="Loading State" description="Processing animation">
                <Version1Button loading />
              </ButtonCard>
            </div>
          </Section>

          {/* Version 2: Enhanced with Icon */}
          <Section 
            title="Enhanced Icon Design" 
            description="Elevated design with dynamic icons and improved visual hierarchy"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ButtonCard title="Clock Icon" description="Time-based productivity">
                <Version2Button onClick={handleVersion1Click} />
              </ButtonCard>

              <ButtonCard title="Timer Mode" description="Countdown functionality">
                <Version2Button icon={Timer} onClick={handleFocusClick}>Timer</Version2Button>
              </ButtonCard>

              <ButtonCard title="Activity Tracker" description="Progress monitoring">
                <Version2Button icon={Activity} onClick={handleFocusClick}>Activity</Version2Button>
              </ButtonCard>

              <ButtonCard title="Loading" description="Processing state">
                <Version2Button loading />
              </ButtonCard>
            </div>
          </Section>

          {/* Version 3: Glassmorphic */}
          <Section 
            title="Glassmorphic Excellence" 
            description="Advanced glass morphism with sophisticated blur effects and lighting"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ButtonCard title="Classic Glass" description="Standard glassmorphic style">
                <Version3Button onClick={handleFocusClick} />
              </ButtonCard>

              <ButtonCard title="Glow Effect" description="Enhanced luminous design">
                <Version3Button variant="glow" onClick={handleFocusClick} />
              </ButtonCard>

              <ButtonCard title="Subtle Variant" description="Minimalist glass approach">
                <Version3Button icon={Zap} variant="subtle" onClick={handleFocusClick}>Boost</Version3Button>
              </ButtonCard>
            </div>
          </Section>

          {/* Interactive Demo Section */}
          <Section 
            title="Interactive Demonstrations" 
            description="Test advanced functionality and state management"
            icon={Target}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ButtonCard title="Async Processing" variant="blue" description="Simulated API calls">
                <Version4Button onClick={handleAsyncClick} loading={isLoading}>
                  {isLoading ? "Processing..." : `Process (${clickCount})`}
                </Version4Button>
              </ButtonCard>

              <ButtonCard title="Error Handling" variant="premium" description="Exception management">
                <ProductivityButton onClick={handleErrorClick} variant="glow">
                  Error Test
                </ProductivityButton>
              </ButtonCard>

              <ButtonCard title="Click Counter" variant="gradient" description="State tracking demo">
                <Version6Button onClick={incrementCounter}>
                  Clicked {clickCount}x
                </Version6Button>
              </ButtonCard>
            </div>
          </Section>

          {/* Complete Comparison Grid */}
          <Section 
            title="Complete Version Comparison" 
            description="Side-by-side comparison of all button variations"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12">
              <ButtonCard title="V1" variant="default">
                <Version1Button>V1</Version1Button>
              </ButtonCard>
              <ButtonCard title="V2" variant="default">
                <Version2Button>V2</Version2Button>
              </ButtonCard>
              <ButtonCard title="V3" variant="premium">
                <Version3Button>V3</Version3Button>
              </ButtonCard>
              <ButtonCard title="V4" variant="default">
                <Version4Button>V4</Version4Button>
              </ButtonCard>
              <ButtonCard title="V5" variant="blue">
                <Version5Button />
              </ButtonCard>
              <ButtonCard title="V6" variant="blue">
                <Version6Button>V6</Version6Button>
              </ButtonCard>
              <ButtonCard title="V7" variant="premium">
                <Version7Button />
              </ButtonCard>
              <ButtonCard title="V8" variant="gradient">
                <Version8Button>V8</Version8Button>
              </ButtonCard>
            </div>
          </Section>

          {/* Technical Specifications */}
          <Section 
            title="Technical Specifications & Evolution" 
            description="Comprehensive overview of design progression and technical details"
          >
            <div className="bg-gradient-to-br from-black/40 via-black/30 to-black/20 p-10 rounded-3xl border border-white/10 backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    <span className="text-2xl">🎨</span> Minimal Series
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p><strong className="text-blue-400">V1:</strong> 125×63px, Clean design</p>
                    <p><strong className="text-blue-400">V2:</strong> 125×63px, Icon enhanced</p>
                    <p className="text-sm text-gray-400">• Oval geometry • Subtle gradients • Refined shadows</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    <span className="text-2xl">💎</span> Premium Series
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p><strong className="text-purple-400">V3:</strong> 130×60px, Glassmorphic</p>
                    <p><strong className="text-purple-400">V8:</strong> 140×70px, Hybrid design</p>
                    <p className="text-sm text-gray-400">• Advanced blur • Premium animations • Multi-variant</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    <span className="text-2xl">💰</span> Functional Series
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p><strong className="text-green-400">V4:</strong> 256×48px, Withdraw style</p>
                    <p><strong className="text-green-400">V5:</strong> 64×32px, Compact design</p>
                    <p className="text-sm text-gray-400">• Radial gradients • SF Pro font • Business focused</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    <span className="text-2xl">🔵</span> Modern Series
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p><strong className="text-cyan-400">V6:</strong> 140×70px, Clean blue</p>
                    <p><strong className="text-cyan-400">V7:</strong> 125×63px, Enhanced</p>
                    <p className="text-sm text-gray-400">• CSS variables • Modern gradients • Consistent sizing</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 rounded-2xl border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Design Evolution Timeline</h3>
                <VersionTimeline />
              </div>
            </div>
          </Section>
        </div>
      </main>
    </ThemeProvider>
  )
}