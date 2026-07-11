import { Link } from "react-router-dom";
import {
  BUSINESS_SCHEDULING_NAV_SLUGS,
  getBusinessSchedulingPage,
  type BusinessSchedulingSectionId,
} from "@/docs/businessSchedulingContent";
import { docPath } from "@/docs/docsNav";

function SectionBody({ sectionId }: { sectionId: BusinessSchedulingSectionId }) {
  const page = getBusinessSchedulingPage(sectionId);
  if (!page) return null;

  return (
    <div className="space-y-4">
      {page.paragraphs.map((p, i) => (
        <p key={i} className="font-body text-sm text-dark/70 leading-relaxed">
          {p}
        </p>
      ))}
      {page.bullets && (
        <ul className="list-disc list-inside text-sm text-dark/70 space-y-1 ml-2">
          {page.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {page.tips && (
        <div className="border-l-2 border-teikos-blue pl-3 space-y-1">
          {page.tips.map((t) => (
            <p key={t} className="text-sm text-dark/65">
              {t}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function BusinessSchedulingHub() {
  const hub = getBusinessSchedulingPage("hub");
  return (
    <div className="space-y-6">
      {hub && (
        <>
          <p className="font-body text-dark/70 leading-relaxed">{hub.summary}</p>
          {hub.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-sm text-dark/70 leading-relaxed">
              {p}
            </p>
          ))}
        </>
      )}
      <div className="grid sm:grid-cols-2 gap-3">
        {BUSINESS_SCHEDULING_NAV_SLUGS.map((slug) => {
          const sectionId = slug.split("/").pop() as BusinessSchedulingSectionId;
          const page = getBusinessSchedulingPage(sectionId);
          if (!page) return null;
          return (
            <Link
              key={slug}
              to={docPath(slug)}
              className="teikos-card p-4 hover:shadow-card-hover transition-shadow block"
            >
              <h3 className="font-heading font-semibold text-dark mb-1">{page.title}</h3>
              <p className="font-body text-xs text-dark/65 leading-relaxed">{page.summary}</p>
            </Link>
          );
        })}
      </div>
      <p className="font-body text-sm text-dark/60">
        Next:{" "}
        <Link to={docPath("business-facts")} className="text-teikos-blue-deep font-medium hover:underline">
          Business Facts
        </Link>
        {" · "}
        <Link to={docPath("calendar-and-appointments")} className="text-teikos-blue-deep font-medium hover:underline">
          Calendar & appointments
        </Link>
      </p>
    </div>
  );
}

export function BusinessSchedulingView({ sectionId }: { sectionId: BusinessSchedulingSectionId }) {
  if (sectionId === "hub") {
    return <BusinessSchedulingHub />;
  }

  const page = getBusinessSchedulingPage(sectionId);
  if (!page) return null;

  const slugSuffix = sectionId === "work-hours" ? "work-hours" : sectionId;

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-2 text-xs font-semibold">
        <Link to={docPath("business-scheduling")} className="text-teikos-blue-deep hover:underline">
          Business scheduling
        </Link>
        <span className="text-dark/40">/</span>
        <span className="text-dark/70">{page.title}</span>
      </nav>

      <SectionBody sectionId={sectionId} />

      <div className="flex flex-wrap gap-2 pt-4 border-t border-dark/10">
        {BUSINESS_SCHEDULING_NAV_SLUGS.filter((s) => !s.endsWith(slugSuffix)).map((slug) => {
          const id = slug.split("/").pop() as BusinessSchedulingSectionId;
          const p = getBusinessSchedulingPage(id);
          if (!p) return null;
          return (
            <Link
              key={slug}
              to={docPath(slug)}
              className="text-xs font-semibold border-2 border-dark rounded-md px-2 py-1 hover:bg-teikos-yellow/40 transition-colors"
            >
              {p.title} →
            </Link>
          );
        })}
      </div>
    </div>
  );
}
