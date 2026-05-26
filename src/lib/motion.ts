export const smoothEase = [0.4, 0, 0.2, 1] as const;
export const refEase = [0.22, 1, 0.36, 1] as const;

export const springSmooth = {
  type: "spring",
  stiffness: 180,
  damping: 24,
  mass: 0.7,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

export const fadeDown = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
} as const;

export const blurIn = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
} as const;

export const dropdownMotion = {
  initial: { opacity: 0, y: -8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
  transition: { duration: 0.4, ease: smoothEase },
} as const;

export const dropdownItemMotion = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: smoothEase },
} as const;

export const imageReveal = {
  initial: { opacity: 0, y: 16, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.4, ease: smoothEase },
} as const;

export const cardHover = {
  y: -4,
  transition: springSmooth,
} as const;

export const badgeFollowMotion = {
  initial: { opacity: 0, scale: 0.75 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.75 },
  transition: { duration: 0.15, ease: smoothEase },
} as const;

export const heroItemTransition = {
  duration: 0.4,
  ease: smoothEase,
} as const;
