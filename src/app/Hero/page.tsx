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

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const outerImageOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const whiteOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <div className="h-[150vh] bg-[#F2F2F2] flex items-center justify-center">
      <div className="relative z-10 max-w-3xl w-full mx-auto p-6 rounded-3xl shadow-lg bg-[#F2A516] flex items-center justify-center">
        {/* outer image */}
        <motion.div
          className="h-[60vh] w-full bg-[url('/CK_group.png')] bg-cover bg-center rounded-2xl"
          style={{
            scale: imageScale,
            opacity: outerImageOpacity,
          }}
        ></motion.div>
        {/* mask image overlay */}
        <motion.div
          className="absolute inset-0 h-full w-full [mask-image:url('/ck_logo.svg')] [mask-repeat:no-repeat] pointer-events-none"
          style={{
            maskSize: useMotionTemplate`${maskSize}px`,
            maskPosition: useMotionTemplate`center ${maskPosition}px`,
            opacity: 0.7,
          }}
        >
          <motion.div
            style={{ scale: imageScale }}
            className="h-full w-full bg-[url('/CK_group.png')] bg-cover bg-center rounded-2xl"
          ></motion.div>
          <motion.div
            style={{ opacity: whiteOpacity }}
            className="absolute inset-0 h-full w-full bg-white rounded-2xl"
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroPage;
