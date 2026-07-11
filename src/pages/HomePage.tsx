import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { ProblemSolution } from '@/sections/ProblemSolution';
import { APIFlow } from '@/sections/APIFlow';
import { Features } from '@/sections/Features';
import { Integrations } from '@/sections/Integrations';
import { Architecture } from '@/sections/Architecture';
import { Pricing } from '@/sections/Pricing';
import { Demo } from '@/sections/Demo';
import { FAQ } from '@/sections/FAQ';
import { CTABanner } from '@/sections/CTABanner';
import { Footer } from '@/sections/Footer';
import { SeoHead } from '@/components/seo/SeoHead';
import { SITE_URL } from '@/config/site';

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes TEIKOS different from Cal.com or Calendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TEIKOS was built for voice AI agents with an atomic Hold → Confirm state machine and database-level locking, preventing double-bookings even with concurrent callers.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use TEIKOS with Vapi or Retell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TEIKOS has native playbooks for Vapi and Retell plus universal webhook support for n8n, Make, Zapier, and custom HTTP backends.",
      },
    },
    {
      "@type": "Question",
      name: "What is AI voice agent scheduling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI voice agent scheduling is real-time appointment booking infrastructure that voice AI platforms call via tools or webhooks. TEIKOS computes availability live and locks slots atomically before confirmation.",
      },
    },
  ],
};

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="AI Voice Agent Scheduling Infrastructure — Zero Double-Bookings"
        description="TEIKOS is scheduling infrastructure for AI voice agents and AI voice receptionists. Atomic booking, Vapi & Retell integrations, and deterministic appointment APIs."
        path="/"
        keywords={[
          "voice agent scheduling",
          "AI voice receptionist",
          "AI voice scheduling",
          "Vapi scheduling",
          "voice agent appointment booking",
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "TEIKOS",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: SITE_URL,
            description:
              "Infrastructure for reliable voice-agent scheduling with deterministic booking and Vapi, Retell, and n8n integrations.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          HOME_FAQ_SCHEMA,
        ]}
      />
      <Navigation />
      <main>
        <Hero />
        <ProblemSolution />
        <APIFlow />
        <Features />
        <Integrations />
        <Architecture />
        <Pricing />
        <Demo />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
