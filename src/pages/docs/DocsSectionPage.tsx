import { Navigate, useParams } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { DocsSectionContent } from "@/pages/docs/DocsContent";
import { OnboardingGuideView } from "@/pages/docs/OnboardingGuide";
import { BusinessSchedulingView } from "@/pages/docs/BusinessScheduling";
import type { BusinessSchedulingSectionId } from "@/docs/businessSchedulingContent";
import { DEFAULT_DOC_SLUG, findDocBySlug } from "@/docs/docsNav";
import { SITE_URL } from "@/config/site";

export function DocsSectionPage() {
  const { "*": splat } = useParams();
  const slug = (splat ?? "").replace(/\/$/, "") || DEFAULT_DOC_SLUG;
  const doc = findDocBySlug(slug);

  if (!doc) {
    return <Navigate to={`/docs/${DEFAULT_DOC_SLUG}`} replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": doc.kind === "onboarding" ? "HowTo" : "TechArticle",
    name: doc.title,
    headline: doc.title,
    description: doc.description,
    url: `${SITE_URL}/docs/${doc.slug}`,
    author: { "@type": "Organization", name: "TEIKOS", url: SITE_URL },
    publisher: { "@type": "Organization", name: "TEIKOS", url: SITE_URL },
    keywords: doc.keywords.join(", "),
  };

  return (
    <>
      <SeoHead
        title={doc.title}
        description={doc.description}
        path={`/docs/${doc.slug}`}
        keywords={doc.keywords}
        jsonLd={jsonLd}
        ogType="article"
      />
      {doc.kind === "onboarding" ? (
        <OnboardingGuideView slug={slug} />
      ) : doc.kind === "business-scheduling" ? (
        <article>
          <header className="mb-6">
            <h2 className="font-heading font-bold text-2xl text-dark mb-2">{doc.label}</h2>
            <p className="font-body text-dark/70 leading-relaxed">{doc.description}</p>
          </header>
          <BusinessSchedulingView sectionId={(doc.sectionId ?? "hub") as BusinessSchedulingSectionId} />
        </article>
      ) : (
        <article>
          <header className="mb-6">
            <h2 className="font-heading font-bold text-2xl text-dark mb-2">{doc.label}</h2>
            <p className="font-body text-dark/70 leading-relaxed">{doc.description}</p>
          </header>
          {doc.sectionId && <DocsSectionContent sectionId={doc.sectionId} />}
        </article>
      )}
    </>
  );
}
