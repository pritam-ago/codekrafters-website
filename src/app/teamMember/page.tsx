"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState, useMemo, memo } from "react"

interface TeamMember {
  id: number
  name: string
  role: string
}

interface TeamMemberCardProps {
  member: TeamMember
  delay?: number
  activeImageId?: number | null
  onImageClick?: (id: number) => void
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: "John Smith", role: "CEO & Founder" },
  { id: 2, name: "Sarah Johnson", role: "CTO" },
  { id: 3, name: "Mike Chen", role: "Lead Designer" },
  { id: 4, name: "Emma Davis", role: "Product Manager" },
  { id: 5, name: "Alex Wilson", role: "Developer" },
  { id: 6, name: "Lisa Brown", role: "Marketing Lead" },
  { id: 7, name: "David Lee", role: "Backend Developer" },
  { id: 8, name: "Amy Zhang", role: "UX Designer" },
  { id: 9, name: "Tom Wilson", role: "DevOps Engineer" },
  { id: 10, name: "Kate Miller", role: "Frontend Developer" },
  { id: 11, name: "Ryan Garcia", role: "Data Scientist" },
  { id: 12, name: "Sophie Turner", role: "QA Engineer" },
  { id: 13, name: "James Rodriguez", role: "Sales Manager" },
  { id: 14, name: "Olivia Kim", role: "Content Writer" },
  { id: 15, name: "Chris Evans", role: "System Admin" },
  { id: 16, name: "Maya Patel", role: "Business Analyst" },
  { id: 17, name: "Jake Thompson", role: "Mobile Developer" },
  { id: 18, name: "Rachel Green", role: "HR Manager" },
  { id: 19, name: "Mark Johnson", role: "Security Expert" },
  { id: 20, name: "Anna White", role: "Product Designer" },
  { id: 21, name: "Peter Parker", role: "Full Stack Developer" },
  { id: 22, name: "Grace Liu", role: "AI Specialist" },
  { id: 23, name: "Sam Wilson", role: "Cloud Architect" },
  { id: 24, name: "Zoe Adams", role: "Operations Manager" },
]

