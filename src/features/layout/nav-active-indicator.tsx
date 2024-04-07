"use client";

import { motion } from "framer-motion";

const NavActiveIndicator = () => {
  return (
    <motion.span
      layoutId="indicator"
      role="presentation"
      className="drop-shadow-neon absolute left-1/2 h-[3px] w-9 translate-y-1/2 rounded-full bg-green-500 max-md:bottom-0 max-md:-translate-x-1/2 md:left-0 md:top-1/2 md:h-9 md:w-[3px] md:-translate-y-1/2"
    ></motion.span>
  );
};

export { NavActiveIndicator };
