"use client"

import { useRef, useState, useEffect } from "react"
import DivisionCard from "./division-card"

const divisions = [
  // 1️⃣ President (1 member)
  {
    id: 1,
    name: "President",
    quote: "Leading the club with vision and passion.",
    images: ["/images/PRESIDENT.png"],
    members: [
      { name: "Jas K Krish Singh", designation: "President" }
    ]
  },
  // 2️⃣ Operations Heads (2 members)
  {
    id: 2,
    name: "Operations Heads",
    quote: "Ensuring everything runs smoothly behind the scenes.",
    images: ["/images/Abhinav.png", "/images/Yashvanth.png"],
    members: [
      { name: "Abhinav", designation: "Head" },
      { name: "Yaswanth", designation: "Head" }
    ]
  },
  // 3️⃣ Content Team (3 members)
  {
    id: 3,
    name: "Content Team",
    quote: "Creating content that inspires and engages.",
    images: ["/images/Aaron.png", "/images/Hari-prasad.png", "/images/hatim.png"],
    members: [
      { name: "Aaron", designation: "Head" },
      { name: "Hari Prasad Krishnamurthy", designation: "Head" },
      { name: "Noorul Hatim", designation: "Lead" }
    ]
  },
  // 4️⃣ Creatives (3 members)
  {
    id: 4,
    name: "Creatives",
    quote: "Bringing ideas to life through visuals and design.",
    images: ["/images/bhavna.png", "/images/Akash.png", "/images/Sashank.png"],
    members: [
      { name: "Bhavna", designation: "Head" },
      { name: "Akash Ravindran", designation: "Head" },
      { name: "Sashank", designation: "Lead" }
    ]
  },
  // 5️⃣ Competitive Programming (3 members)
  {
    id: 5,
    name: "Competitive Programming",
    quote: "Coding challenges that sharpen our skills.",
    images: ["/images/shashi.png", "/images/Manasa.png", "/images/mrudu.png"],
    members: [
      { name: "Shashikumar", designation: "Head" },
      { name: "Manasa", designation: "Lead" },
      { name: "Mrudhubashni", designation: "Lead" }
    ]
  },
  // 6️⃣ Web3 Team (3 members)
  {
    id: 6,
    name: "Web3 Team",
    quote: "Exploring the decentralized future.",
    images: ["/images/Deepanshu.png", "/images/Achyuth.png", "/images/Sanjay.png"],
    members: [
      { name: "Deepanshu", designation: "Head" },
      { name: "Achyuth", designation: "Lead" },
      { name: "Sanjay Ganesh", designation: "Lead" }
    ]
  },
  // 7️⃣ Cybersecurity Team (3 members)
  {
    id: 7,
    name: "Cybersecurity Team",
    quote: "Protecting our digital assets and information.",
    images: ["/images/Dhanush-Adithyan.png", "/images/Rishit.png", "/images/Adithya.png"],
    members: [
      { name: "Dhanush Adithyan", designation: "Head" },
      { name: "Archangel", designation: "Head" },
      { name: "Adithya", designation: "Lead" }
    ]
  },
  // 8️⃣ PR & Management (4 members)
  {
    id: 8,
    name: "PR & Management",
    quote: "Connecting people and managing the club image.",
    images: ["/images/Kavya.png", "/images/pragathi.png", "/images/Siddharth.png", "/images/Satya.png"],
    members: [
      { name: "Kavya", designation: "Head" },
      { name: "Pragathi", designation: "Head" },
      { name: "Siddarth", designation: "Lead" },
      { name: "Satya", designation: "Lead" }
    ]
  },
  // 9️⃣ Development Team (4 members)
  {
    id: 9,
    name: "Development Team",
    quote: "Building tools and platforms to empower the club.",
    images: ["/images/Nitesh.png", "/images/Srivatsa.png", "/images/Vikas.png", "/images/VinothAnandgani.png"],
    members: [
      { name: "Nithesh", designation: "Head" },
      { name: "Srivatsa", designation: "Head" },
      { name: "Vikas", designation: "Lead" },
      { name: "Vinoth", designation: "Lead" }
    ]
  },
]

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeDivision, setActiveDivision] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isTransitioning) return

      const imagesInCurrent = divisions[activeDivision].images.length
      const scrollDown = e.deltaY > 0
      const isAtStart = activeDivision === 0 && currentImageIndex === 0
      const isAtEnd =
        activeDivision === divisions.length - 1 &&
        currentImageIndex === imagesInCurrent - 1

      if ((scrollDown && isAtEnd) || (!scrollDown && isAtStart)) return

      if (scrollDown) {
        if (currentImageIndex < imagesInCurrent - 1) {
          setCurrentImageIndex((prev) => prev + 1)
        } else if (activeDivision < divisions.length - 1) {
          setIsTransitioning(true)
          setActiveDivision((prev) => prev + 1)
          setCurrentImageIndex(0)
          setTimeout(() => setIsTransitioning(false), 600)
        }
      } else {
        if (currentImageIndex > 0) {
          setCurrentImageIndex((prev) => prev - 1)
        } else if (activeDivision > 0) {
          setIsTransitioning(true)
          setActiveDivision((prev) => prev - 1)
          const prevImages = divisions[activeDivision - 1].images.length
          setCurrentImageIndex(prevImages - 1)
          setTimeout(() => setIsTransitioning(false), 600)
        }
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [activeDivision, currentImageIndex, isTransitioning])

  useEffect(() => {
    let totalSteps = 0
    divisions.forEach((d) => (totalSteps += d.images.length))
    let currentStep = 0
    for (let i = 0; i < activeDivision; i++) {
      currentStep += divisions[i].images.length
    }
    currentStep += currentImageIndex
    setScrollProgress((currentStep / totalSteps) * 100)
  }, [activeDivision, currentImageIndex])

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: "var(--retro-bg)",
        backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%, transparent)`,
        backgroundSize: "40px 40px",
      }}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative w-full h-full">
        <div
          className="flex h-full transition-all duration-700 ease-out"
          style={{
            transform: `translateX(-${activeDivision * 100}%)`,
            filter: isTransitioning ? "brightness(0.9)" : "brightness(1)",
          }}
        >
          {divisions.map((division) => (
            <div
              key={division.id}
              className="w-full h-full flex-shrink-0 animate-in fade-in"
              style={{
                animation:
                  isTransitioning && divisions[activeDivision].id === division.id
                    ? "slideInRetro 0.6s cubic-bezier(0.34,1.56,0.64,1)"
                    : "none",
              }}
            >
              <DivisionCard
                division={division}
                currentImageIndex={currentImageIndex}
                isActive={divisions[activeDivision].id === division.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          backgroundColor: "var(--retro-primary)",
          borderTop: "4px solid var(--retro-secondary)",
        }}
        className="absolute bottom-0 left-0 right-0 h-3 shadow-lg"
      >
        <div
          style={{
            backgroundColor: "var(--retro-secondary)",
            width: `${scrollProgress}%`,
          }}
          className="h-full transition-all duration-300 shadow-lg"
        />
      </div>

      {/* Division Buttons */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {divisions.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveDivision(index)
              setCurrentImageIndex(0)
            }}
            style={{
              backgroundColor: index === activeDivision ? "var(--retro-secondary)" : "var(--retro-light)",
              color: "var(--retro-primary)",
              borderColor: "var(--retro-primary)",
              transform: index === activeDivision ? "scale(1.1)" : "scale(1)",
            }}
            className={`transition-all duration-300 font-black text-xs uppercase tracking-widest border-4 px-3 py-1 ${
              index === activeDivision ? "px-4 py-2 shadow-lg" : "hover:bg-retro-secondary"
            }`}
            aria-label={`Go to ${divisions[index].name} division`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Image Indicators */}
      <div
        style={{
          backgroundColor: "var(--retro-light)",
          borderColor: "var(--retro-primary)",
        }}
        className="absolute top-8 right-8 flex gap-2 z-10 px-4 py-3 border-4 shadow-lg"
      >
        {divisions[activeDivision].images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            style={{
              backgroundColor: currentImageIndex === index ? "var(--retro-primary)" : "var(--retro-secondary)",
              borderColor: "var(--retro-primary)",
              width: currentImageIndex === index ? "32px" : "12px",
            }}
            className="h-3 transition-all duration-300 border-2"
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          backgroundColor: "var(--retro-secondary)",
          color: "var(--retro-primary)",
          borderColor: "var(--retro-primary)",
        }}
        className="absolute top-8 left-8 text-sm z-10 px-4 py-2 border-4 font-black shadow-lg"
      >
        <p className="uppercase tracking-widest">↓ SCROLL ↓</p>
      </div>

      <style>{`
        @keyframes slideInRetro {
          0% { transform: translateX(100px) rotateY(45deg); opacity: 0; }
          50% { transform: translateX(50px) rotateY(22.5deg); }
          100% { transform: translateX(0) rotateY(0deg); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
