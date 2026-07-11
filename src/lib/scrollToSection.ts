export type FeaturesTab = "business" | "agency";

export function dispatchFeaturesTab(tab: FeaturesTab) {
  window.dispatchEvent(new CustomEvent("teikos:features-tab", { detail: tab }));
}

export function scrollToSectionId(id: string, behavior: ScrollBehavior = "smooth", attempt = 0) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior, block: "start" });
    return;
  }
  if (attempt < 12) {
    requestAnimationFrame(() => scrollToSectionId(id, behavior, attempt + 1));
  }
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.replace(/^#/, "");
  if (!id) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return;
  }
  scrollToSectionId(id, behavior);
}
