"use client"

import Image from "next/image"

interface TeamMember {
  name: string
  designation: string
}

interface DivisionCardProps {
  division: {
    id: number
    name: string
    quote: string
    images: string[]
  }
  currentImageIndex: number
  isActive: boolean
}

const teamMembers: Record<string, TeamMember[]> = {
  "President": [
    { name: "Jas Kkrish Singh", designation: "President" },
  ],
  "Operations Heads": [
    { name: "Abhinav KA", designation: "Head" },
    { name: "Yaswanth MR", designation: "Head" },
  ],
  "Content Team": [
    { name: "Aaron Samuel", designation: "Head" },
    { name: "Hari Prasad", designation: "Head" },
    { name: "Noorul Hatim", designation: "Lead" },
  ],
  "Creatives": [
    { name: "Bhavna J", designation: "Head" },
    { name: "Akash Ravindran", designation: "Head" },
    { name: "Sashank", designation: "Lead" },
  ],
  "Competitive Programming": [
    { name: "Shashikumar", designation: "Head" },
    { name: "Manasa", designation: "Lead" },
    { name: "Mrudhubashni", designation: "Lead" },
  ],
  "Web3 Team": [
    { name: "Deepanshu", designation: "Head" },
    { name: "Achyuth", designation: "Lead" },
    { name: "Sanjay Ganesh", designation: "Lead" },
  ],
  "Cybersecurity Team": [
    { name: "Dhanush Adithyan", designation: "Head" },
    { name: "Rishit Chanda", designation: "Head" },
    { name: "Adithya", designation: "Lead" },
  ],
  "PR & Management": [
    { name: "Kavya", designation: "Head" },
    { name: "Pragathi", designation: "Head" },
    { name: "Siddarth", designation: "Lead" },
    { name: "Satya", designation: "Lead" },
  ],
  "Development Team": [
    { name: "Nithesh", designation: "Head" },
    { name: "Srivatsa", designation: "Head" },
    { name: "Vikas", designation: "Lead" },
    { name: "Vinoth", designation: "Lead" },
  ],
}

export default function DivisionCard({ division, currentImageIndex, isActive }: DivisionCardProps) {
  const currentMember = teamMembers[division.name]?.[currentImageIndex] || { name: "Team Member", designation: "Role" }

  return (
    <div className="w-full h-full flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-7xl h-full flex gap-8 md:gap-12">
        {/* Image Container */}
        <div
          style={{
            backgroundColor: "var(--retro-light)",
            borderColor: "var(--retro-primary)",
          }}
          className="flex-1 flex flex-col rounded-none overflow-hidden shadow-2xl border-8"
        >
          {/* Image Slot */}
          <div
            style={{ backgroundColor: "var(--retro-bg)" }}
            className="flex-1 relative overflow-hidden perspective"
          >
            {isActive && (
              <div className="relative w-full h-full">
                <div
                  className="w-full h-full transition-all duration-500 ease-out"
                  style={{ transform: `translateY(-${currentImageIndex * 100}%)` }}
                >
                  {division.images.map((image, index) => (
                    <div key={index} className="w-full h-full relative flex-shrink-0">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${division.name} team image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div
                        style={{
                          background: "linear-gradient(to bottom, transparent, transparent, rgba(42,42,42,0.2))",
                        }}
                        className="absolute inset-0 pointer-events-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Team Member Info */}
          <div
            style={{
              backgroundColor: "var(--retro-primary)",
              borderTop: "8px solid var(--retro-secondary)",
            }}
            className="px-6 py-4"
          >
            <p
              style={{ color: "var(--retro-light)" }}
              className="font-black text-lg uppercase tracking-widest text-center"
            >
              {currentMember.name}
            </p>
            <p
              style={{ color: "var(--retro-secondary)" }}
              className="font-bold text-sm uppercase tracking-widest text-center mt-1"
            >
              {currentMember.designation}
            </p>
          </div>

          {/* Image Indicators */}
          <div
            style={{
              backgroundColor: "var(--retro-secondary)",
              borderTop: "4px solid var(--retro-primary)",
            }}
            className="flex justify-center gap-3 p-4"
          >
            {division.images.map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: currentImageIndex === index ? "var(--retro-primary)" : "var(--retro-light)",
                  borderColor: "var(--retro-primary)",
                  width: currentImageIndex === index ? "32px" : "12px",
                }}
                className="h-3 transition-all duration-300 border-2"
              />
            ))}
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex-1 flex flex-col items-center justify-center py-12">
          <div className="space-y-8 max-w-md">
            {/* Division Label */}
            <div className="space-y-4">
              <div
                style={{
                  backgroundColor: "var(--retro-light)",
                  borderColor: "var(--retro-primary)",
                }}
                className="border-4 px-4 py-2 inline-block"
              >
                <p style={{ color: "var(--retro-primary)" }} className="text-xs font-black uppercase tracking-widest">
                  {division.name.toUpperCase()} DIVISION
                </p>
              </div>
              <h2
                style={{
                  color: "var(--retro-primary)",
                  textShadow: "4px 4px 0px rgba(0, 0, 0, 0.2)",
                  fontFamily: "monospace",
                }}
                className="text-6xl md:text-7xl font-black text-balance uppercase tracking-wider"
              >
                {division.name}
              </h2>
            </div>

            {/* Quote */}
            <blockquote
              style={{
                backgroundColor: "var(--retro-primary)",
                color: "var(--retro-light)",
                borderColor: "var(--retro-secondary)",
              }}
              className="text-base md:text-lg font-bold leading-relaxed px-6 py-4 border-4 shadow-lg"
            >
              "{division.quote}"
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
