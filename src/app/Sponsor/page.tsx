"use client"

import type React from "react"
import { useMemo } from "react"

interface CompanyLogo {
  id: number
  name: string
  imageUrl: string
  alt: string
}

const Partners: React.FC = () => {
  const companies = useMemo<CompanyLogo[]>(
    () => [
      {
        id: 1,
        name: "Riot Games",
        imageUrl: "https://imgs.search.brave.com/mwZm4uaE4G0NcDAojWCwEj6y6lY4oTRxiAOPtbtBqFo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU2LzBj/L2ZlLzU2MGNmZTkx/M2MzZGQ0MDc0ZDZm/Y2Q4OGM0ZWQyOGVj/LmpwZw",
        alt: "Riot Games Logo",
      },
      {
        id: 2,
        name: "League of Legends",
        imageUrl: "https://imgs.search.brave.com/Cb_OoFFLebuuktbYdr_o0meCXILc34NjvZFRjak3Aew/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraXRpZGUu/bmV0L2F2aWR3aWtp/L3RodW1iLzMvM2Qv/VG9laV9BbmltYXRp/b25fKDIwMDUpLnBu/Zy80MDNweC1Ub2Vp/X0FuaW1hdGlvbl8o/MjAwNSkucG5n",
        alt: "League of Legends Logo",
      },
      {
        id: 3,
        name: "Epic Games",
        imageUrl: "https://imgs.search.brave.com/ZIRz9vjPV9VaEfR6MS8STQWrsV5Qf3GwYWV_2Ibhw9E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMTYw/MTU2NC5qcGc",
        alt: "Epic Games Logo",
      },
      {
        id: 4,
        name: "Ubisoft",
        imageUrl: "https://imgs.search.brave.com/__sovz3jlJgX7KJQTvuhb0zU_AWEnKqv7km0avOwYb0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzgvMi9tYXpkYS1s/b2dvLXBuZ19zZWVr/bG9nby04OTczMy5w/bmc",
        alt: "Ubisoft Logo",
      },
      {
        id: 5,
        name: "EA Sports",
        imageUrl: "https://imgs.search.brave.com/G4fmcAaAootV6KfWEAS-LTVIEyfMC0tB3CXP9PU45Zs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMi8w/OS8xOC8xOC80MC9h/cHBsZS1sb2dvLTc0/NjM3OTVfNjQwLnBu/Zw",
        alt: "EA Sports Logo",
      },
      {
        id: 6,
        name: "Activision",
        imageUrl: "https://imgs.search.brave.com/IXJfMXqNmscdSTIpfe0-RICYb2f0iyTK969j9_eJVaA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly9yUUM2NXg2TklB/OWlPS3ZyQlhxZVR4/RUpwWFU9LzB4MDo5/NjB4OTYwL2ZpdC1p/bi81MDB4NTAwLzk5/ZGVzaWducy1jb250/ZXN0cy1hdHRhY2ht/ZW50cy8xMDAvMTAw/NjMwL2F0dGFjaG1l/bnRfMTAwNjMwNDQx",
        alt: "Activision Logo",
      },
      {
        id: 7,
        name: "Netflix",
        imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=80&fit=crop&crop=center",
        alt: "Netflix Logo",
      },
      {
        id: 8,
        name: "Blizzard",
        imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=200&h=80&fit=crop&crop=center",
        alt: "Blizzard Logo",
      },
      {
        id: 9,
        name: "Valve",
        imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=80&fit=crop&crop=center",
        alt: "Valve Logo",
      },
      {
        id: 10,
        name: "Unity",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=80&fit=crop&crop=center",
        alt: "Unity Logo",
      },
      {
        id: 11,
        name: "Supercell",
        imageUrl: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=200&h=80&fit=crop&crop=center",
        alt: "Supercell Logo",
      },
      {
        id: 12,
        name: "Rockstar Games",
        imageUrl: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=200&h=80&fit=crop&crop=center",
        alt: "Rockstar Games Logo",
      },
      {
        id: 13,
        name: "CD Projekt",
        imageUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=200&h=80&fit=crop&crop=center",
        alt: "CD Projekt Logo",
      },
      {
        id: 14,
        name: "Bethesda",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=80&fit=crop&crop=center&auto=format&q=80",
        alt: "Bethesda Logo",
      },
      {
        id: 15,
        name: "Nintendo",
        imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=80&fit=crop&crop=center&auto=format&q=80",
        alt: "Nintendo Logo",
      },
      {
        id: 16,
        name: "Sony PlayStation",
        imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=200&h=80&fit=crop&crop=center&auto=format&q=80",
        alt: "Sony PlayStation Logo",
      },
    ],
    [],
  )

  const headerText = useMemo(
    () => "WE PARTNER WITH VISIONARY DEVELOPERS AND PUBLISHERS TO LAUNCH THE NEXT GENERATION OF INNOVATIVE IDEAS",
    [],
  )

  return (
    <div className="min-h-screen bg-black text-white flex content-center items-center">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h1 className="text-xs md:text-sm lg:text-base font-light tracking-[0.2em] leading-relaxed max-w-4xl mx-auto">
            {headerText}
          </h1>
        </div>

        <div className="items-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {companies.map((company) => (
            <div
              key={company.id}
              className="group relative bg-gray-900/30 overflow-hidden hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
                style={{
                  width: '160px', // Or adjust to your need: 140px / 120px
                  aspectRatio: '3/2', // Native CSS property for perfect ratio
                  position: 'relative'
                }}

              
            >
              <div className="absolute inset-0 flex items-center justify-center p-0">
                <img
                  src={company.imageUrl}
                  alt={company.alt}
                  className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gray-800 rounded">
                          <span class="text-xs text-gray-400 text-center px-2">${company.name}</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xs md:text-sm font-medium text-white text-center px-2">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Partners
