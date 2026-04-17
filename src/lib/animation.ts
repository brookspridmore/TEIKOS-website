// Animation timing constants and variants for Framer Motion

export const ANIMATION = {
  duration: {
    micro: 0.15,
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
    dramatic: 1.0,
  },
  easing: {
    outExpo: [0.16, 1, 0.3, 1] as const,
    outBack: [0.34, 1.56, 0.64, 1] as const,
    inOut: [0.4, 0, 0.2, 1] as const,
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
};

// Framer Motion Variants

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.easing.outExpo,
    }
  },
};

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -40 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.easing.outExpo,
    }
  },
};

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 40 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.easing.outExpo,
    }
  },
};

export const fadeIn = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: ANIMATION.duration.normal,
      ease: ANIMATION.easing.inOut,
    }
  },
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.easing.outBack,
    }
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION.stagger.normal,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION.stagger.fast,
      delayChildren: 0.05,
    },
  },
};

export const cardHover = {
  rest: {
    y: 0,
    boxShadow: '6px 6px 0 #1A1A1A',
  },
  hover: {
    y: -3,
    boxShadow: '9px 9px 0 #1A1A1A',
    transition: {
      duration: ANIMATION.duration.fast,
      ease: ANIMATION.easing.outBack,
    },
  },
};

export const buttonHover = {
  rest: {
    x: 0,
    y: 0,
    boxShadow: '4px 4px 0 #1A1A1A',
  },
  hover: {
    x: -2,
    y: -2,
    boxShadow: '6px 6px 0 #1A1A1A',
    transition: {
      duration: ANIMATION.duration.fast,
      ease: 'easeOut',
    },
  },
  tap: {
    x: 2,
    y: 2,
    boxShadow: '2px 2px 0 #1A1A1A',
    transition: {
      duration: ANIMATION.duration.micro,
    },
  },
};

export const drawLine = {
  hidden: { 
    scaleX: 0,
    originX: 0,
  },
  visible: { 
    scaleX: 1,
    transition: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.easing.outExpo,
    }
  },
};

export const numberBadge = {
  hidden: { 
    scale: 0,
    opacity: 0,
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: {
      duration: ANIMATION.duration.normal,
      ease: ANIMATION.easing.outBack,
    }
  },
};
