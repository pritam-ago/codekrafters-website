'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';

// Minimal types for clarity
type GSAPType = any;
type ScrollTriggerType = any;

const ScrollTriggerDirectionalMovement: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    // Dynamic import of GSAP to avoid SSR issues
    const loadGSAP = async () => {
      try {
        const all = await import('gsap/all');
        const { gsap, ScrollTrigger, ModifiersPlugin } = all as unknown as {
          gsap: GSAPType;
          ScrollTrigger: ScrollTriggerType;
          ModifiersPlugin: object;
        };

        gsap.registerPlugin(ScrollTrigger, ModifiersPlugin);

        ScrollTrigger.config({
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
          ignoreMobileResize: true
        });
        
        if (typeof window !== 'undefined' && document.scrollingElement) {
          document.scrollingElement.scrollTo(0, 0);
          
          requestAnimationFrame(() => {
            handleScroll(gsap, ScrollTrigger);
            
            cleanup = () => {
              ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
            };
          });
        }
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    loadGSAP();
    
    // Cleanup on unmount
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  const handleScroll = (gsap: GSAPType, ScrollTrigger: ScrollTriggerType): void => {
    ScrollTrigger.defaults({
      scroller: '.scroller',
    });

    const sections = gsap.utils.toArray('section');
    
    sections.forEach((section: Element, index: number) => {
      const wrapper = section.querySelector('.wrapper');
      if (!wrapper) return;
      
      const sectionElement = section as HTMLElement;
      const wrapperElement = wrapper as HTMLElement;
      
      // Optimize performance with will-change
      gsap.set(wrapper, { willChange: 'transform' });
      
      // Ensure seamless loop by duplicating original content to exceed container width
      const originalHTMLKey = '__originalHTML__';
      const anyWrapper = wrapperElement as unknown as { [key: string]: string };
      if (!anyWrapper[originalHTMLKey]) {
        anyWrapper[originalHTMLKey] = wrapperElement.innerHTML;
      } else {
        wrapperElement.innerHTML = anyWrapper[originalHTMLKey];
      }

      // Measure original segment width (one full, non-repeating set)
      const measureOriginalWidth = (): number => {
        return wrapperElement.scrollWidth;
      };

      let originalWidth = measureOriginalWidth();
      const sectionWidth = sectionElement.offsetWidth;

      // Duplicate content until we have at least ~2.5x the section width
      // This guarantees no gaps during wrap even on large screens
      while (wrapperElement.scrollWidth < sectionWidth * 2.5 && originalWidth > 0) {
        wrapperElement.innerHTML += anyWrapper[originalHTMLKey];
      }

      // Recompute the original segment width in case images/layout adjusted
      // If originalWidth is 0 (images not measured yet), fall back to dividing by 2
      originalWidth = originalWidth || Math.max(1, Math.floor(wrapperElement.scrollWidth / 2));

      // Determine direction per visual row index (considering the text row at index 2)
      const rowIndex = index < 2 ? index : index + 1; // Account for text row in the middle
      const isRightToLeft = rowIndex % 2 === 1; // odd rows move R→L

      // Apply a phase offset for the 2nd image line (section index 1)
      // to avoid seeing the same sequence too soon. This shifts the loop start.
      const applyPhaseOffset = index === 1;
      const phaseOffset = applyPhaseOffset ? originalWidth * 0.8 : 0; // 40% shift

      const xStart = isRightToLeft ? -phaseOffset : -originalWidth + phaseOffset;
      const xEnd = isRightToLeft ? -originalWidth - phaseOffset : 0 + phaseOffset;

      const wrapX = gsap.utils.wrap(-originalWidth, 0);

      gsap.fromTo(
        wrapperElement,
        { x: xStart },
        {
          x: xEnd,
          ease: "none",
          modifiers: {
            x: (x: string) => `${wrapX(parseFloat(x))}px`,
          },
          scrollTrigger: {
            trigger: sectionElement,
            scrub: 3,
            start: "top bottom",
            end: "bottom top",
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        }
      );
    });

    // Add horizontal parallax effect to the Hackverse text (treat as row index 2)
    const hackverseText = document.querySelector('.hackverse-text');
    if (hackverseText && hackverseText.parentElement) {
      gsap.set(hackverseText, { willChange: 'transform' });
      
      // Text moves from left to center and stays there
      gsap.fromTo(
        hackverseText,
        { x: '-100%' }, // Start from left
        {
          x: '0%', // Move to center and stay
          ease: "none",
          scrollTrigger: {
            trigger: hackverseText.parentElement as Element,
            scrub: 4, // Increased from 1.5 to 4 for slower text movement
            start: "top bottom",
            end: "center center", // Stop at center of screen
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        }
      );
    }

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();
  };

  // Image lists by folder
  const qonneqtImages = [
    'qonneqt-001.jpg',
    'qonneqt-002.jpg',
    'qonneqt-003.jpg',
    'qonneqt-004.jpg',
    'qonneqt-005.jpg',
    'qonneqt-006.png',
    'qonneqt-007.jpg',
    'qonneqt-008.jpg',
  ];
  const hackverseImages = [
    'hackverse-001.jpg',
    'hackverse-002.jpg',
    'hackverse-003.jpg',
    'hackverse-004.jpg',
    'hackverse-005.jpg',
    'hackverse-006.jpg',
    'hackverse-007.jpg',
    'hackverse-008.jpg',
    'hackverse-009.jpg',
    'hackverse-010.jpg',
  ];
  const launchpadImages = [
    'launchpad-001.jpg',
    'launchpad-002.jpg',
    'launchpad-003.png',
    'launchpad-004.jpg',
    'launchpad-005.jpg',
    'launchpad-006.jpg',
    'launchpad-007.jpg',
    'launchpad-008.jpg',
    'launchpad-009.jpg',
    'launchpad-010.jpg',
  ];
  const otherEventsImages = [
    'otherevents-001.png',
    'otherevents-002.png',
    'otherevents-003.png',
    'otherevents-004.png',
    'otherevents-005.png',
    'otherevents-006.png',
  ];

  return (
    <>
      <Head>
        <title>4-Line Image Parallax</title>
        <meta name="description" content="A beautiful 4-line image parallax scroll effect" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div 
        ref={scrollerRef}
        className="scroller h-screen overflow-auto text-[12vw] overflow-x-hidden"
        style={{
          scrollBehavior: 'auto', // Ensure smooth scrolling is controlled by GSAP
          WebkitOverflowScrolling: 'touch', // Better iOS scrolling
          backgroundColor: '#F2F0D8',
        }}
      >

        {/* Hackverse text with parallax effect */}
        <div className="h-40 relative overflow-hidden" style={{ backgroundColor: '#F2F0D8' }}>
          <h1 className="hackverse-text text-center text-6xl md:text-8xl font-extrabold mt-10 will-change-transform tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a1a] to-[#6b6b6b] drop-shadow-[0_2px_0_rgba(0,0,0,0.15)]">
            Events
          </h1>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#1a1a1a]/60 to-[#6b6b6b]/60"></div>
        </div>
        
        {/* First image line (swapped with previous third line) */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {launchpadImages.map((imageName: string, imageIndex: number) => (
              <img
                key={`img-1-${imageIndex}`}
                className="h-40 md:h-48 lg:h-56 rounded-xl m-2 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 will-change-transform"
                src={`/launchpad/${imageName}`}
                alt={`Other Event ${imageIndex + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        {/* Second image line */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {hackverseImages.map((imageName: string, imageIndex: number) => (
              <img
                key={`img-2-${imageIndex}`}
                className="h-40 md:h-48 lg:h-56 rounded-xl m-2 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 will-change-transform"
                src={`/hackverse/${imageName}`}
                alt={`Other Event ${imageIndex + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        {/* Third image line (swapped with previous first line) */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {qonneqtImages.map((imageName: string, imageIndex: number) => (
              <img
                key={`img-3-${imageIndex}`}
                className="h-40 md:h-48 lg:h-56 rounded-xl m-2 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 will-change-transform"
                src={`/Qonneqt/${imageName}`}
                alt={`Hackverse Event ${imageIndex + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        {/* Fourth image line */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {otherEventsImages.map((imageName: string, imageIndex: number) => (
              <img
                key={`img-4-${imageIndex}`}
                className="h-40 md:h-48 lg:h-56 rounded-xl m-2 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 will-change-transform"
                src={`/otherevents/${imageName}`}
                alt={`Hackverse Event ${imageIndex + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ScrollTriggerDirectionalMovement;