export const fadeIn = {
  offscreen: { opacity: 0 },
  onscreen: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeUp = {
  offscreen: { y: 40, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 },
  },
};

export const fadeLeft = {
  offscreen: { x: 40, opacity: 0 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const slideInUp = {
  offscreen: { y: 100 },
  onscreen: {
    y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.8 },
  },
};

export const zoomIn = {
  offscreen: { scale: 0.9, opacity: 0 },
  onscreen: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const popIn = {
  offscreen: { scale: 0.95, opacity: 0 },
  onscreen: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", bounce: 0.5, duration: 0.6 },
  },
};

export const staggerContainer = {
  onscreen: {
    transition: { staggerChildren: 0.15 },
  },
};

export const staggerItem = {
  offscreen: { opacity: 0, y: 20 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};
