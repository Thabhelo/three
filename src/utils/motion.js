export const textVariant = (delay) => {
    return {
      hidden: {
        y: -12,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "tween",
          duration: 0.4,
          delay: delay,
          ease: [0.2, 0.8, 0.2, 1],
        },
      },
    };
  };
  
  export const fadeIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? 12 : direction === "right" ? -12 : 0,
        y: direction === "up" ? 12 : direction === "down" ? -12 : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: type || "tween",
          delay: delay,
          duration: duration || 0.45,
          ease: [0.2, 0.8, 0.2, 1],
        },
      },
    };
  };
  
  export const zoomIn = (delay, duration) => {
    return {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "tween",
          delay: delay,
          duration: duration || 0.35,
          ease: [0.2, 0.8, 0.2, 1],
        },
      },
    };
  };
  
  export const slideIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
      },
      show: {
        x: 0,
        y: 0,
        transition: {
          type: type || "tween",
          delay: delay,
          duration: duration || 0.45,
          ease: [0.2, 0.8, 0.2, 1],
        },
      },
    };
  };
  
  export const staggerContainer = (staggerChildren, delayChildren) => {
    return {
      hidden: {},
      show: {
        transition: {
          staggerChildren: staggerChildren ?? 0.06,
          delayChildren: delayChildren || 0,
        },
      },
    };
  };