// Memoized team member card component
const TeamMemberCard = memo<TeamMemberCardProps>(({ member, delay = 0, activeImageId, onImageClick }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

  // Check if this image is the active one
  const isActive = activeImageId === member.id

  useEffect(() => {
    setIsMounted(true)
    // Set device type on mount and on resize
    const updateDeviceType = () => {
      if (window.innerWidth < 640) setDeviceType("mobile")
      else if (window.innerWidth < 1024) setDeviceType("tablet")
      else setDeviceType("desktop")
    }
    updateDeviceType()
    window.addEventListener("resize", updateDeviceType)
    return () => window.removeEventListener("resize", updateDeviceType)
  }, [])

  const textShadowStyle = useMemo(
    () => ({
      textShadow:
        "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)",
    }),
    [],
  )

  // Toggle overlay and color on mobile/tablet
  const handleCardClick = () => {
    if (deviceType === "mobile" || deviceType === "tablet") {
      if (onImageClick) {
        // If clicking the same image, toggle it off, otherwise set it as active
        onImageClick(isActive ? -1 : member.id)
      }
    }
  }

  // Get container dimensions based on device type
  const getContainerStyle = () => {
    switch (deviceType) {
      case "mobile":
        return { width: "200px", height: "200px" }
      case "tablet":
        return { width: "160.8px", height: "171.78px" }
      case "desktop":
        return { width: "212.8px", height: "253.78px" }
      default:
        return { width: "212.8px", height: "253.78px" }
    }
  }

  if (!isMounted) {
    return (
      <div className="relative group">
        {/* Fixed size container based on device type */}
        <div style={getContainerStyle()}>
          <div className="w-full h-full overflow-hidden shadow-lg bg-white relative rounded-lg">
            <Image
              src={`https://i.pravatar.cc/150?img=${member.id}`}
              alt={member.name}
              fill
              className="object-cover grayscale transition-all duration-300"
              priority={member.id <= 12}
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 160.8px, 273px"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-2 opacity-0 transition-opacity duration-300">
              <p
                className="font-bold text-white text-xs leading-tight"
                style={textShadowStyle}
              >
                {member.name}
              </p>
              <p className="text-white text-xs leading-tight" style={textShadowStyle}>
                {member.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
        <div className="relative group">
          <motion.div
            style={{
              ...getContainerStyle(),
              cursor: (deviceType === "mobile" || deviceType === "tablet") ? "pointer" : "default"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={
              deviceType === "desktop"
                ? { scale: 1.1, transition: { duration: 0.2 } }
                : {}
            }
            onClick={handleCardClick}
          >

        <div className={`w-full h-full overflow-hidden shadow-lg bg-white ring-2 ring-white/20 group-hover:ring-4 group-hover:ring-white/40 transition-all duration-300 relative ${deviceType === "mobile" ? "rounded-lg" : ""}`}>
          <Image
            src={`https://i.pravatar.cc/150?img=${member.id}`}
            alt={member.name}
            fill
            className={
              `object-cover transition-all duration-300 ` +
              (deviceType === "desktop" ? "grayscale group-hover:grayscale-0" : isActive ? "" : "grayscale")
            }
            priority={member.id <= 12}
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 160.8px, 273px"
          />
          <div
            className={
              `absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-1 sm:p-2 transition-opacity duration-300 ` +
              (deviceType === "desktop" ? "opacity-0 group-hover:opacity-100" : isActive ? "opacity-100" : "opacity-0")
            }
          >
            <p
              className={`font-bold text-white leading-tight ${
                deviceType === "desktop" ? "text-xs sm:text-xs md:text-sm" : deviceType === "mobile" ? "text-sm" : "text-xs"
              }`}
              style={textShadowStyle}
            >
              {member.name}
            </p>
            <p 
              className={`text-white leading-tight ${
                deviceType === "desktop" ? "text-xs sm:text-xs md:text-xs" : deviceType === "mobile" ? "text-xs" : "text-xs"
              }`} 
              style={textShadowStyle}
            >
              {member.role}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
})

TeamMemberCard.displayName = "TeamMemberCard"

// Memoized title component
const AnimatedTitle = memo<{ isMounted: boolean; className: string; delay: number }>(
  ({ isMounted, className, delay }) => {
    const content = (
      <div className={className + " flex flex-col items-center justify-center"}>
        <span>
          CODE<span className="text-yellow-500">KRAFTERS</span>
        </span>
        <span className="block">CORE TEAM</span>
      </div>
    )

    if (!isMounted) return <div className="flex flex-col items-center justify-center">{content}</div>

    return (
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
      >
        {content}
      </motion.div>
    )
  },
)

AnimatedTitle.displayName = "AnimatedTitle"

// Memoized mobile title component
const MobileTitle = memo<{ isMounted: boolean; delay: number }>(({ isMounted, delay }) => {
  const content = (
    <div className="flex flex-col items-center justify-center mb-6">
      <span className="text-lg font-bold text-gray-900 drop-shadow-lg text-center leading-tight">
        CODE<span className="text-yellow-500">KRAFTERS</span>
      </span>
      <span className="text-sm font-semibold text-gray-800 text-center">CORE TEAM</span>
    </div>
  )

  if (!isMounted) {
    return <div className="flex flex-col items-center justify-center mb-6">{content}</div>
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center mb-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {content}
    </motion.div>
  )
})

MobileTitle.displayName = "MobileTitle"

const TeamHeaderComplete = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [activeImageId, setActiveImageId] = useState<number | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Memoized team member slices
  const teamSlices = useMemo(
    () => ({
      first5: TEAM_MEMBERS.slice(0, 5),
      second5: TEAM_MEMBERS.slice(5, 10),
      member10: TEAM_MEMBERS[10],
      member11: TEAM_MEMBERS[11],
      third5: TEAM_MEMBERS.slice(12, 17),
      fourth5: TEAM_MEMBERS.slice(17, 22),
      last2: TEAM_MEMBERS.slice(22, 24),
    }),
    [],
  )

  // Mobile team member slices - organizing all 24 members
  // const mobileTeamSlices = useMemo(
  //   () => ({
  //     rows: [
  //       TEAM_MEMBERS.slice(0, 4),   // Row 1: First 4 members
  //       TEAM_MEMBERS.slice(4, 8),   // Row 2: Next 4 members
  //       TEAM_MEMBERS.slice(8, 12),  // Row 3: Next 4 members
  //       TEAM_MEMBERS.slice(12, 16), // Row 4: Next 4 members
  //       TEAM_MEMBERS.slice(16, 20), // Row 5: Next 4 members
  //       TEAM_MEMBERS.slice(20, 24), // Row 6: Last 4 members
  //     ]
  //   }),
  //   [],
  // )

  const handleImageClick = (id: number) => {
    setActiveImageId(id === -1 ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#FFF5D7] flex flex-col items-center justify-start px-4 py-8 overflow-y-auto">
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Desktop Layout (>= 1024px) */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-5 gap-12 place-items-center">
            {/* Row 1: 5 images */}
            {teamSlices.first5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={index * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}

            {/* Row 2: 5 images */}
            {teamSlices.second5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 5) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}

            {/* Row 3: 2 images with title in middle */}
            <TeamMemberCard
              member={teamSlices.member10}
              delay={1.0}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
            <div className="col-span-3 flex justify-center">
              <AnimatedTitle
                isMounted={isMounted}
                className="text-4xl lg:text-5xl font-bold text-gray-900 drop-shadow-lg text-center"
                delay={1.2}
              />
            </div>
            <TeamMemberCard
              member={teamSlices.member11}
              delay={1.0}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />

            {/* Row 4: 5 images */}
            {teamSlices.third5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 13) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}

            {/* Row 5: 5 images */}
            {teamSlices.fourth5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 18) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}

            {/* Row 6: 2 images centered in first 2 columns */}
            {teamSlices.last2.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 23) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            <div className="col-span-3"></div>
          </div>
        </div>

        {/* Tablet Layout (640px - 1024px) */}
        <div className="hidden sm:block lg:hidden">
          <div className="grid grid-cols-5 gap-8 place-items-center max-w-4xl mx-auto">
            {/* Row 1: 5 images */}
            {teamSlices.first5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={index * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}

            {/* Row 2: 5 images */}
            {teamSlices.second5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 5) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}

            {/* Row 3: 2 images with title in middle */}
            <TeamMemberCard
              member={teamSlices.member10}
              delay={1.0}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
            <div className="col-span-3 flex justify-center">
              <AnimatedTitle
                isMounted={isMounted}
                className="text-2xl sm:text-3xl font-bold text-gray-900 drop-shadow-lg text-center"
                delay={1.2}
              />
            </div>
            <TeamMemberCard
              member={teamSlices.member11}
              delay={1.0}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />

            {/* Row 4: 5 images */}
            {teamSlices.third5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 13) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}

            {/* Row 5: 5 images */}
            {teamSlices.fourth5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 18) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}

            {/* Row 6: 2 images in first 2 columns */}
            {teamSlices.last2.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 23) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            <div className="col-span-3"></div>
          </div>
        </div>

        {/* Mobile Layout (< 640px) */}
        <div className="block sm:hidden">
          <div className="flex flex-col items-center max-w-sm mx-auto">
            {/* Mobile Title */}
            <MobileTitle isMounted={isMounted} delay={0.2} />
            
            {/* Mobile Grid - Only first 4 members vertically */}
            <div className="flex flex-col gap-4 items-center">
              {TEAM_MEMBERS.slice(0, 4).map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  delay={index * 0.1}
                  activeImageId={activeImageId}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamHeaderComplete