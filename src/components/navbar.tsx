"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("home")
  const [isHovering, setIsHovering] = useState(false)

  const navLinks = [
    { label: "HOME", href: "#", id: "home" },
    { label: "STORY", href: "#story", id: "story" },
    { label: "EVENTS", href: "/#events", id: "events" },
    { label: "OUR TEAM", href: "#team", id: "team" },
    { label: "SPONSORS", href: "#sponsors", id: "sponsors" },
    { label: "CONTACT", href: "#contact", id: "contact" },
  ]

  const [animatingId, setAnimatingId] = useState<string | null>(null)
  const animTimerRef = useRef<any>(null)

  useEffect(() => {
    return () => {
      if (animTimerRef.current) {
        window.clearTimeout(animTimerRef.current)
      }
    }
  }, [])

  const smoothScrollTo = (element: HTMLElement | null, duration: number = 1400) => {
    if (!element) return

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime: number | null = null
    let animationFrameId: number | null = null

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      
      // Easing function to match the animation cubic-bezier(.2,.8,.2,1)
      const ease = (t: number) => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      window.scrollTo(0, startPosition + distance * ease(progress))

      if (timeElapsed < duration) {
        animationFrameId = requestAnimationFrame(animation)
      }
    }

    // Cancel any ongoing scroll animation
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }

    // Disable scroll-behavior: smooth temporarily to prevent conflicts
    const originalScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    
    animationFrameId = requestAnimationFrame(animation)
    
    // Restore original scroll behavior after animation
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior
    }, duration)
  }

  const handleLabelClick = (link: { id: string; href?: string }) => {
    setActiveLink(link.id)
    setAnimatingId(link.id)
    
    // Scroll with custom timing to match animation duration
    if (link.href) {
      const hashIndex = link.href.indexOf("#")
      if (hashIndex !== -1) {
        const hash = link.href.slice(hashIndex) 
        if (hash === "#" || hash === "#0" || hash === "#\/") {
          // Scroll to top with 1400ms duration
          const startPosition = window.pageYOffset
          const distance = -startPosition
          let startTime: number | null = null
          let animationFrameId: number | null = null

          // Disable scroll-behavior: smooth temporarily
          const originalScrollBehavior = document.documentElement.style.scrollBehavior
          document.documentElement.style.scrollBehavior = 'auto'

          const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / 1400, 1)
            
            const ease = (t: number) => {
              return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2
            }

            window.scrollTo(0, startPosition + distance * ease(progress))

            if (timeElapsed < 1400) {
              animationFrameId = requestAnimationFrame(animation)
            } else {
              document.documentElement.style.scrollBehavior = originalScrollBehavior
            }
          }

          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
          }

          animationFrameId = requestAnimationFrame(animation)
        } else if (hash.length > 1) {
          const id = hash.slice(1)
          const el = document.getElementById(id)
          smoothScrollTo(el, 1400)
        }
      }
    }
    
    // Clear animation after it completes
    if (animTimerRef.current) window.clearTimeout(animTimerRef.current)
    animTimerRef.current = window.setTimeout(() => {
      setAnimatingId(null)
    }, 1400)
  }

  return (
    <nav className="fixed top-0 w-full z-50 pt-6">
      
    <div className="hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div
        className="flex flex-col items-center mb-8"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        >
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault()
            setIsHovering((v) => !v)
          }}
          aria-expanded={isHovering}
          className="px-6 py-2 border-2 rounded-full text-sm font-bold tracking-wider transition-all duration-300"
          style={{
            backgroundColor: '#0D0D0D',
            borderColor: '#F2A516',
            color: '#F2F2F2',
          }}
        >
          <Image
            src="/ck_logo.svg"
            alt="Rekorder Logo"
            width={60}
            height={40}
            className="object-contain"
          />
          
        </Link>

          <div className="flex justify-center -mt-0.5">
          <div
            className={`inline-flex nav-pill items-center gap-0 rounded-full px-0 py-0 shadow-md transition-all duration-300 transform ${
            isHovering
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-2"
            }`}
            style={{
              backgroundColor: '#0D0D0D',
              borderColor: '#F2A516',
              height: '48px',
              overflow: 'hidden',
            }}
          >
            {navLinks.map((link, index) => {
            const isActive = activeLink === link.id
            const isAnimating = animatingId === link.id
            return (
            <button
              key={link.id}
              onClick={() => handleLabelClick(link)}
              className={`transition-all duration-200 transform flex items-center justify-center ${isAnimating ? 'money-roll' : ''}`}
              style={{
                flex: 1,
                minWidth: 0,
                height: '100%',
                padding: '0 12px',
                backgroundColor: isActive ? '#F2A516' : 'transparent',
                color: isActive ? '#0D0D0D' : '#F2F2F2',
                border: isActive ? 'none' : '1px solid rgba(242,242,242,0.08)',
                transitionDelay: `${index * 40}ms`,
                borderRadius: index === 0 ? '9999px 0 0 9999px' : index === navLinks.length - 1 ? '0 9999px 9999px 0' : '0',
                zIndex: isActive ? 1 : 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              onMouseEnter={(e) => ((e.currentTarget.style.backgroundColor = isActive ? '#F2A516' : '#BF8211'))}
              onMouseLeave={(e) => ((e.currentTarget.style.backgroundColor = isActive ? '#F2A516' : 'transparent'))}
            >
              <span className="text-sm font-medium tracking-wider label">{link.label}</span>
            </button>
            )
            })}
          </div>
        </div>
        </div>
      </div>
    </div>

    <div className="md:hidden flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 bg-white">
      <Link href="/" className="text-black font-bold text-lg tracking-wider">
        Rekorder
      </Link>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-black/10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
      </button>
    </div>

    {isOpen && (
      <div className="md:hidden py-4 space-y-2 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0D0D0D', borderTop: '1px solid #F2F2F2' }}>
        {navLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => {
            setActiveLink(link.id)
            setIsOpen(false)
          }}
          className={`block w-full text-left px-4 py-3 text-sm font-medium tracking-wider rounded-lg transition-all duration-300`}
          style={{
            color: activeLink === link.id ? '#F2A516' : '#F2F2F2',
            backgroundColor: activeLink === link.id ? '#734E0A' : 'transparent',
          }}
        >
          {link.label}
        </button>
        ))}
      </div>
    )}
      <style jsx>{`
        .nav-pill button {
          background: transparent;
          color: #F2F2F2;
          border: 0;
          outline: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transform-style: preserve-3d;
          perspective: 800px;
        }
        .nav-pill button:hover {
          background: #BF8211; /* hover color */
          color: #0D0D0D;
        }
        .nav-pill button.active {
          background: #F2A516;
          color: #0D0D0D;
        }

        /* the rolling / lucky-draw effect when clicked */
        .nav-pill button.money-roll {
          z-index: 2;
          animation: rollAndSettle 1400ms cubic-bezier(.2,.8,.2,1) both;
        }

        /* moving stripe to evoke a money roll across the label */
        .nav-pill button.money-roll::before {
          content: "";
          position: absolute;
          left: -60%;
          top: -40%;
          width: 220%;
          height: 180%;
          background: linear-gradient(90deg, rgba(242,165,22,0.95) 0%, rgba(191,130,17,0.9) 35%, rgba(115,78,10,0.85) 65%, rgba(242,242,242,0.05) 100%);
          transform: rotate(-12deg);
          opacity: 0.16;
          pointer-events: none;
          animation: stripeMove 600ms linear 0ms 2;
        }

        .nav-pill button .label {
          display: inline-block;
          backface-visibility: hidden;
          transform-origin: center;
        }
        .nav-pill button.money-roll .label {
          animation: spinText 1400ms cubic-bezier(.2,.8,.2,1) both;
        }

        @keyframes stripeMove {
          0% { transform: translateX(-40%) rotate(-12deg); opacity: 0.12; }
          50% { transform: translateX(0%) rotate(-12deg); opacity: 0.26; }
          100% { transform: translateX(40%) rotate(-12deg); opacity: 0; }
        }

        @keyframes rollAndSettle {
          0% { transform: translateY(0) rotateX(0) scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0)); }
          40% { transform: translateY(-22px) rotateX(720deg) scale(1.02); filter: drop-shadow(0 8px 18px rgba(0,0,0,0.25)); }
          70% { transform: translateY(-6px) rotateX(220deg) scale(1.01); }
          85% { transform: translateY(3px) rotateX(40deg) scale(0.995); }
          100% { transform: translateY(0) rotateX(0) scale(1); }
        }

        @keyframes spinText {
          0% { transform: rotateX(0); filter: blur(0px); }
          35% { transform: rotateX(720deg) translateZ(0); filter: blur(0.6px); }
          60% { transform: rotateX(240deg); filter: blur(0.2px); }
          85% { transform: rotateX(20deg); }
          100% { transform: rotateX(0); }
        }
      `}</style>
    </nav>
  )
}