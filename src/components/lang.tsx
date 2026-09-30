"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { T, type Dict, type Lang } from "@/lib/content";

type LangCtx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
export const LangContext = createContext<LangCtx>({ lang: "fr", t: T.fr, setLang: () => {} });
export const useLang = () => useContext(LangContext);

// Keep in sync with the mobile breakpoint in globals.css.
const MOBILE_QUERY = "(max-width: 699px), (pointer: coarse) and (max-width: 1079px)";

export function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

export const useIsMobile = () => useMedia(MOBILE_QUERY);

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
