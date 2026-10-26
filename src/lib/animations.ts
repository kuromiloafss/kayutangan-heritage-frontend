import type { Variants } from "framer-motion";

/** Animasi masuk halaman: fade-in sambil naik sedikit. */
export const pageEnterVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};
