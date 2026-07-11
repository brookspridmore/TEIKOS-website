export type DocRole = "all" | "user" | "pro" | "agency";

export type DocKind = "onboarding" | "reference" | "business-scheduling";

/** Sidebar badge override. Default: Free / Pro+ / Agency from role. */
export type TierBadge = "free" | "pro" | "pro-plus" | "agency";

export type DocNavItem = {
  slug: string;
  label: string;
  /** Maps to DocsContent or business-scheduling section */
  sectionId?: string;
  kind: DocKind;
  role: DocRole;
  /** When role is pro: "pro" = Pro only, "pro-plus" = Pro & Agency (default for role pro) */
  tierBadge?: TierBadge;
  title: string;
  description: string;
  keywords: string[];
};

export type DocNavGroup = {
  id: string;
  label: string;
  slugs: string[];
};

export const ROLE_LABELS: Record<DocRole, string> = {
  all: "All roles",
  user: "User (Free)",
  pro: "Pro",
  agency: "Agency",
};

export const ROLE_BADGE_CLASS: Record<TierBadge, string> = {
  free: "bg-teikos-yellow/60 text-dark",
  pro: "bg-teikos-blue/40 text-dark",
  "pro-plus": "bg-teikos-blue/40 text-dark",
  agency: "bg-teikos-coral/30 text-dark",
};

export function getTierBadgeKey(item: DocNavItem): TierBadge | null {
  if (item.tierBadge) return item.tierBadge;
  if (item.role === "user") return "free";
  if (item.role === "agency") return "agency";
  if (item.role === "pro") return "pro-plus";
  return null;
}

export function getTierBadgeLabel(item: DocNavItem): string | null {
  if (item.tierBadge) {
    const labels: Record<TierBadge, string> = {
      free: "Free",
      pro: "Pro",
      "pro-plus": "Pro+",
      agency: "Agency",
    };
    return labels[item.tierBadge];
  }
  if (item.role === "all") return null;
  if (item.role === "user") return "Free";
  if (item.role === "agency") return "Agency";
  if (item.role === "pro") return "Pro+";
  return null;
}

export const DOC_ROLE_BADGE_CLASS: Record<Exclude<DocRole, "all">, string> = {
  user: ROLE_BADGE_CLASS.free,
  pro: ROLE_BADGE_CLASS.pro,
  agency: ROLE_BADGE_CLASS.agency,
};

