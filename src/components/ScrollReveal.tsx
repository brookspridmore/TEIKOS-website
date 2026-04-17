import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, fadeIn, scaleIn } from '@/lib/animation';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  className?: string;
  once?: boolean;
}

const variantsMap: Record<string, Variants> = {
  up: fadeInUp,
  left: fadeInLeft,
  right: fadeInRight,
  fade: fadeIn,
  scale: scaleIn,
};

export function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = '',
  once = true,
}: ScrollRevealProps) {
  const variants = variantsMap[direction];
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            ...(variants.visible as { transition?: object }).transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children reveal
interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerReveal({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  once = true,
}: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
}
