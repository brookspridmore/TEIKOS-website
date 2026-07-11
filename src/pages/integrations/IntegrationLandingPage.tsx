import { Link, useParams, Navigate } from "react-router-dom";
import { Navigation } from "@/sections/Navigation";
import { Footer } from "@/sections/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { APP_SIGNUP_URL } from "@/config/appUrls";
import { PARTNER_LINKS, SITE_URL } from "@/config/site";
import { docPath } from "@/docs/docsNav";

const INTEGRATIONS: Record<
  string,
  {
    name: string;
    partnerKey: keyof typeof PARTNER_LINKS;
    docSlug: string;
    headline: string;
    description: string;
    keywords: string[];
    bullets: string[];
  }
> = {
  vapi: {
    name: "Vapi",
    partnerKey: "vapi",
    docSlug: "integrations/vapi",
    headline: "Vapi + TEIKOS — AI Voice Agent Scheduling That Never Double-Books",
    description:
      "Connect your Vapi voice agent to TEIKOS for atomic appointment holds, real-time availability checks, and deterministic booking. Built for AI voice receptionists and phone agents at scale.",
    keywords: ["Vapi scheduling", "Vapi voice agent booking", "AI voice receptionist Vapi", "Vapi TEIKOS"],
    bullets: [
      "Native Vapi playbook with copy-ready tool definitions",
      "Hold → confirm state machine prevents race conditions",
      "Bearer auth tool-router endpoint per integration",
      "Works with any Vapi assistant or squad configuration",
    ],
  },
  retell: {
    name: "Retell AI",
    partnerKey: "retell",
    docSlug: "integrations/retell",
    headline: "Retell AI + TEIKOS — Reliable Scheduling for Voice Phone Agents",
    description:
      "Integrate Retell AI conversational voice agents with TEIKOS scheduling infrastructure. HMAC-signed webhooks, structured JSON responses, and zero hallucinated appointments.",
    keywords: ["Retell AI scheduling", "Retell appointment booking", "AI voice receptionist Retell"],
    bullets: [
      "Retell webhook playbook with step-by-step setup",
      "Deterministic tool responses for booking flows",
      "Agency-ready multi-client provisioning",
      "Connection speed testing from the TEIKOS dashboard",
    ],
  },
  n8n: {
    name: "n8n",
    partnerKey: "n8n",
    docSlug: "integrations/n8n",
    headline: "n8n + TEIKOS — Automate AI Voice Receptionist Scheduling",
    description:
      "Use n8n workflows to call TEIKOS scheduling tools via HTTP. Ideal for custom AI voice stacks, Make/Zapier alternatives, and automation-first agencies.",
    keywords: ["n8n voice agent", "n8n AI scheduling", "automate voice receptionist booking"],
    bullets: [
      "HTTP POST tool-router integration pattern",
      "Compose with any LLM or telephony workflow",
      "Idempotent writes safe for workflow retries",
      "Full tools reference for availability and booking",
    ],
  },
  webhook: {
    name: "Webhook / HTTP",
    partnerKey: "zapier",
    docSlug: "integrations/webhook-http",
    headline: "Universal Webhook Scheduling for Any Voice Agent Platform",
    description:
      "Connect Bland, custom backends, Make, Zapier, or any HTTP-capable system to TEIKOS. One scheduling API for every AI voice receptionist stack.",
    keywords: ["voice agent webhook API", "HTTP scheduling integration", "custom AI receptionist backend"],
    bullets: [
      "Bearer-authenticated universal webhook provider",
      "Same tools as Vapi and Retell integrations",
      "Platform-agnostic — no vendor lock-in on scheduling",
      "Documented JSON envelope for every response",
    ],
  },
};

export function IntegrationLandingPage() {
  const { slug } = useParams();
  const integration = slug ? INTEGRATIONS[slug] : undefined;

  if (!integration) {
    return <Navigate to="/docs/getting-started" replace />;
  }

  const partner = PARTNER_LINKS[integration.partnerKey];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `TEIKOS + ${integration.name}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: integration.description,
    url: `${SITE_URL}/integrations/${slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free tier available" },
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <SeoHead
        title={integration.headline}
        description={integration.description}
        path={`/integrations/${slug}`}
        keywords={integration.keywords}
        jsonLd={jsonLd}
      />
      <main className="pt-[72px]">
        <section className="halftone-bg section-padding">
          <div className="container-max mx-auto">
            <p className="text-sm font-body text-dark/60 mb-4">
              <Link to="/">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/docs">Docs</Link>
              <span className="mx-2">/</span>
              <span>{integration.name} integration</span>
            </p>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-dark max-w-4xl leading-tight mb-4">
              {integration.headline}
            </h1>
            <p className="font-body text-lg text-dark/75 max-w-2xl leading-relaxed mb-8">{integration.description}</p>
            <div className="flex flex-wrap gap-4">
              <a href={APP_SIGNUP_URL} className="btn-primary">
                Get Started Free
              </a>
              <Link to={docPath(integration.docSlug)} className="btn-secondary">
                Read full {integration.name} playbook
              </Link>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Visit {partner.name} ↗
              </a>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-max mx-auto max-w-3xl">
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">Why TEIKOS + {integration.name}?</h2>
            <ul className="space-y-3">
              {integration.bullets.map((b) => (
                <li key={b} className="flex gap-3 font-body text-dark/75">
                  <span className="text-teikos-coral-deep font-bold">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="font-body text-dark/70 mt-8 leading-relaxed">
              {partner.name} handles the voice layer — LLM, telephony, and low-latency audio. TEIKOS is the{" "}
              <strong>scheduling source of truth</strong> your agent calls for availability, holds, and confirmations.
              Together they form a production-ready AI voice receptionist stack without Calendly duct tape or Zapier race
              conditions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={docPath("getting-started")} className="text-teikos-blue-deep font-semibold hover:underline">
                Getting started guide →
              </Link>
              <Link to={docPath("tools-reference")} className="text-teikos-blue-deep font-semibold hover:underline">
                Tools API reference →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