export const DOC_NAV: DocNavItem[] = [
  // --- Onboarding ---
  {
    slug: "onboarding",
    label: "Choose your path",
    kind: "onboarding",
    role: "all",
    title: "TEIKOS Onboarding — Pick Your Role",
    description:
      "Start here: guided onboarding for Free business owners, Pro voice agent builders, and Agency multi-client managers.",
    keywords: ["TEIKOS onboarding", "voice agent setup guide", "TEIKOS getting started"],
  },
  {
    slug: "onboarding/user",
    label: "User guide (Free)",
    kind: "onboarding",
    role: "user",
    title: "TEIKOS User Guide — Free Tier Business Scheduling",
    description:
      "Set up services, work hours, business facts, and calendar scheduling. View agency voice logs when linked. Upgrade to Pro when ready for your own integrations.",
    keywords: ["TEIKOS free tier", "business scheduling guide", "voice agent business owner"],
  },
  {
    slug: "onboarding/pro",
    label: "Pro guide",
    kind: "onboarding",
    role: "pro",
    title: "TEIKOS Pro Guide — Connect Your Voice Agent",
    description:
      "Everything in the User guide plus autoprovision integrations (Vapi, Retell, n8n), Voice Controls, Agent Lab, and up to 3 active voice agent integrations.",
    keywords: ["TEIKOS Pro setup", "Vapi integration guide", "voice agent Pro tier"],
  },
  {
    slug: "onboarding/agency",
    label: "Agency guide",
    kind: "onboarding",
    role: "agency",
    title: "TEIKOS Agency Guide — Manage Voice Agent Clients",
    description:
      "Link client accounts, autoprovision their integrations, use Agency Hub and workspace switcher, and scale voice AI deployments across your fleet.",
    keywords: ["TEIKOS Agency guide", "voice AI agency onboarding", "manage client integrations"],
  },

  // --- Start here ---
  {
    slug: "why-teikos",
    label: "Why TEIKOS",
    sectionId: "why",
    kind: "reference",
    role: "all",
    title: "Why TEIKOS — Scheduling Infrastructure for Voice AI Agents",
    description:
      "Stop voice agent double-bookings and hallucinated appointments. TEIKOS is database-first scheduling built for Vapi, Retell, and real-time voice AI.",
    keywords: ["voice agent scheduling", "prevent double booking", "AI voice agent infrastructure"],
  },
  {
    slug: "roles-and-permissions",
    label: "Roles & Permissions",
    sectionId: "roles",
    kind: "reference",
    role: "all",
    title: "TEIKOS Roles — User, Pro, and Agency Permissions",
    description:
      "Free, Pro, and Agency tier capabilities for voice agent scheduling, integrations, and multi-client agency management.",
    keywords: ["TEIKOS pricing tiers", "agency voice agent", "Pro integrations"],
  },

  // --- Business scheduling (Free) ---
  {
    slug: "business-scheduling",
    label: "Overview",
    sectionId: "hub",
    kind: "business-scheduling",
    role: "user",
    tierBadge: "free",
    title: "Business Scheduling Setup — TEIKOS Free Tier",
    description:
      "Configure services, work hours, time off, clients, and prospects — the foundation every TEIKOS business needs before voice agents go live.",
    keywords: ["TEIKOS business scheduling", "services work hours setup", "free tier scheduling"],
  },
  {
    slug: "business-scheduling/services",
    label: "Services",
    sectionId: "services",
    kind: "business-scheduling",
    role: "user",
    tierBadge: "free",
    title: "TEIKOS Services — Bookable Offerings for Voice Agents",
    description: "Define bookable services and durations on the 15-minute grid for availability and voice agent booking.",
    keywords: ["TEIKOS services", "voice agent bookable services"],
  },
  {
    slug: "business-scheduling/work-hours",
    label: "Work hours",
    sectionId: "work-hours",
    kind: "business-scheduling",
    role: "user",
    tierBadge: "free",
    title: "Work Hours — When Your Business Accepts Appointments",
    description: "Set weekly work hours so TEIKOS computes real-time availability for calendar and voice agents.",
    keywords: ["TEIKOS work hours", "business hours scheduling"],
  },
  {
    slug: "business-scheduling/time-off",
    label: "Time off",
    sectionId: "time-off",
    kind: "business-scheduling",
    role: "user",
    tierBadge: "free",
    title: "Time Off — Block Holidays and Closures in TEIKOS",
    description: "Block vacation days and holidays so voice agents never offer unavailable slots.",
    keywords: ["TEIKOS time off", "block scheduling holidays"],
  },
  {
    slug: "business-scheduling/clients",
    label: "Clients",
    sectionId: "clients",
    kind: "business-scheduling",
    role: "user",
    tierBadge: "free",
    title: "Clients — Customer Records for Voice Agent Caller Intake",
    description: "Manage client phone numbers and details for caller_intake matching during voice agent calls.",
    keywords: ["TEIKOS clients", "voice agent caller matching"],
  },
  {
    slug: "business-scheduling/prospects",
    label: "Prospects",
    sectionId: "prospects",
    kind: "business-scheduling",
    role: "user",
    tierBadge: "free",
    title: "Prospects — Callers Who Didn't Book Yet",
    description: "Understand TEIKOS prospects: leads created when callers don't confirm an appointment.",
    keywords: ["TEIKOS prospects", "voice agent leads"],
  },

  // --- User (Free) — other ---
  {
    slug: "business-facts",
    label: "Business Facts",
    sectionId: "business-facts",
    kind: "reference",
    role: "user",
    tierBadge: "free",
    title: "Business Facts for AI Voice Agents — TEIKOS Docs",
    description:
      "Configure custom business facts so your AI voice receptionist answers callers accurately with structured JSON key-value data.",
    keywords: ["AI voice receptionist facts", "voice agent business context", "TEIKOS business facts"],
  },
  {
    slug: "calendar-and-appointments",
    label: "Calendar & appointments",
    sectionId: "calendar",
    kind: "reference",
    role: "user",
    tierBadge: "free",
    title: "Calendar & Appointments — Human + Voice Agent Scheduling",
    description:
      "View and manage appointments booked by voice agents or staff. TEIKOS database remains the single source of truth.",
    keywords: ["AI voice agent calendar", "appointment management"],
  },

  // --- Pro ---
  {
    slug: "getting-started",
    label: "Integration setup (Pro)",
    sectionId: "getting-started",
    kind: "reference",
    role: "pro",
    tierBadge: "pro-plus",
    title: "Getting Started with TEIKOS Voice Agent Integrations",
    description:
      "Connect Vapi, Retell, n8n, or any webhook platform to TEIKOS. Provision integrations, configure tools, and test AI voice agent appointment booking.",
    keywords: ["voice agent scheduling setup", "TEIKOS getting started", "AI appointment booking API"],
  },
  {
    slug: "voice-controls",
    label: "Voice controls",
    sectionId: "voice-controls",
    kind: "reference",
    role: "pro",
    tierBadge: "pro",
    title: "Voice Controls — Telephony Settings for Pro Accounts",
    description:
      "Pro-tier telephony-facing settings hub, separate from integration secrets and Agent Lab scheduling tests.",
    keywords: ["voice agent telephony settings", "TEIKOS voice controls"],
  },
  {
    slug: "agent-lab",
    label: "Agent Lab",
    sectionId: "agent-lab",
    kind: "reference",
    role: "pro",
    tierBadge: "pro-plus",
    title: "Agent Lab — Test Voice Agent Scheduling Without Live Calls",
    description:
      "Simulate the TEIKOS booking pipeline: availability, hold, confirm, intake, and voice logs. Safe dry-run mode for Pro and Agency accounts.",
    keywords: ["voice agent testing", "Agent Lab TEIKOS", "simulate AI booking"],
  },
  {
    slug: "connection-speed",
    label: "Connection speed",
    sectionId: "latency",
    kind: "reference",
    role: "pro",
    tierBadge: "pro-plus",
    title: "Connection Speed — Voice Agent Tool Latency",
    description:
      "Measure Direct RPC vs Edge round-trip latency for TEIKOS tool calls. Optimize voice agent scheduling response times.",
    keywords: ["voice agent latency", "TEIKOS connection speed", "tool router performance"],
  },

  // --- Agency ---
  {
    slug: "agency-command",
    label: "Agency command",
    sectionId: "agency-command",
    kind: "reference",
    role: "agency",
    tierBadge: "agency",
    title: "Agency Command — Link Clients & Manage Seats",
    description:
      "Operations console for agencies: invite clients, manage linked accounts, analytics, and purchased client seats.",
    keywords: ["voice AI agency management", "TEIKOS agency command"],
  },
  {
    slug: "agency-hub",
    label: "Agency hub",
    sectionId: "agency-hub",
    kind: "reference",
    role: "agency",
    tierBadge: "agency",
    title: "Agency Hub — Manage Voice Agent Clients at Scale",
    description:
      "Fleet dashboard for voice AI agencies: client readiness, integration health, Agent Lab shortcuts, and per-client analytics.",
    keywords: ["voice agent agency dashboard", "TEIKOS agency hub"],
  },
  {
    slug: "workspace-switcher",
    label: "Workspace switcher",
    sectionId: "workspace",
    kind: "reference",
    role: "agency",
    tierBadge: "agency",
    title: "Workspace Switcher for Voice Agent Agencies",
    description:
      "Switch between your agency workspace and linked client accounts when managing integrations and scheduling.",
    keywords: ["agency workspace", "multi-tenant voice agent"],
  },
  {
    slug: "billing-and-seats",
    label: "Billing & seats",
    sectionId: "billing",
    kind: "reference",
    role: "agency",
    tierBadge: "agency",
    title: "TEIKOS Billing, Subscriptions & Agency Client Seats",
    description:
      "Upgrade to Pro or Agency via Stripe. Manage subscriptions, client seat add-ons, and plan limits for voice agent integrations.",
    keywords: ["TEIKOS billing", "Agency client seats", "Pro subscription"],
  },

  // --- Integrations ---
  {
    slug: "overview",
    label: "Integrations overview",
    sectionId: "overview",
    kind: "reference",
    role: "pro",
    tierBadge: "pro-plus",
    title: "TEIKOS Integrations Overview — Voice Agent Scheduling API",
    description:
      "How TEIKOS connects voice agents to deterministic scheduling: tool-router endpoints, JSON envelopes, atomic hold-confirm booking, and RLS security.",
    keywords: ["voice agent API", "TEIKOS tool router", "AI scheduling backend"],
  },
  {
    slug: "integrations/vapi",
    label: "Vapi playbook",
    sectionId: "vapi",
    kind: "reference",
    role: "pro",
    tierBadge: "pro-plus",
    title: "Vapi + TEIKOS Integration — AI Voice Agent Scheduling",
    description:
      "Step-by-step Vapi playbook: connect your Vapi voice agent to TEIKOS for atomic appointment booking, availability checks, and zero double-bookings.",
    keywords: ["Vapi scheduling", "Vapi appointment booking", "Vapi TEIKOS integration"],
  },
  {
    slug: "integrations/retell",
    label: "Retell playbook",
    sectionId: "retell",
    kind: "reference",
    role: "pro",
    tierBadge: "pro-plus",
    title: "Retell AI + TEIKOS Integration — Voice Agent Scheduling",
    description:
      "Connect Retell AI phone agents to TEIKOS scheduling tools. HMAC webhook setup, tool definitions, and production booking pipeline.",
    keywords: ["Retell scheduling", "Retell AI booking", "Retell TEIKOS integration"],
  },
  {
    slug: "integrations/n8n",
    label: "n8n playbook",
    sectionId: "n8n",
    kind: "reference",
    role: "pro",
    tierBadge: "pro-plus",
    title: "n8n + TEIKOS Integration — Automate Voice Agent Scheduling",
    description:
      "Wire n8n workflows to TEIKOS for AI voice receptionist scheduling, availability checks, and appointment holds via HTTP.",
    keywords: ["n8n voice agent", "n8n scheduling automation", "TEIKOS n8n"],
  },
  {
    slug: "integrations/webhook-http",
    label: "Webhook / HTTP",
    sectionId: "webhook",
    kind: "reference",
    role: "pro",
    tierBadge: "pro-plus",
    title: "Webhook & HTTP Integration — Universal Voice Agent Scheduling",
    description:
      "Connect any voice platform, Make, Zapier, or custom backend to TEIKOS via Bearer-authenticated HTTP webhooks.",
    keywords: ["voice agent webhook", "HTTP scheduling API", "custom voice agent integration"],
  },

  // --- API & troubleshooting ---
  {
    slug: "tools-reference",
    label: "Tools Reference",
    sectionId: "tools",
    kind: "reference",
    role: "pro",
    tierBadge: "pro-plus",
    title: "TEIKOS Tools Reference — Voice Agent Scheduling API",
    description:
      "Complete API reference: business_facts_get, availability_check, appointment_hold, appointment_confirm, cancel, reschedule, and voice_log_create.",
    keywords: ["voice agent scheduling API", "availability_check", "appointment_hold API"],
  },
  {
    slug: "troubleshooting",
    label: "Troubleshooting",
    sectionId: "troubleshooting",
    kind: "reference",
    role: "all",
    title: "TEIKOS Troubleshooting — Voice Agent Integration Errors",
    description:
      "Fix 401 auth, 403 inactive integrations, slot conflicts, hold expiry, and common voice agent scheduling errors.",
    keywords: ["TEIKOS troubleshooting", "voice agent booking errors"],
  },
];

