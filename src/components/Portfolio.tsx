"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EMAIL, NAV_IDS, T, type Lang } from "@/lib/content";
import { LangContext, prefersReducedMotion, useIsMobile, useLang } from "./lang";
import { Band, C, CardFill, KubaBackground, Logo } from "./kuba";
import { About, Contact, Footer, Hero, Journey, Marquee, Method, Services, Skills, Stats, Work } from "./sections";

const GLOW_OPACITY = 0.22;
const PATTERN_OPACITY = 0.05;

export default function Portfolio() {
  const [lang, setLangState] = useState<Lang>("fr");
  const t = T[lang];

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    const url = new URL(window.location.href);
    if (l === "fr") url.searchParams.delete("lang");
    else url.searchParams.set("lang", l);
    window.history.replaceState(null, "", url);
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("lang") === "en") setLang("en");
  }, [setLang]);

  useReveal();

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      <div id="top" className="page">
        <Background />
        <Header />
        <main>
          <Hero />
          <Stats />
          <About />
          <Services />
          <Skills />
          <Marquee />
          <Work />
          <Method />
          <Journey />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangContext.Provider>
  );
}

/* Fade + short rise for [data-reveal] blocks that start below the fold. */
function useReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.remove("reveal-pending");
          io.unobserve(e.target);
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add("reveal-pending", "reveal-anim");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

/* ── Drifting, breathing Kuba field + cursor glow that reveals it in red ── */
function Background() {
  const glowRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    let mx = window.innerWidth * 0.7, my = window.innerHeight * 0.35, raf = 0;
    const paint = () => {
      raf = 0;
      const r = document.documentElement.style;
      r.setProperty("--mx", `${mx}px`);
      r.setProperty("--my", `${my}px`);
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${mx - 360}px,${my - 360}px,0)`;
    };
    paint();
    if (isMobile || prefersReducedMotion()) return;
    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-breathe">
        <div className="bg-drift">
          <KubaBackground stroke={C.raph} opacity={PATTERN_OPACITY} rupture={C.ochre} erase />
        </div>
      </div>
      <div className="bg-reveal">
        <div className="bg-drift">
          <KubaBackground stroke={C.red} opacity={Math.min(1, PATTERN_OPACITY * 7)} rupture={C.ember} erase={false} />
        </div>
      </div>
      <div
        ref={glowRef}
        className="bg-glow"
        style={{ background: `radial-gradient(closest-side, rgba(194,65,45,${GLOW_OPACITY}), rgba(194,65,45,0))` }}
      />
      <div className="bg-grain" />
    </div>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Langue / Language">
      {(["fr", "en"] as const).map((code) => (
        <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)} lang={code}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Header() {
  const { t } = useLang();
  const [menu, setMenu] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setMenu(false);
    burgerRef.current?.focus();
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-in">
          <a href="#top" aria-label="Josué Kristo" className="brand">
            <Logo />
            <span className="brand-name">Josué Kristo</span>
          </a>
          <nav aria-label="Navigation" className="nav">
            <div className="nav-links">
              {t.nav.map((label, i) => (
                <a key={NAV_IDS[i]} href={`#${NAV_IDS[i]}`}>
                  {label}
                </a>
              ))}
            </div>
          </nav>
          <LangToggle />
          <a href="#contact" className="header-cta">
            {t.cta}
          </a>
          <button ref={burgerRef} type="button" className="burger" onClick={() => setMenu(true)} aria-label="Menu" aria-expanded={menu} aria-controls="mobile-menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {menu && <MobileMenu onClose={close} onNavigate={() => setMenu(false)} />}
    </>
  );
}

function MobileMenu({ onClose, onNavigate }: { onClose: () => void; onNavigate: () => void }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !ref.current) return;
      // Keep focus inside the dialog.
      const f = ref.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div ref={ref} id="mobile-menu" className="menu" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="menu-fill" aria-hidden="true"><CardFill /></div>
      <div className="menu-glow" aria-hidden="true" />
      <div className="menu-top">
        <a href="#top" onClick={onNavigate} aria-label="Josué Kristo" className="brand">
          <Logo />
          <span className="brand-name">Josué Kristo</span>
        </a>
        <button ref={closeRef} type="button" className="menu-close" onClick={onClose} aria-label={t.close}>
          ×
        </button>
      </div>
      <div className="menu-lang">
        <span className="menu-lang-label">{t.langLabel}</span>
        <LangToggle />
      </div>
      <nav aria-label="Menu" className="menu-nav">
        {t.nav.map((label, i) => (
          <a key={NAV_IDS[i]} href={`#${NAV_IDS[i]}`} onClick={onNavigate}>
            <span className="n">0{i + 1}</span>
            <span className="l">{label}</span>
            <span className="a" aria-hidden="true">→</span>
          </a>
        ))}
      </nav>
      <div className="menu-foot">
        <a href="#contact" onClick={onNavigate} className="btn btn-primary">
          {t.cta}
          <span aria-hidden="true">→</span>
        </a>
        <a href={`mailto:${EMAIL}`} className="mail">{EMAIL}</a>
      </div>
      <div className="menu-band" aria-hidden="true"><Band color={C.ochre} rupture /></div>
    </div>
  );
}
