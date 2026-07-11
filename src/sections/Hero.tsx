import { useEffect } from 'react';
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { ArrowDown, Zap, Shield, Sparkles, Database, Globe, Workflow } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animation';
import { APP_SIGNUP_URL } from '@/config/appUrls';

const trustBadges = [
  { icon: Sparkles, text: 'Reduce agent hallucinations to ZERO' },
  { icon: Shield, text: 'Zero double-bookings' },
  { icon: Zap, text: '100% idempotent' },
  { icon: Workflow, text: 'State Machine = Guaranteed Atomic Booking' },
  { icon: Database, text: 'Strict Row Level Security [RLS] on every table' },
  { icon: Globe, text: 'Platform Agnostic Integrations' },
];

/** Subtle “toward / away from camera” rotation — fixed position, no vertical drift */
const WORDMARK_TILT = 10;

/**
 * Shadow style toggle — flip to roll back:
 * - 'ground'  → transform-based ellipse under the wordmark (current)
 * - 'filter'  → drop-shadow on the logo (previous approach)
 */
const WORDMARK_SHADOW_MODE = 'filter' as 'ground' | 'filter';

const wordmarkMotionTransition = {
  duration: 5.5,
  repeat: Infinity,
  ease: 'easeInOut' as const,
};

type AnimatedWordmarkProps = {
  className: string;
  alt: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Match image alignment — desktop wordmark uses object-right */
  shadowAlign?: 'center' | 'right';
};

/** Single tilt value drives rotateY and shadow so both stay frame-locked */
function AnimatedWordmark({
  className,
  alt,
  fetchPriority,
  shadowAlign = 'center',
}: AnimatedWordmarkProps) {
  const prefersReducedMotion = useReducedMotion();
  const tilt = useMotionValue(-WORDMARK_TILT);

  const shadowX = useTransform(tilt, [-WORDMARK_TILT, WORDMARK_TILT], [12, -12]);
  const shadowSoftX = useTransform(tilt, [-WORDMARK_TILT, WORDMARK_TILT], [4, -4]);
  const filter = useMotionTemplate`drop-shadow(${shadowX}px 14px 6px rgba(26, 26, 26, 0.35)) drop-shadow(${shadowSoftX}px 8px 14px rgba(26, 26, 26, 0.22))`;

  const groundShadowX = useTransform(tilt, [-WORDMARK_TILT, WORDMARK_TILT], [8, -8]);
  const groundShadowScaleX = useTransform(tilt, [-WORDMARK_TILT, WORDMARK_TILT], [0.96, 1.04]);
  const groundShadowOpacity = useTransform(tilt, [-WORDMARK_TILT, 0, WORDMARK_TILT], [0.42, 0.34, 0.42]);

  const groundShadowClassName =
    shadowAlign === 'right'
      ? 'pointer-events-none absolute bottom-[2%] right-0 z-0 h-[28%] w-[92%] origin-right rounded-[50%] bg-dark blur-[12px]'
      : 'pointer-events-none absolute bottom-[2%] left-1/2 z-0 h-[28%] w-[88%] -translate-x-1/2 rounded-[50%] bg-dark blur-[12px]';

  useEffect(() => {
    if (prefersReducedMotion) {
      tilt.set(0);
      return;
    }

    const controls = animate(
      tilt,
      [-WORDMARK_TILT, WORDMARK_TILT, -WORDMARK_TILT],
      wordmarkMotionTransition,
    );

    return () => controls.stop();
  }, [tilt, prefersReducedMotion]);

  const showShadow = !prefersReducedMotion;
  const useGroundShadow = WORDMARK_SHADOW_MODE === 'ground';
  const useFilterShadow = WORDMARK_SHADOW_MODE === 'filter';

  return (
    <div className="relative w-full [perspective:960px]">
      {showShadow && useGroundShadow && (
        <motion.div
          aria-hidden
          className={groundShadowClassName}
          style={{
            x: groundShadowX,
            scaleX: groundShadowScaleX,
            opacity: groundShadowOpacity,
            willChange: 'transform, opacity',
          }}
        />
      )}
      <motion.img
        src="/images/logo-teikos-word.png"
        alt={alt}
        width={1019}
        height={296}
        className={`relative z-10 ${className}`}
        decoding="async"
        fetchPriority={fetchPriority}
        style={{
          rotateY: tilt,
          filter: showShadow && useFilterShadow ? filter : undefined,
          transformStyle: 'preserve-3d',
          willChange: useFilterShadow ? 'transform, filter' : 'transform',
        }}
      />
    </div>
  );
}

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen halftone-bg flex items-center pt-[72px] overflow-hidden">
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            className="flex flex-col gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-white border-[2px] border-dark rounded-full px-4 py-2 text-sm font-body font-medium">
                <span className="w-2 h-2 bg-teikos-coral rounded-full animate-pulse" />
                Now in Early Access
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-dark leading-[1.1] tracking-tight"
            >
              Stop Your Voice Agent from{' '}
              <span className="text-teikos-coral">Lying</span> About Appointments
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="font-body text-lg sm:text-xl text-dark/80 max-w-xl leading-relaxed"
            >
              Two callers. Same slot. One confirmed booking — guaranteed. 
              TEIKOS enforces deterministic, database-locked scheduling so your 
              voice agent never hallucinates another appointment.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <motion.a
                href={APP_SIGNUP_URL}
                className="btn-primary inline-block text-center"
                whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0 #1A1A1A' }}
                whileTap={{ x: 2, y: 2, boxShadow: '2px 2px 0 #1A1A1A' }}
              >
                Get Started Free
              </motion.a>
              <motion.button
                className="btn-secondary"
                onClick={() => scrollToSection('#how-it-works')}
                whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0 #1A1A1A' }}
                whileTap={{ x: 2, y: 2, boxShadow: '2px 2px 0 #1A1A1A' }}
              >
                See How It Works
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 mt-4"
            >
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-[2px] border-dark rounded-lg px-3 py-2"
                >
                  <badge.icon className="w-4 h-4 text-teikos-coral-deep" />
                  <span className="font-body text-sm font-medium text-dark">
                    {badge.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — wordmark */}
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative hidden lg:flex w-full max-w-lg justify-end">
              <AnimatedWordmark
                alt="TEIKOS"
                shadowAlign="right"
                className="w-full max-w-lg origin-center h-auto object-contain object-right"
              />
            </div>
            <div className="relative lg:hidden w-full max-w-xs sm:max-w-sm mx-auto">
              <AnimatedWordmark
                alt="TEIKOS wordmark"
                className="w-full origin-center h-auto object-contain"
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="font-body text-sm text-dark/60">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-dark/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
