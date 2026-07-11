import { docPath } from "./docsNav";
import { APP_SIGNUP_URL } from "@/config/appUrls";

export type OnboardingStep = {
  title: string;
  body: string;
  links?: { label: string; to: string; external?: boolean }[];
};

export type OnboardingGuide = {
  slug: string;
  headline: string;
  intro: string;
  inheritsFrom?: { label: string; slug: string };
  upgradeTo?: { label: string; slug: string; cta: string };
  steps: OnboardingStep[];
  appPages: { name: string; path: string; note?: string }[];
};

export const ONBOARDING_GUIDES: Record<string, OnboardingGuide> = {
  onboarding: {
    slug: "onboarding",
    headline: "Welcome to TEIKOS",
    intro:
      "TEIKOS grows with you. Pick the path that matches your account role today — you can always upgrade later.",
    steps: [],
    appPages: [],
  },
  "onboarding/user": {
    slug: "onboarding/user",
    headline: "User guide — Free tier business scheduling",
    intro:
      "As a User (Free tier), you own your business scheduling data: services, clients, appointments, and business facts. You cannot create voice agent integrations yourself — upgrade to Pro, or work with an Agency that provisions integrations for you.",
    upgradeTo: {
      label: "Pro guide",
      slug: "onboarding/pro",
      cta: "Ready to connect your own voice agent? Follow the Pro guide →",
    },
    steps: [
      {
        title: "1. Sign up and open your Business Dashboard",
        body: "Create your account at the TEIKOS app. Set your timezone, business name, and account details on the Business Dashboard. Everything downstream — availability, holds, and speakable times — uses this timezone.",
        links: [{ label: "Sign up free", to: APP_SIGNUP_URL, external: true }],
      },
      {
        title: "2. Define your services",
        body: "Add each bookable service with duration (15-minute grid). Voice agents and the calendar both reference these service records when checking availability or placing holds.",
      },
      {
        title: "3. Set work hours and time off",
        body: "Configure weekly work hours and block vacation days or holidays. Availability is computed live from work hours, time off, and existing appointments — nothing is cached.",
      },
      {
        title: "4. Add clients (optional)",
        body: "Store customer phone numbers and details. When a voice agent runs caller_intake, matching phones resolve to existing clients; unknown callers become prospects automatically.",
      },
      {
        title: "5. Configure business facts",
        body: "Business facts are the cheat sheet your voice agent reads aloud — address, policies, service areas, pricing notes. Keep values as valid JSON strings, arrays, numbers, or objects.",
        links: [{ label: "Business Facts deep dive", to: docPath("business-facts") }],
      },
      {
        title: "6. Use Calendar & Appointments",
        body: "View your week, drag to reschedule when allowed, or create appointments manually. Anything a voice agent books lands here — the database is always the source of truth.",
        links: [{ label: "Calendar & appointments", to: docPath("calendar-and-appointments") }],
      },
      {
        title: "7. If linked to an Agency",
        body: "Agencies can send link requests to your email. When linked: they may provision voice integrations on your behalf, and you can view voice logs, transcripts, and prospects from callers who did not book. You can accept, decline, or unlink at any time from your dashboard.",
        links: [{ label: "Roles & permissions", to: docPath("roles-and-permissions") }],
      },
      {
        title: "8. When you're ready for your own voice agent",
        body: "Upgrade to Pro to create up to three active integrations (Vapi, Retell, n8n, Webhook). Until then, enjoy full business scheduling on the Free tier.",
        links: [
          { label: "Pro onboarding guide", to: docPath("onboarding/pro") },
          { label: "Billing & upgrades", to: docPath("billing-and-seats") },
        ],
      },
    ],
    appPages: [
      { name: "Business Dashboard", path: "/app", note: "Account info, business facts, timezone" },
      { name: "Services", path: "/app/services" },
      { name: "Work hours", path: "/app/work-hours" },
      { name: "Time off", path: "/app/time-off" },
      { name: "Clients", path: "/app/clients" },
      { name: "Calendar", path: "/app/calendar" },
      { name: "Appointments", path: "/app/appointments" },
    ],
  },
  "onboarding/pro": {
    slug: "onboarding/pro",
    headline: "Pro guide — Connect your voice agent",
    intro:
      "Pro includes everything in the User (Free) tier, plus the ability to create and manage your own voice agent integrations — up to three active at a time on your business.",
    inheritsFrom: { label: "User (Free) guide", slug: "onboarding/user" },
    upgradeTo: {
      label: "Agency guide",
      slug: "onboarding/agency",
      cta: "Managing clients at scale? See the Agency guide →",
    },
    steps: [
      {
        title: "1. Complete the User setup first",
        body: "Services, work hours, business facts, and timezone must be in place before integrations go live. Skipping this produces empty availability or wrong speakable times on calls.",
        links: [{ label: "User guide", to: docPath("onboarding/user") }],
      },
      {
        title: "2. Subscribe to Pro",
        body: "Open Settings in the app and complete Stripe Checkout. Your role elevates to Pro automatically when the subscription is active.",
        links: [{ label: "Billing & seats", to: docPath("billing-and-seats") }],
      },
      {
        title: "3. Autoprovision your first integration",
        body: "Go to Integrations → Autoprovision. Choose your provider (Vapi, Retell, n8n, Webhook, or HTTP). Copy the integration public ID and secret immediately — the secret is shown only once.",
        links: [{ label: "Integration setup (Pro)", to: docPath("getting-started") }],
      },
      {
        title: "4. Follow your platform playbook",
        body: "Each provider has a step-by-step playbook: endpoint URL, auth headers, and tool definitions. Paste TEIKOS tools into Vapi or Retell exactly as documented.",
        links: [
          { label: "Vapi playbook", to: docPath("integrations/vapi") },
          { label: "Retell playbook", to: docPath("integrations/retell") },
          { label: "n8n playbook", to: docPath("integrations/n8n") },
          { label: "Webhook / HTTP", to: docPath("integrations/webhook-http") },
        ],
      },
      {
        title: "5. Configure Voice Controls",
        body: "Pro accounts get a dedicated Voice Controls page for telephony-facing settings — separate from integration secrets on the Integrations page.",
        links: [{ label: "Voice controls", to: docPath("voice-controls") }],
      },
      {
        title: "6. Test in Agent Lab (simulation on)",
        body: "Run the full pipeline — context, availability, hold — in simulation mode first. Use Context only to verify business facts before you touch booking.",
        links: [{ label: "Agent Lab guide", to: docPath("agent-lab") }],
      },
      {
        title: "7. Check connection speed",
        body: "On Integrations → Connection speed, measure edge round-trip latency. Green through ~600ms on the TEIKOS segment is a good sign before you go live.",
        links: [{ label: "Connection speed", to: docPath("connection-speed") }],
      },
      {
        title: "8. Go live and monitor",
        body: "Place a test call. Review voice logs and transcripts. If something fails, use Troubleshooting for auth errors, slot conflicts, or expired holds.",
        links: [
          { label: "Tools reference", to: docPath("tools-reference") },
          { label: "Troubleshooting", to: docPath("troubleshooting") },
        ],
      },
    ],
    appPages: [
      { name: "Integrations", path: "/app/integrations", note: "Autoprovision, secrets, connection speed" },
      { name: "Voice Controls", path: "/app/voice-controls", note: "Pro only" },
      { name: "Agent Lab", path: "/app/agent-lab", note: "Pro and Agency" },
      { name: "Settings", path: "/app/settings", note: "Billing & upgrade" },
    ],
  },
  "onboarding/agency": {
    slug: "onboarding/agency",
    headline: "Agency guide — Manage voice agent clients",
    intro:
      "Agency includes everything in Pro for your own workspace, plus tools to link business clients, autoprovision their integrations, and operate a fleet from Agency Hub and Agency Command.",
    inheritsFrom: { label: "Pro guide", slug: "onboarding/pro" },
    steps: [
      {
        title: "1. Understand the Agency model",
        body: "Your agency account manages linked business accounts. Each client keeps their own data (services, appointments, clients). You can switch into their workspace to configure integrations on their behalf.",
        links: [{ label: "Roles & permissions", to: docPath("roles-and-permissions") }],
      },
      {
        title: "2. Subscribe to Agency",
        body: "Upgrade via Settings → Agency plan in Stripe. Base plan includes five linked client seats; purchase add-ons when you need more capacity.",
        links: [{ label: "Billing & client seats", to: docPath("billing-and-seats") }],
      },
      {
        title: "3. Invite and link clients",
        body: "From Agency Command → Main: search by email, send link requests, or use invite-and-link for new clients. Clients accept from their dashboard.",
        links: [{ label: "Agency command", to: docPath("agency-command") }],
      },
      {
        title: "4. Switch into a client workspace",
        body: "Use the Workspace dropdown in the sidebar to act as a linked client. Dashboard, Calendar, Services, Integrations, and Agent Lab all target that client's account until you exit client view.",
        links: [{ label: "Workspace switcher", to: docPath("workspace-switcher") }],
      },
      {
        title: "5. Autoprovision integrations for clients",
        body: "While scoped to a client, open Integrations → Autoprovision with Provision for set to that linked account. You manage secrets and enable/disable providers without sharing your agency login.",
        links: [{ label: "Integration setup", to: docPath("getting-started") }],
      },
      {
        title: "6. Monitor fleet health in Agency Hub",
        body: "Agency Hub shows one card per linked client: readiness pills, integration status, voice tool recency, and shortcuts to Agent Lab, connection speed, call logs, and analytics.",
        links: [{ label: "Agency hub", to: docPath("agency-hub") }],
      },
      {
        title: "7. Edit client business facts",
        body: "Expand a linked account in Agency Command, or switch workspace and use the Business Facts tab. Always edit the client's data, not your agency profile.",
        links: [{ label: "Business facts", to: docPath("business-facts") }],
      },
      {
        title: "8. Run Agent Lab per client",
        body: "Open Agent Lab from Agency Hub (pre-scoped with ?owner=…) or pick the client in the lab's Business dropdown. Test availability and holds before client go-live.",
        links: [{ label: "Agent Lab", to: docPath("agent-lab") }],
      },
      {
        title: "9. Review analytics and logs",
        body: "Agency Command → Linked Logs and Agency analytics for fleet-wide metrics. Per-client CSV exports available from Agency Hub cards.",
        links: [{ label: "Agency command", to: docPath("agency-command") }],
      },
    ],
    appPages: [
      { name: "Agency Command", path: "/agency", note: "Link clients, seats, fleet logs" },
      { name: "Agency Hub", path: "/agency/hub", note: "Readiness dashboard" },
      { name: "Workspace switcher", path: "/app", note: "Sidebar dropdown" },
      { name: "Integrations (client scope)", path: "/app/integrations" },
      { name: "Agent Lab", path: "/app/agent-lab" },
      { name: "Settings", path: "/app/settings", note: "Agency billing & seats" },
    ],
  },
};

export function getOnboardingGuide(slug: string): OnboardingGuide | undefined {
  return ONBOARDING_GUIDES[slug];
}