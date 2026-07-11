export type BusinessSchedulingSectionId =
  | "hub"
  | "services"
  | "work-hours"
  | "time-off"
  | "clients"
  | "prospects";

export type BusinessSchedulingPage = {
  sectionId: BusinessSchedulingSectionId;
  title: string;
  summary: string;
  paragraphs: string[];
  bullets?: string[];
  tips?: string[];
};

export const BUSINESS_SCHEDULING_PAGES: BusinessSchedulingPage[] = [
  {
    sectionId: "hub",
    title: "Business scheduling setup",
    summary:
      "Core Free-tier configuration: services, hours, clients, and time off. Voice agents and your calendar both depend on this data.",
    paragraphs: [
      "Before you connect a voice agent (Pro) or work with an agency, every TEIKOS business needs the same scheduling foundation. Availability is computed live from these records — nothing is cached.",
      "Work through the five areas below in order. When you're done, add Business Facts for anything callers ask that isn't covered by services or hours.",
    ],
  },
  {
    sectionId: "services",
    title: "Services",
    summary: "Define what can be booked, how long each appointment takes, and how it appears to voice agents.",
    paragraphs: [
      "Open Services in the app and add each bookable offering. Duration drives the 15-minute scheduling grid — all slots snap to :00, :15, :30, and :45 boundaries.",
      "When a voice agent runs availability_check, it passes a service_id. That service's length determines which windows TEIKOS returns.",
    ],
    bullets: [
      "One row per bookable service (e.g. consultation, repair visit, initial exam).",
      "Set realistic durations; buffers and conflicts respect service length.",
      "Deactivate a service instead of deleting if you have historical appointments.",
    ],
    tips: [
      "Complete services before work hours — empty services mean no bookable offerings for agents.",
    ],
  },
  {
    sectionId: "work-hours",
    title: "Work hours",
    summary: "Weekly schedule that bounds when appointments can be offered.",
    paragraphs: [
      "Work hours define when your business accepts bookings. TEIKOS intersects these hours with time off and existing appointments every time availability_check runs.",
      "Use your business timezone from the dashboard — speakable_time values in API responses are phrased in that zone.",
    ],
    bullets: [
      "Set open/close per weekday; match how you actually operate.",
      "Partial days are supported (e.g. Monday 9:00–13:00 only).",
      "Changes apply immediately to the next availability request.",
    ],
  },
  {
    sectionId: "time-off",
    title: "Time off",
    summary: "Block holidays, vacations, and one-off closures so agents never offer those slots.",
    paragraphs: [
      "Time off removes availability for specific dates or ranges without changing your recurring work hours. Use it for holidays, training days, or emergency closures.",
      "Held and confirmed appointments on blocked time still exist — cancel or reschedule them separately if needed.",
    ],
    bullets: [
      "Add single days or multi-day ranges.",
      "Label entries for your own reference (e.g. \"Office closed — holiday\").",
      "Voice agents receive no windows on fully blocked days.",
    ],
  },
  {
    sectionId: "clients",
    title: "Clients",
    summary: "Customer records keyed by phone — used when voice agents identify callers.",
    paragraphs: [
      "Clients store names, phones, emails, and booking history. When an agent calls caller_intake with an E.164 phone number, TEIKOS matches an existing client or creates a prospect.",
      "You can also add clients manually from the Clients page before any voice traffic arrives.",
    ],
    bullets: [
      "Use E.164 format for phones (+15551234567) for reliable matching.",
      "Existing clients get accurate intake on repeat calls.",
      "Manual edits on the dashboard stay in sync with agent tools.",
    ],
  },
  {
    sectionId: "prospects",
    title: "Prospects",
    summary: "Callers who didn't book yet — captured automatically from voice agent intake.",
    paragraphs: [
      "When caller_intake runs and no client matches, TEIKOS creates a prospect. Prospects are follow-up leads: someone who called but didn't confirm an appointment.",
      "Free-tier businesses linked to an agency can view voice logs and prospects from agency-managed integrations. On your own Free account without integrations, prospects appear once an agency provisions voice tools for you.",
    ],
    bullets: [
      "Review prospects alongside voice logs to see who called and what happened.",
      "Convert prospects to clients when they return and book.",
      "Agency partners can help monitor prospect lists for linked accounts.",
    ],
    tips: [
      "Prospects are not a separate app page on all plans — they appear in voice log / caller workflows tied to integrations.",
    ],
  },
];

export function getBusinessSchedulingPage(sectionId: BusinessSchedulingSectionId): BusinessSchedulingPage | undefined {
  return BUSINESS_SCHEDULING_PAGES.find((p) => p.sectionId === sectionId);
}

export const BUSINESS_SCHEDULING_NAV_SLUGS = [
  "business-scheduling/services",
  "business-scheduling/work-hours",
  "business-scheduling/time-off",
  "business-scheduling/clients",
  "business-scheduling/prospects",
] as const;
