'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';

// Type definitions
interface GSAPType {
  registerPlugin: (plugin: any) => void;
  utils: {
    toArray: (selector: string) => Element[];
  };
  fromTo: (
    target: Element,
    fromVars: { x: string | number; y?: string | number },
    toVars: {
      x: string | number;
      y?: string | number;
      ease: string;
      scrollTrigger: {
        trigger: Element;
        scrub: number | boolean;
        start: string;
        end: string;
        invalidateOnRefresh: boolean;
        anticipatePin: number;
      };
    }
  ) => void;
  set: (target: Element, vars: { willChange: string }) => void;
}

interface ScrollTriggerType {
  defaults: (config: { scroller: string }) => void;
  getAll: () => Array<{ kill: () => void }>;
  refresh: () => void;
  config: (config: { 
    autoRefreshEvents: string;
    ignoreMobileResize: boolean;
  }) => void;
}

const ScrollTriggerDirectionalMovement: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    // Dynamic import of GSAP to avoid SSR issues
    const loadGSAP = async () => {
      try {
        const { gsap }: { gsap: GSAPType } = await import('gsap');
        const { ScrollTrigger }: { ScrollTrigger: ScrollTriggerType } = await import('gsap/dist/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Configure ScrollTrigger for better performance
        ScrollTrigger.config({
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
          ignoreMobileResize: true
        });
        
        // Reset scroll position
        if (typeof window !== 'undefined' && document.scrollingElement) {
          document.scrollingElement.scrollTo(0, 0);
          
          // Wait for next frame to ensure DOM is ready
          requestAnimationFrame(() => {
            handleScroll(gsap, ScrollTrigger);
            
            // Set up cleanup function
            cleanup = () => {
              ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
      
      // Calculate movement distance more precisely
      const wrapperWidth = wrapperElement.scrollWidth;
      const sectionWidth = sectionElement.offsetWidth;
      const moveDistance = wrapperWidth - sectionWidth;
      
      // Alternating pattern considering text as row 2:
      // Row 0 (section 0): L→R, Row 1 (section 1): R→L, Row 2 (text): L→R, Row 3 (section 2): R→L, Row 4 (section 3): L→R
      // So sections after text need to be offset: section 2 becomes row 3, section 3 becomes row 4
      const rowIndex = index < 2 ? index : index + 1; // Account for text row
      const [xStart, xEnd]: [string | number, string | number] =
        rowIndex % 2
          ? ['100%', -moveDistance]     // Odd row: Right to Left
          : [-moveDistance, 0];         // Even row: Left to Right
      
      gsap.fromTo(
        wrapper,
        { x: xStart },
        {
          x: xEnd,
          ease: "none", // Linear easing for smooth scrubbing
          scrollTrigger: {
            trigger: section,
            scrub: 3, // Increased from 1.2 to 3 for slower movement
            start: "top bottom",
            end: "bottom top", 
            invalidateOnRefresh: true, // Recalculate on resize
            anticipatePin: 1, // Better performance for pinned elements
          },
        }
      );
    });

    // Add horizontal parallax effect to the Hackverse text (treat as row index 2)
    const hackverseText = document.querySelector('.hackverse-text');
    if (hackverseText && hackverseText.parentElement) {
      gsap.set(hackverseText, { willChange: 'transform' });
      
      // Text is row index 2, so it should go Left to Right (even index)
      gsap.fromTo(
        hackverseText,
        { x: '-100%' }, // Start from left
        {
          x: '100%', // Move to right
          ease: "none",
          scrollTrigger: {
            trigger: hackverseText.parentElement as Element,
            scrub: 4, // Increased from 1.5 to 4 for slower text movement
            start: "top bottom",
            end: "bottom top",
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        }
      );
    }

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();
  };

  const imageNames = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg'];

  return (
    <>
      <Head>
        <title>4-Line Image Parallax</title>
        <meta name="description" content="A beautiful 4-line image parallax scroll effect" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div 
        ref={scrollerRef}
        className="scroller h-screen overflow-auto text-[12vw] overflow-x-hidden bg-orange-50"
        style={{
          scrollBehavior: 'auto', // Ensure smooth scrolling is controlled by GSAP
          WebkitOverflowScrolling: 'touch', // Better iOS scrolling
        }}
      >
        {/* Top spacing section */}
        <div className="h-40 bg-orange-50"></div>
        
        {/* First image line */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {imageNames.map((imageName: string, imageIndex: number) => (
              <img
                key={`img-1-${imageIndex}`}
                className="h-80 rounded-xl m-2 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 will-change-transform"
                src={`/${imageName}`}
                alt={`Image ${imageIndex + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        {/* Second image line */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {imageNames.map((imageName: string, imageIndex: number) => (
              <img
                key={`img-2-${imageIndex}`}
                className="h-80 rounded-xl m-2 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 will-change-transform"
                src={`/${imageName}`}
                alt={`Image ${imageIndex + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        {/* Hackverse text with parallax effect */}
        <div className="h-40 bg-orange-50 relative overflow-hidden">
          <h1 className="hackverse-text text-center text-6xl font-bold mt-10 will-change-transform">
            Hackverse 2025
          </h1>
        </div>
        
        {/* Third image line */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {imageNames.map((imageName: string, imageIndex: number) => (
              <img
                key={`img-3-${imageIndex}`}
                className="h-80 rounded-xl m-2 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 will-change-transform"
                src={`/${imageName}`}
                alt={`Image ${imageIndex + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        {/* Fourth image line */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {imageNames.map((imageName: string, imageIndex: number) => (
              <img
                key={`img-4-${imageIndex}`}
                className="h-80 rounded-xl m-2 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 will-change-transform"
                src={`/${imageName}`}
                alt={`Image ${imageIndex + 1}`}
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