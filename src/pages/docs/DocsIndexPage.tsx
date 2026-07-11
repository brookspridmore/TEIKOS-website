import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { ONBOARDING_PATHS, docPath, DEFAULT_DOC_SLUG } from "@/docs/docsNav";
import { SITE_URL } from "@/config/site";
import { OnboardingHub, DocsGroupedIndex } from "@/pages/docs/OnboardingGuide";
import { APP_SIGNUP_URL } from "@/config/appUrls";

export function DocsIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TEIKOS Documentation",
    description:
      "Role-based onboarding and reference docs for AI voice agent scheduling, Vapi, Retell, and n8n integrations.",
    url: `${SITE_URL}/docs`,
  };

  return (
    <>
      <SeoHead
        title="Documentation — AI Voice Agent Scheduling Guides"
        description="Start with role-based onboarding (User, Pro, Agency), then browse integration playbooks, tools reference, and troubleshooting for AI voice receptionist scheduling."
        path="/docs"
        keywords={[
          "TEIKOS documentation",
          "voice agent onboarding",
          "AI voice receptionist guide",
          "Vapi integration docs",
        ]}
        jsonLd={jsonLd}
      />
      <div className="space-y-6">
        <OnboardingHub />

        <div className="grid sm:grid-cols-3 gap-3 pt-4">
          {ONBOARDING_PATHS.map((p) => (
            <Link
              key={p.slug}
              to={docPath(p.slug)}
              className="text-center border-2 border-dark rounded-lg py-3 px-4 text-sm font-heading font-semibold hover:bg-teikos-yellow/40 transition-colors"
            >
              {p.emoji} {p.role === "user" ? "User" : p.role === "pro" ? "Pro" : "Agency"} path
            </Link>
          ))}
        </div>

        <DocsGroupedIndex />

        <div className="teikos-card p-6 bg-teikos-blue/10">
          <h3 className="font-heading font-bold text-dark mb-2">New here?</h3>
          <p className="font-body text-sm text-dark/70 mb-4">
            Most people should start at{" "}
            <Link to={docPath(DEFAULT_DOC_SLUG)} className="text-teikos-blue-deep font-medium hover:underline">
              onboarding
            </Link>{" "}
            and pick User, Pro, or Agency — not the integration setup guide (that&apos;s for Pro subscribers).
          </p>
          <a href={APP_SIGNUP_URL} className="btn-primary inline-block text-sm">
            Create free account
          </a>
        </div>
      </div>
    </>
  );
}
