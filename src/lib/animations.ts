import type { Variants, Transition } from 'framer-motion';

// Check if user prefers reduced motion
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function safe(variants: Variants): Variants {
  if (prefersReducedMotion) {
    return { initial: {}, animate: {}, exit: {} };
  }
  return variants;
}

// Page transition
export const pageTransition: Variants = safe({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
});

export const pageTransitionProps: Transition = { duration: 0.35, ease: 'easeOut' };

// Stagger container
export const staggerContainer: Variants = safe({
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
});

// Stagger item
export const staggerItem: Variants = safe({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
});

// Fade in up
export const fadeInUp: Variants = safe({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
});

// Card hover
export const cardHover = prefersReducedMotion
  ? {}
  : {
      whileHover: { scale: 1.02, boxShadow: '0 10px 25px -5px rgba(61, 48, 40, 0.12)' },
      whileTap: { scale: 0.98 },
      transition: { type: 'spring', stiffness: 300, damping: 20 } as Transition,
    };

// FAB spring entrance
export const fabEntrance: Variants = safe({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.3 } },
});

// Empty state icon bounce
export const emptyBounce: Variants = safe({
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 12 },
  },
});
