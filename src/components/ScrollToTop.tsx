import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { dispatchFeaturesTab, scrollToHash, type FeaturesTab } from "@/lib/scrollToSection";

type HomeNavState = {
  featuresTab?: FeaturesTab;
};

export function ScrollToTop() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    const navState = (state ?? {}) as HomeNavState;
    if (navState.featuresTab) {
      dispatchFeaturesTab(navState.featuresTab);
    }

    if (hash) {
      scrollToHash(hash);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, state]);

  return null;
}
