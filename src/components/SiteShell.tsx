"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { NAV_IDS } from "@/content/data";
import { EMAIL } from "@/content/profile";
import { LangProvider, prefersReducedMotion, useHref, useIsMobile, useLang } from "./lang";
import { Band, C, CardFill, KubaBackground } from "./kuba";
import { GITHUB_URL, LINKEDIN_URL } from "@/content/profile";

const GLOW_OPACITY = 0.22;
const PATTERN_OPACITY = 0.05;

/** Background, header, footer and language context shared by every page. */
export function SiteShell({ home = false, children }: { home?: boolean; children: ReactNode }) {
  useReveal();
  return (
    <LangProvider>
      <div id="top" className="page">
        <Background />
        <Header home={home} />
        {children}
        <Footer home={home} />
      </div>
    </LangProvider>
  );
}

/** Section links: plain anchors on the home page, "/#id" (keeping ?lang) elsewhere. */
function useSectionHref(home: boolean) {
  const href = useHref();
  return (id: string) => (home ? `#${id}` : `${href("/")}#${id}`);
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

function Header({ home }: { home: boolean }) {
  const { t } = useLang();
  const sectionHref = useSectionHref(home);
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
          <a href={home ? "#top" : sectionHref("top")} className="brand">
            <span className="brand-name">Josué Kristo</span>
          </a>
          <nav aria-label="Navigation" className="nav">
            <div className="nav-links">
              {t.nav.map((label, i) => (
                <a key={NAV_IDS[i]} href={sectionHref(NAV_IDS[i])}>
                  {label}
                </a>
              ))}
            </div>
          </nav>
          <LangToggle />
          <a href={sectionHref("contact")} className="header-cta">
            {t.cta}
          </a>
          <button ref={burgerRef} type="button" className="burger" onClick={() => setMenu(true)} aria-label="Menu" aria-expanded={menu} aria-controls="mobile-menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {menu && <MobileMenu home={home} onClose={close} onNavigate={() => setMenu(false)} />}
    </>
  );
}

function MobileMenu({ home, onClose, onNavigate }: { home: boolean; onClose: () => void; onNavigate: () => void }) {
  const { t } = useLang();
  const sectionHref = useSectionHref(home);
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
        <a href={sectionHref("top")} onClick={onNavigate} className="brand">
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
          <a key={NAV_IDS[i]} href={sectionHref(NAV_IDS[i])} onClick={onNavigate}>
            <span className="l">{label}</span>
          </a>
        ))}
      </nav>
      <div className="menu-foot">
        <a href={sectionHref("contact")} onClick={onNavigate} className="btn btn-primary">
          {t.cta}
        </a>
        <a href={`mailto:${EMAIL}`} className="mail">{EMAIL}</a>
      </div>
      <div className="menu-band" aria-hidden="true"><Band color={C.ochre} rupture /></div>
    </div>
  );
}

function Footer({ home }: { home: boolean }) {
  const { t } = useLang();
  const sectionHref = useSectionHref(home);
  return (
    <footer className="footer">
      <div className="footer-in">
        <a href={sectionHref("top")} className="brand"><span className="brand-name">Josué Kristo</span></a>
        <nav aria-label={t.quickLinks}>
          {t.nav.map((label, i) => <a key={NAV_IDS[i]} href={sectionHref(NAV_IDS[i])}>{label}</a>)}
        </nav>
        <div className="footer-social">
          <a href={GITHUB_URL} target="_blank" rel="noopener">GitHub</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener">LinkedIn</a>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <span>© 2026 Josué Kristo</span>
        </div>
      </div>
      <div aria-hidden="true" className="footer-band"><Band color={C.ochre} rupture /></div>
    </footer>
  );
}
