import { type Variants } from "framer-motion";

export const machinedSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export const neonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: machinedSpring,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 4,
    transition: { duration: 0.15 },
  },
};

export const pulseVariants: Variants = {
  initial: { opacity: 0.8 },
  animate: {
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
