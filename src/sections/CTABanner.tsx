import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { APP_SIGNUP_URL } from '@/config/appUrls';

export function CTABanner() {
  return (
    <section className="relative py-20 bg-teikos-blue border-y-[3px] border-dark overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #4FC3F7 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, #4FC3F7 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, #4FC3F7 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">
            Ready to Stop the Hallucinations?
          </h2>
          <p className="font-body text-lg text-dark/80 max-w-2xl mx-auto mb-8">
            Join businesses using TEIKOS for reliable voice agent scheduling. 
            Start free, upgrade when you&apos;re ready.
          </p>
          <div className="flex justify-center">
            <motion.a
              href={APP_SIGNUP_URL}
              className="btn-primary inline-flex items-center justify-center gap-2 bg-white"
              whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0 #1A1A1A' }}
              whileTap={{ x: 2, y: 2, boxShadow: '2px 2px 0 #1A1A1A' }}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
