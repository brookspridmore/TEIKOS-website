export const SITE_URL = "https://www.teikos.io";
export const SITE_NAME = "TEIKOS";

/** Documented tool-router URL pattern (users replace YOUR_PROJECT after provisioning). */
export const TOOL_ROUTER_BASE =
  (import.meta.env.VITE_TOOL_ROUTER_BASE as string | undefined)?.trim() ||
  "https://YOUR_PROJECT.supabase.co/functions/v1/tool-router/tool";

export const PARTNER_LINKS = {
  vapi: { name: "Vapi", url: "https://vapi.ai", description: "Voice AI platform for building phone agents" },
  retell: { name: "Retell AI", url: "https://retellai.com", description: "Conversational voice AI for phone calls" },
  n8n: { name: "n8n", url: "https://n8n.io", description: "Workflow automation with HTTP and webhooks" },
  make: { name: "Make", url: "https://www.make.com", description: "Visual automation platform" },
  zapier: { name: "Zapier", url: "https://zapier.com", description: "Connect apps with automated workflows" },
  bland: { name: "Bland AI", url: "https://www.bland.ai", description: "Enterprise phone calling AI" },
} as const;
