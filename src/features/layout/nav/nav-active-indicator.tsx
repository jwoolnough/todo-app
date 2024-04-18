"use client";

import { motion } from "framer-motion";

const NavActiveIndicator = () => {
  return (
    <motion.span
      layoutId="indicator"
      role="presentation"
      className="drop-shadow-neon absolute left-1.5 h-[3px] w-9 rounded-full bg-green-500 max-md:bottom-0 md:left-0 md:top-1.5 md:h-9 md:w-[3px]"
    ></motion.span>
  );
};

export { NavActiveIndicator };
