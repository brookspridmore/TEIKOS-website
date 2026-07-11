import { Link } from "react-router-dom";
import { getOnboardingGuide } from "@/docs/onboardingContent";
import {
  ONBOARDING_PATHS,
  DOC_ROLE_BADGE_CLASS,
  ROLE_BADGE_CLASS,
  ROLE_LABELS,
  DOC_GROUPS,
  docsForGroup,
  docPath,
  findDocBySlug,
  getTierBadgeKey,
  getTierBadgeLabel,
  type DocNavItem,
} from "@/docs/docsNav";
import { APP_SIGNUP_URL } from "@/config/appUrls";
import { cn } from "@/lib/utils";

function RoleBadge({ role }: { role: keyof typeof ROLE_LABELS }) {
  if (role === "all") return null;
  return (
    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded border border-dark/20", DOC_ROLE_BADGE_CLASS[role])}>
      {ROLE_LABELS[role]}
    </span>
  );
}

function DocTierBadge({ doc }: { doc: DocNavItem }) {
  const label = getTierBadgeLabel(doc);
  const tier = getTierBadgeKey(doc);
  if (!label || !tier) return null;
  return (
    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded border border-dark/20", ROLE_BADGE_CLASS[tier])}>
      {label}
    </span>
  );
}

export function OnboardingHub() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading font-bold text-2xl text-dark mb-2">Choose your onboarding path</h2>
        <p className="font-body text-dark/70 leading-relaxed max-w-2xl">
          New to TEIKOS? Start with the guide that matches your plan. Each path is a step-by-step checklist with links
          to deeper reference docs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {ONBOARDING_PATHS.map((path) => {
          const doc = findDocBySlug(path.slug)!;
          return (
            <Link
              key={path.slug}
              to={docPath(path.slug)}
              className="teikos-card p-6 flex flex-col gap-3 hover:shadow-card-hover transition-shadow h-full"
            >
              <span className="text-3xl" aria-hidden>
                {path.emoji}
              </span>
              <RoleBadge role={path.role} />
              <h3 className="font-heading font-bold text-lg text-dark">{doc.label}</h3>
              <p className="font-body text-sm text-dark/65 leading-relaxed flex-1">{path.short}</p>
              <span className="font-heading text-sm font-semibold text-teikos-blue-deep">Start guide →</span>
            </Link>
          );
        })}
      </div>

      <div className="border-t-2 border-dark/10 pt-8">
        <h3 className="font-heading font-semibold text-dark mb-2">Role progression</h3>
        <p className="font-body text-sm text-dark/70 mb-4">
          User (Free) → Pro (own integrations) → Agency (manage clients). You can upgrade anytime from Settings.
        </p>
        <div className="flex flex-wrap items-center gap-2 text-sm font-heading font-semibold">
          <RoleBadge role="user" />
          <span className="text-dark/40">→</span>
          <RoleBadge role="pro" />
          <span className="text-dark/40">→</span>
          <RoleBadge role="agency" />
        </div>
      </div>

      <a href={APP_SIGNUP_URL} className="btn-primary inline-block text-sm">
        Create free account
      </a>
    </div>
  );
}

export function OnboardingGuideView({ slug }: { slug: string }) {
  const guide = getOnboardingGuide(slug);
  const doc = findDocBySlug(slug);

  if (!guide || !doc || slug === "onboarding") {
    return <OnboardingHub />;
  }

  return (
    <div className="space-y-8">
      <header>
        <RoleBadge role={doc.role} />
        <h2 className="font-heading font-bold text-2xl text-dark mt-3 mb-2">{guide.headline}</h2>
        <p className="font-body text-dark/70 leading-relaxed">{guide.intro}</p>
        {guide.inheritsFrom && (
          <p className="font-body text-sm text-dark/60 mt-3">
            Includes everything in the{" "}
            <Link to={docPath(guide.inheritsFrom.slug)} className="text-teikos-blue-deep font-medium hover:underline">
              {guide.inheritsFrom.label}
            </Link>
            .
          </p>
        )}
      </header>

      <ol className="space-y-6 list-none p-0 m-0">
        {guide.steps.map((step, i) => (
          <li key={i} className="teikos-card p-5">
            <h3 className="font-heading font-semibold text-dark mb-2">{step.title}</h3>
            <p className="font-body text-sm text-dark/70 leading-relaxed mb-3">{step.body}</p>
            {step.links && step.links.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {step.links.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.to}
                        className="text-xs font-semibold border-2 border-dark rounded-md px-2 py-1 bg-teikos-yellow/40 hover:bg-teikos-yellow/70 transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-xs font-semibold border-2 border-dark rounded-md px-2 py-1 bg-white hover:bg-teikos-blue/30 transition-colors"
                      >
                        {link.label} →
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            )}
          </li>
        ))}
      </ol>

      {guide.appPages.length > 0 && (
        <section>
          <h3 className="font-heading font-semibold text-dark mb-3">Key app pages for this role</h3>
          <div className="border-2 border-dark rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-2 font-medium">Page</th>
                  <th className="text-left px-4 py-2 font-medium">App route</th>
                  <th className="text-left px-4 py-2 font-medium hidden sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {guide.appPages.map((page) => (
                  <tr key={page.path} className="border-t border-dark/10">
                    <td className="px-4 py-2 font-medium">{page.name}</td>
                    <td className="px-4 py-2 font-mono text-xs text-dark/70">{page.path}</td>
                    <td className="px-4 py-2 text-dark/60 hidden sm:table-cell">{page.note ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-xs text-dark/50 mt-2">
            Routes are in the TEIKOS web app after sign-in (app.teikos.io).
          </p>
        </section>
      )}

      {guide.upgradeTo && (
        <div className="border-[3px] border-dark rounded-xl p-5 bg-teikos-yellow/30">
          <p className="font-body text-dark/80 mb-3">{guide.upgradeTo.cta}</p>
          <Link to={docPath(guide.upgradeTo.slug)} className="btn-secondary inline-block text-sm">
            {guide.upgradeTo.label}
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-4 border-t border-dark/10">
        <Link to={docPath("onboarding")} className="text-sm font-medium text-teikos-blue-deep hover:underline">
          ← All onboarding paths
        </Link>
        <Link to="/docs" className="text-sm font-medium text-teikos-blue-deep hover:underline">
          Full doc index
        </Link>
      </div>
    </div>
  );
}

/** Reference docs grouped for the index page */
export function DocsGroupedIndex() {
  return (
    <div className="space-y-8 mt-12 border-t-2 border-dark/10 pt-10">
      <h2 className="font-heading font-bold text-2xl text-dark">Reference documentation</h2>
      {DOC_GROUPS.filter((g) => g.id !== "onboarding").map((group) => {
        const items = docsForGroup(group.id);
        if (items.length === 0) return null;
        return (
          <section key={group.id}>
            <h3 className="font-heading font-semibold text-lg text-dark mb-3">{group.label}</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {items.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    to={docPath(doc.slug)}
                    className="block border-2 border-dark/20 rounded-lg p-4 hover:bg-teikos-yellow/20 transition-colors h-full"
                  >
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-heading font-semibold text-dark text-sm">{doc.label}</span>
                      {doc.role !== "all" && <DocTierBadge doc={doc} />}
                    </div>
                    <p className="font-body text-xs text-dark/60 leading-relaxed">{doc.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
