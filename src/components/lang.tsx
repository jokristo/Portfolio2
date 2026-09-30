"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";
import { T, type Dict, type Lang } from "@/content/copy";

/* ── Language: stored in the URL (?lang=en), French by default ───────── */
const LANG_EVENT = "langchange";

const subscribeLang = (cb: () => void) => {
  window.addEventListener(LANG_EVENT, cb);
  window.addEventListener("popstate", cb);
  return () => {
    window.removeEventListener(LANG_EVENT, cb);
    window.removeEventListener("popstate", cb);
  };
};
const readLang = (): Lang => (new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "fr");

type LangCtx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangContext = createContext<LangCtx>({ lang: "fr", t: T.fr, setLang: () => {} });
export const useLang = () => useContext(LangContext);

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribeLang, readLang, () => "fr" as Lang);

  const setLang = useCallback((l: Lang) => {
    const url = new URL(window.location.href);
    if (l === "fr") url.searchParams.delete("lang");
    else url.searchParams.set("lang", l);
    window.history.replaceState(null, "", url);
    document.documentElement.lang = l;
    window.dispatchEvent(new Event(LANG_EVENT));
  }, []);

  return <LangContext.Provider value={{ lang, t: T[lang], setLang }}>{children}</LangContext.Provider>;
}

/** Appends ?lang=en to internal links while browsing in English. */
export function useHref() {
  const { lang } = useLang();
  return (path: string) => (lang === "en" ? `${path}${path.includes("?") ? "&" : "?"}lang=en` : path);
}

/* ── Media queries ───────────────────────────────────────────────────── */
// Keep in sync with the mobile breakpoint in globals.css.
const MOBILE_QUERY = "(max-width: 699px), (pointer: coarse) and (max-width: 1079px)";

export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useIsMobile = () => useMedia(MOBILE_QUERY);

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
