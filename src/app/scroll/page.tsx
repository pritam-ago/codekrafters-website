'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';

interface GSAPType {
  registerPlugin: (plugin: any) => void;
  utils: {
    toArray: (selector: string) => Element[];
  };
  fromTo: (
    target: Element,
    fromVars: { x: string | number },
    toVars: {
      x: string | number;
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

const ScrollEffect: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const loadGSAP = async () => {
      try {
        const { gsap }: { gsap: GSAPType } = await import('gsap');
        const { ScrollTrigger }: { ScrollTrigger: ScrollTriggerType } = await import('gsap/dist/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);
        
        ScrollTrigger.config({
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
          ignoreMobileResize: true
        });
        
        if (typeof window !== 'undefined' && scrollerRef.current) {
          scrollerRef.current.scrollTo(0, 0);
          
          requestAnimationFrame(() => {
            handleScroll(gsap, ScrollTrigger);
            
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
      
      gsap.set(wrapper, { willChange: 'transform' });
      
      const wrapperWidth = wrapperElement.scrollWidth;
      const sectionWidth = sectionElement.offsetWidth;
      const moveDistance = wrapperWidth - sectionWidth;
      
      const [xStart, xEnd]: [string | number, string | number] =
        index % 2 === 0
          ? [-moveDistance, 0]
          : [0, -moveDistance];
      
      gsap.fromTo(
        wrapper,
        { x: xStart },
        {
          x: xEnd,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: 1.5,
            start: "top bottom",
            end: "bottom top", 
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        }
      );
    });

    ScrollTrigger.refresh();
  };

  const imageUrls = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1497449493050-aad1e7cad165?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1515237580815-1d84353d6338?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop'
  ];

  return (
    <>
      <Head>
        <title>Parallax </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div 
        ref={scrollerRef}
        className="scroller h-screen overflow-auto overflow-x-hidden bg-gradient-to-br from-slate-50 to-slate-100"
        style={{
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">Scroll down to see the magic</h1>
          </div>
        </div>
        
        <section className="py-8">
          <div className="wrapper flex will-change-transform">
            {[...imageUrls, ...imageUrls].map((url, index) => (
              <img
                key={`row-1-${index}`}
                className="h-80 w-96 object-cover rounded-xl m-4 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 shadow-lg"
                src={url}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="wrapper flex will-change-transform">
            {[...imageUrls.reverse(), ...imageUrls].map((url, index) => (
              <img
                key={`row-2-${index}`}
                className="h-80 w-96 object-cover rounded-xl m-4 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 shadow-lg"
                src={url}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="wrapper flex will-change-transform">
            {[...imageUrls.reverse(), ...imageUrls].map((url, index) => (
              <img
                key={`row-3-${index}`}
                className="h-80 w-96 object-cover rounded-xl m-4 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 shadow-lg"
                src={url}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="wrapper flex will-change-transform">
            {[...imageUrls, ...imageUrls].map((url, index) => (
              <img
                key={`row-4-${index}`}
                className="h-80 w-96 object-cover rounded-xl m-4 transition-all duration-300 hover:scale-95 cursor-pointer flex-shrink-0 shadow-lg"
                src={url}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>
        
        <div className="h-screen bg-gradient-to-t from-slate-100 to-slate-50 flex items-center justify-center">
          
        </div>
      </div>
    </>
  );
};

export default ScrollEffect;