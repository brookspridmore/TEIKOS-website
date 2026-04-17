import { motion } from 'framer-motion';
import { Shield, History, GitBranch, RotateCcw, Server, Database, LayoutDashboard, Phone } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';

const trustBadges = [
  {
    icon: Shield,
    title: 'Database-Enforced RLS',
    description: 'Permissions cannot be bypassed even if the UI is circumvented',
  },
  {
    icon: History,
    title: 'Immutable Audit Log',
    description: 'Every state transition is permanently recorded',
  },
  {
    icon: GitBranch,
    title: 'Versioned RPCs',
    description: 'API stability contract with _v1 suffix throughout',
  },
  {
    icon: RotateCcw,
    title: 'Idempotent Writes',
    description: 'Enterprise-grade reliability pattern — safe to retry',
  },
];

const architectureLayers = [
  {
    icon: Phone,
    title: 'Voice Agent Platform',
    subtitle: 'Vapi / Retell / n8n / HTTP',
    color: 'teikos-yellow',
  },
  {
    icon: Server,
    title: 'TEIKOS Tool Router',
    subtitle: 'Supabase Edge Function',
    color: 'teikos-blue',
  },
  {
    icon: Database,
    title: 'PostgreSQL + RLS Engine',
    subtitle: 'Atomic operations with row-level security',
    color: 'teikos-coral',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard Layer',
    subtitle: 'Business + Agency dashboards',
    color: 'teikos-yellow',
  },
];

export function Architecture() {
  return (
    <section className="section-padding bg-dark text-white">
      <div className="container-max mx-auto">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block bg-white/10 border-[2px] border-white/30 rounded-full px-4 py-2 text-sm font-body font-semibold text-white/80 mb-4">
            Architecture
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white max-w-3xl mx-auto mb-4">
            Infrastructure-Grade{' '}
            <span className="text-teikos-blue">Architecture</span>
          </h2>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            The same patterns used by Stripe, Twilio, and other enterprise infrastructure companies.
          </p>
        </ScrollReveal>

        {/* Architecture Diagram */}
        <ScrollReveal className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 -translate-x-1/2" />
              
              {/* Layers */}
              <div className="space-y-6">
                {architectureLayers.map((layer, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.15,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <div 
                      className={`bg-${layer.color} border-[3px] border-white rounded-xl p-6 flex items-center gap-4 max-w-lg ${
                        index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white/20 border-[2px] border-white rounded-lg flex items-center justify-center">
                        <layer.icon className="w-6 h-6 text-dark" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-dark">
                          {layer.title}
                        </h3>
                        <p className="font-body text-sm text-dark/70">
                          {layer.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Connector Dot */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[2px] border-dark rounded-full z-10" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Trust Badges */}
        <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-white/5 border-[2px] border-white/20 rounded-xl p-6 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 bg-teikos-blue/20 border-[2px] border-teikos-blue rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <badge.icon className="w-6 h-6 text-teikos-blue" />
                </motion.div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  {badge.title}
                </h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  {badge.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* Technical Transparency Note */}
        <ScrollReveal className="mt-12 text-center" delay={0.4}>
          <p className="font-body text-sm text-white/50 max-w-2xl mx-auto">
            Technical transparency is our trust signal. Every architectural decision 
            is documented and defensible. No black boxes.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
