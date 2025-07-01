"use client";
import React from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionTemplate,
  useSpring,
} from "motion/react";

const springVars = {
  stiffness: 100,
  damping: 20,
};

const HeroPage = () => {
  const { scrollYProgress } = useScroll();
  const maskSize = useSpring(
    useTransform(scrollYProgress, [0, 1], ["14000", "400"]),
    springVars
  );
  const maskPosition = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-1800", "100"]),
    springVars
  );

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.6, 1]);
  const outerImageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="h-[150vh] bg-black">
      {/* outer image */}
      <motion.div
        className="fixed inset-0 h-screen w-screen bg-[url('/ck_group.jpeg')] bg-fixed bg-cover"
        style={{
          scale: imageScale,
          opacity: outerImageOpacity,
        }}
      ></motion.div>

      {/* mask image */}
      <motion.div
        className="fixed flex m-auto h-full w-full inset-0 [mask-image:url('/ck_logo.svg')] [mask-repeat:no-repeat]"
        style={{
          maskSize: useMotionTemplate`${maskSize}px`,
          maskPosition: useMotionTemplate`center ${maskPosition}px`,
        }}
      >
        {/* inner image */}
        <motion.div
          style={{
            scale: imageScale,
          }}
          className="fixed inset-0 h-full w-full bg-[url('/ck_group.jpeg')] bg-fixed bg-cover"
        ></motion.div> 
      </motion.div>
    </div>
  );
};

export default HeroPage;
