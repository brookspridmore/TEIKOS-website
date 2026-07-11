import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "@/config/site";

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  ogType?: string;
};

function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[]) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function SeoHead({ title, description, path, keywords, jsonLd, ogType = "website" }: SeoHeadProps) {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta("description", description);
    if (keywords?.length) upsertMeta("keywords", keywords.join(", "));
    upsertLink("canonical", url);
    upsertMeta("og:type", ogType, "property");
    upsertMeta("og:title", fullTitle, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:url", url, "property");
    upsertMeta("og:image", `${SITE_URL}/og-image.jpg`, "property");
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", fullTitle);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", `${SITE_URL}/og-image.jpg`);

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        ...(path.startsWith("/docs")
          ? [
              { "@type": "ListItem", position: 2, name: "Documentation", item: `${SITE_URL}/docs` },
              { "@type": "ListItem", position: 3, name: title.replace(` | ${SITE_NAME}`, ""), item: url },
            ]
          : [{ "@type": "ListItem", position: 2, name: title.replace(` | ${SITE_NAME}`, ""), item: url }]),
      ],
    };

    const schemas = jsonLd ? (Array.isArray(jsonLd) ? [breadcrumb, ...jsonLd] : [breadcrumb, jsonLd]) : [breadcrumb];
    upsertJsonLd("page-json-ld", schemas.length === 1 ? schemas[0] : schemas);
  }, [fullTitle, description, url, keywords, jsonLd, ogType, path, title]);

  return null;
}