export const DOC_GROUPS: DocNavGroup[] = [
  {
    id: "onboarding",
    label: "Onboarding",
    slugs: ["onboarding", "onboarding/user", "onboarding/pro", "onboarding/agency"],
  },
  {
    id: "start",
    label: "Start here",
    slugs: ["why-teikos", "roles-and-permissions"],
  },
  {
    id: "business-scheduling",
    label: "Business scheduling",
    slugs: [
      "business-scheduling",
      "business-scheduling/services",
      "business-scheduling/work-hours",
      "business-scheduling/time-off",
      "business-scheduling/clients",
      "business-scheduling/prospects",
    ],
  },
  {
    id: "user",
    label: "User (Free tier)",
    slugs: ["business-facts", "calendar-and-appointments"],
  },
  {
    id: "pro",
    label: "Pro tier",
    slugs: ["getting-started", "voice-controls", "agent-lab", "connection-speed"],
  },
  {
    id: "agency",
    label: "Agency tier",
    slugs: ["agency-command", "agency-hub", "workspace-switcher", "billing-and-seats"],
  },
  {
    id: "integrations",
    label: "Integrations",
    slugs: [
      "overview",
      "integrations/vapi",
      "integrations/retell",
      "integrations/n8n",
      "integrations/webhook-http",
    ],
  },
  {
    id: "api",
    label: "API & troubleshooting",
    slugs: ["tools-reference", "troubleshooting"],
  },
];

export const ONBOARDING_PATHS = [
  { slug: "onboarding/user", role: "user" as const, emoji: "👤", short: "Business owner on the Free plan" },
  { slug: "onboarding/pro", role: "pro" as const, emoji: "⚡", short: "Running your own voice agent integrations" },
  { slug: "onboarding/agency", role: "agency" as const, emoji: "🏢", short: "Managing voice agents for clients" },
];

export function docPath(slug: string): string {
  return `/docs/${slug}`;
}

export function findDocBySlug(slug: string): DocNavItem | undefined {
  return DOC_NAV.find((d) => d.slug === slug);
}

export function findDocBySectionId(sectionId: string): DocNavItem | undefined {
  return DOC_NAV.find((d) => d.sectionId === sectionId);
}

export function docsForGroup(groupId: string): DocNavItem[] {
  const group = DOC_GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return group.slugs
    .map((slug) => findDocBySlug(slug))
    .filter((d): d is DocNavItem => d !== undefined);
}

export const DEFAULT_DOC_SLUG = "onboarding";
