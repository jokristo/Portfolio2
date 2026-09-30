"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  CATS, CERTS, EDU, FILTERS, MARQUEE, NAV_IDS, PHRASES, PROJECTS, SERVICES, SKILLS, SME, SME_FOR,
  STAT_STARTS, STAT_TARGETS, STEPS, TIMELINE, type Cat, type Project,
} from "@/content/data";
import { pick } from "@/content/copy";
import { CV_PATH as CV_URL, EMAIL, GITHUB_URL as GITHUB, LINKEDIN_URL as LINKEDIN } from "@/content/profile";
import {
  Band, BandVertical, BrandIcon, C, CardFill, ColumnBase, ColumnRed, Corners, Ecg, LinkedInIcon, Lock, Logo, MailIcon, Mark,
  SERVICE_ICONS, WovenFrame,
} from "./kuba";
import { prefersReducedMotion as reduced, useIsMobile, useLang } from "./lang";
import { submitContact } from "@/lib/contact";

function Kicker({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="kicker">
      <Mark />
      <span>{n}</span>
      <span className="kicker-rule" />
      <span>{children}</span>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */
function useTypewriter() {
  const [text, setText] = useState(PHRASES[0]);
  useEffect(() => {
    if (reduced()) return;
    let i = 0, c = 0, del = false, tt: ReturnType<typeof setTimeout>;
    const step = () => {
      const p = PHRASES[i];
      if (!del) {
        c++;
        setText(p.slice(0, c));
        if (c === p.length) { del = true; tt = setTimeout(step, 2400); return; }
        tt = setTimeout(step, 36);
      } else {
        c--;
        setText(p.slice(0, c));
        if (c === 0) { del = false; i = (i + 1) % PHRASES.length; tt = setTimeout(step, 380); return; }
        tt = setTimeout(step, 16);
      }
    };
    tt = setTimeout(() => { setText(""); step(); }, 900);
    return () => clearTimeout(tt);
  }, []);
  return text;
}

const BADGES: { label: ReactNode; pos: React.CSSProperties; dur: number; delay: number; inDelay: number; extra?: boolean; accent?: boolean }[] = [
  { label: <><BrandIcon slug="nextdotjs" size={16} color={C.raph} />Next.js</>, pos: { top: "9%", left: "-2%" }, dur: 5.5, delay: 2.6, inDelay: 2 },
  { label: <><BrandIcon slug="python" size={16} color={C.raph} />Python</>, pos: { top: "22%", right: "-4%" }, dur: 6.5, delay: 2.8, inDelay: 2.15, extra: true },
  { label: "genai", pos: { top: "56%", right: "-8%" }, dur: 6, delay: 3, inDelay: 2.3, accent: true },
  { label: <><BrandIcon slug="fastapi" size={16} color={C.raph} />FastAPI</>, pos: { bottom: "18%", left: "-6%" }, dur: 7, delay: 2.7, inDelay: 2.45, extra: true },
  { label: <><BrandIcon slug="flutter" size={16} color={C.raph} />Flutter</>, pos: { bottom: "4%", right: "12%" }, dur: 5.8, delay: 2.9, inDelay: 2.6, extra: true },
];

export function Hero() {
  const { t } = useLang();
  const tw = useTypewriter();
  return (
    <section aria-label="Intro" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <div className="avail">
            <span className="avail-dot" aria-hidden="true"><span /><span /></span>
            {t.avail}
          </div>
          <h1>
            Josué
            <br />
            Kristo<span className="dot">.</span>
          </h1>
          <p className="typewriter">
            <span className="sr-only">{PHRASES[0]}</span>
            <span aria-hidden="true">{tw}</span>
            <span aria-hidden="true" className="caret" />
          </p>
          <p className="pitch">{t.pitch}</p>
          <div className="row">
            <a href="#work" className="btn btn-primary">
              {t.btnWork}
              <span aria-hidden="true">→</span>
            </a>
            <a href={CV_URL} className="btn btn-ghost">
              {t.btnCv}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="socials">
            <div className="icons">
              <a href={GITHUB} target="_blank" rel="noopener" aria-label="GitHub" className="icon-btn"><BrandIcon slug="github" size={18} color={C.raph} /></a>
              <a href={LINKEDIN} aria-label="LinkedIn" className="icon-btn"><LinkedInIcon /></a>
              <a href={`mailto:${EMAIL}`} aria-label="Email" className="icon-btn"><MailIcon /></a>
            </div>
            <span className="based">{t.based}</span>
          </div>
        </div>

        <div className="portrait">
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/portrait.webp" alt="Portrait de Josué Kristo" width={933} height={1120} />
          </div>
          <div className="portrait-frame" aria-hidden="true"><WovenFrame /></div>
          {BADGES.map((bd, i) => (
            <div key={i} aria-hidden="true" className={`badge-float${bd.extra ? " extra" : ""}${bd.accent ? " genai" : ""}`} style={{ ...bd.pos, animationDuration: `${bd.dur}s`, animationDelay: `${bd.delay}s` }}>
              <div className={`badge${bd.accent ? " accent" : ""}`} style={{ animationDelay: `${bd.inDelay}s` }}>
                {bd.label === "genai" ? <><span className="diamond" />{t.genai}</> : bd.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stats: count up once on first view ──────────────────────────────── */
export function Stats() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState(STAT_TARGETS);

  useEffect(() => {
    if (reduced() || !ref.current) return;
    const el = ref.current;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen: keep final values
    setCounts(STAT_STARTS);
    let raf = 0;
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now(), dur = 1500;
        const tick = (now: number) => {
          const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
          setCounts(STAT_TARGETS.map((tg, i) => Math.round(STAT_STARTS[i] + (tg - STAT_STARTS[i]) * e)));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={ref} aria-label={t.statsLabel} className="stats">
      <div className="wrap stats-grid">
        {t.stats.map((s, i) => (
          <div key={i} className="stat">
            <div className="stat-line">
              {"pre" in s && <span className="stat-pre">{s.pre}</span>}
              <span className="stat-n">{counts[i]}</span>
              {s.unit && <span className="stat-unit">{s.unit}</span>}
            </div>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── About ───────────────────────────────────────────────────────────── */
export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="about">
      <div data-reveal className="wrap about-grid">
        <div>
          <Kicker n="01">{t.nav[0]}</Kicker>
          <h2 className="h2">{t.aboutT}</h2>
          <p className="about-p">{t.aboutP}</p>
        </div>
        <div className="card info">
          <Corners which="all" />
          <dl>
            {t.infoK.map((k, i) => (
              <div key={k} className="info-row">
                <dt>{k}</dt>
                <dd>{i === 1 ? <a href={`mailto:${EMAIL}`}>{t.infoV[i]}</a> : t.infoV[i]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ── Services ────────────────────────────────────────────────────────── */
export function Services() {
  const { t, lang } = useLang();
  return (
    <section id="services" className="services">
      <div className="wrap">
        <div data-reveal>
          <Kicker n="02">{t.nav[1]}</Kicker>
          <h2 className="h2">{t.servT}</h2>
          <p className="lede">{t.forCompanies}</p>
        </div>
        <div data-reveal className="svc-grid">
          {SERVICES.map((sv, i) => (
            <article key={i} className="card svc">
              <Corners />
              <div className="svc-icon">{SERVICE_ICONS[i]}</div>
              <h3>{pick(sv.t, lang)}</h3>
              <p>{pick(sv.d, lang)}</p>
              <span aria-hidden="true" className="arrow">→</span>
            </article>
          ))}
        </div>

        <div data-reveal className="card sme">
          <div className="sme-glow" aria-hidden="true" />
          <div className="sme-fill" aria-hidden="true"><CardFill /></div>
          <div className="sme-grid">
            <div className="sme-text">
              <span className="sme-k">{t.smeK}</span>
              <h3>{t.smeT}</h3>
              <p className="sme-p">{t.smeP}</p>
              <div className="sme-offers">
                {SME.map((o, i) => (
                  <div key={i} className="sme-offer">
                    <span aria-hidden="true" className="d" />
                    <div>
                      <div className="t">{pick(o.t, lang)}</div>
                      <div className="s">{pick(o.d, lang)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sme-for">
                <span>{t.smeFor}</span>
                {SME_FOR.map((f, i) => <span key={i} className="chip">{pick(f, lang)}</span>)}
              </div>
              <a href="#contact" className="btn btn-primary">
                {t.smeCta}
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <div aria-hidden="true" className="chat">
              <div className="chat-head">
                <span className="chat-avatar" />
                <div>
                  <div className="chat-name">{t.chatName}</div>
                  <div className="chat-sub">{t.chatSub}</div>
                </div>
              </div>
              {t.chat.map((m, i) => (
                <div key={i} className={`bubble ${i % 2 ? "bot" : "me"}${i === 3 ? " last" : ""}`}>{m}</div>
              ))}
              <div className="chat-note">{t.chatNote}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Skills: vertical tabs (horizontal scroller on mobile) + tile grid ─ */
const monogram = (name: string) =>
  name.replace(/[^A-Za-z0-9À-ÿ ]/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || name.slice(0, 2);

export function Skills() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState(0);
  const isMobile = useIsMobile();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cat = SKILLS[tab];

  const onKey = (e: KeyboardEvent) => {
    const prev = isMobile ? "ArrowLeft" : "ArrowUp", next = isMobile ? "ArrowRight" : "ArrowDown";
    let i = tab;
    if (e.key === prev) i = (tab - 1 + SKILLS.length) % SKILLS.length;
    else if (e.key === next) i = (tab + 1) % SKILLS.length;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = SKILLS.length - 1;
    else return;
    e.preventDefault();
    setTab(i);
    tabRefs.current[i]?.focus();
  };

  return (
    <section id="skills" className="skills">
      <div className="wrap">
        <div data-reveal>
          <Kicker n="03">{t.nav[2]}</Kicker>
          <h2 className="h2">{t.skillsT}</h2>
        </div>
        <div data-reveal className="skills-body">
          <div role="tablist" aria-orientation={isMobile ? "horizontal" : "vertical"} aria-label={t.skillsT} className="tabs" onKeyDown={onKey}>
            {SKILLS.map((c, i) => (
              <button
                key={i}
                ref={(el) => { tabRefs.current[i] = el; }}
                id={`skill-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={tab === i}
                aria-controls="skill-panel"
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                className="tab"
              >
                <span>{pick(c.c, lang)}</span>
                <span className="tab-meta">
                  {String(c.i.length).padStart(2, "0")}
                  <span className="tab-dot" />
                </span>
              </button>
            ))}
          </div>
          <div role="tabpanel" id="skill-panel" aria-labelledby={`skill-tab-${tab}`} className="tiles">
            {cat.i.map((it) => {
              const name = pick(it.n, lang);
              return (
                <div key={name} className="tile">
                  <div className="tile-logo" aria-hidden="true">
                    {it.s ? <BrandIcon slug={it.s} size={28} color={C.raph} /> : <div className="tile-mono"><span>{monogram(name)}</span></div>}
                  </div>
                  <span className="tile-name">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Marquee: continuous, slows down on hover ────────────────────────── */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);
  useEffect(() => {
    if (reduced() || !ref.current?.animate) return;
    anim.current = ref.current.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], { duration: 45000, iterations: Infinity });
    return () => anim.current?.cancel();
  }, []);
  return (
    <div aria-hidden="true" className="marquee" onMouseEnter={() => anim.current?.updatePlaybackRate(0.25)} onMouseLeave={() => anim.current?.updatePlaybackRate(1)}>
      <div ref={ref} className="marquee-track">
        {MARQUEE.concat(MARQUEE).map(([name, slug], i) => (
          <div key={i} className="marquee-item">
            <BrandIcon slug={slug} size={22} color={C.mute} />
            <span className="name">{name}</span>
            <span className="sep" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Work ────────────────────────────────────────────────────────────── */
function HrVisual() {
  const { t } = useLang();
  return (
    <div aria-hidden="true" className="vis vis-hr">
      <div className="vis-panel">
        <span style={{ width: 26, height: 26, border: `1px solid ${C.ochre}`, transform: "rotate(45deg) scale(.7)" }} />
        {["80%", "60%", "70%", "50%", "65%"].map((w, i) => <span key={i} className={`vis-bar${i === 2 ? " red" : ""}`} style={{ width: w }} />)}
      </div>
      <div className="vis-levels">
        <span className="vis-caption">{t.accessLevels}</span>
        {["100%", "84%", "66%", "50%", "34%"].map((w, i) => (
          <div key={i} className="vis-level">
            <span className="l">N{i + 1}</span>
            <span className="b" style={{ width: w, background: i === 1 ? C.red : C.surf, animationDelay: `${0.1 + i * 0.1}s` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MedVisual() {
  const { t } = useLang();
  return (
    <div aria-hidden="true" className="vis vis-med">
      <div className="vis-chain">
        <div className="vis-node"><span className="vis-ring" /><span className="label">{t.bracelet}</span></div>
        <div className="vis-wire"><span /></div>
        <div className="vis-node"><span className="vis-box">MCU</span><span className="label">{t.sensors}</span></div>
        <div className="vis-wire"><span style={{ animationDelay: "1.2s" }} /></div>
        <div className="vis-node"><span className="vis-box vis-dash"><span /><span /><span /><span /></span><span className="label">ThingsBoard</span></div>
      </div>
      <div className="vis-vitals">
        <div className="vis-vitals-k"><span>{t.hr}</span><span>SpO₂</span><span>T°</span></div>
        <Ecg />
      </div>
    </div>
  );
}

function CvVisual() {
  const { t } = useLang();
  return (
    <div aria-hidden="true" className="vis vis-cv">
      <div className="vis-doc">
        <span style={{ height: 8, width: "55%", background: C.dim }} />
        <span style={{ width: "40%" }} />
        <span className="gap" style={{ width: "90%" }} /><span style={{ width: "80%" }} /><span style={{ width: "85%" }} />
        <span className="gap" style={{ width: "70%" }} /><span style={{ width: "88%" }} />
        <span className="gap" style={{ width: "60%" }} /><span style={{ width: "75%" }} />
        <span className="vis-scan" />
      </div>
      <span className="vis-to">→</span>
      <div className="vis-fields">
        {t.cvFields.map((k, i) => (
          <div key={k} className="vis-field" style={{ animationDelay: `${i * 0.35}s` }}>
            <div className="k">{k}</div>
            <div className="v" style={{ width: ["70%", "90%", "60%", "80%"][i] }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p, big }: { p: Project; big: boolean }) {
  const { t, lang } = useLang();
  const confPill = p.conf && (
    <span className="conf-pill"><Lock />{t.conf}</span>
  );
  return (
    <article className={`card proj ${big ? "big" : "small"}`}>
      <div className="proj-vis">
        <div className="proj-zoom" aria-hidden="true">
          <CardFill />
          {p.visual === "hr" && <HrVisual />}
          {p.visual === "med" && <MedVisual />}
          {p.visual === "cv" && <CvVisual />}
          {!big && (
            <div className="vis-flow">
              {(p.v ?? []).map((v, i) => (
                <div key={i}>
                  {i > 0 && <span className="w" />}
                  <span className="n">{pick(v, lang)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {confPill}
      </div>
      <div className="proj-body">
        <div className="proj-cat">{pick(CATS[p.cat], lang)}</div>
        <h3>{pick(p.title, lang)}</h3>
        <div className="proj-meta">{pick(p.meta, lang)}</div>
        <p className="proj-desc">{pick(p.desc, lang)}</p>
        <div className="tags">
          {p.tags.map((tg, i) => <span key={i} className="tag">{pick(tg, lang)}</span>)}
        </div>
        {big ? (
          <div className="proj-actions">
            {/* TODO: link to the case-study pages once they are built. */}
            <a href="#" className="btn-sm">
              {t.caseBtn}
              <span aria-hidden="true" className="proj-arrow">→</span>
            </a>
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener" className="btn-sm quiet">
                <BrandIcon slug="github" size={16} color={C.raph} />
                {t.codeBtn}
              </a>
            )}
          </div>
        ) : (
          <a href="#" className="link-case">
            {t.caseBtn}
            <span aria-hidden="true" className="proj-arrow">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function Work() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Cat | "all">("all");
  const visible = PROJECTS.filter((p) => filter === "all" || p.cat === filter);
  const featured = visible.filter((p) => p.featured), compact = visible.filter((p) => !p.featured);
  return (
    <section id="work" className="work">
      <div className="wrap">
        <div data-reveal className="work-head">
          <div>
            <Kicker n="04">{t.nav[3]}</Kicker>
            <h2 className="h2">{t.workT}</h2>
          </div>
          <div role="group" aria-label={t.filterLabel} className="filters">
            {FILTERS.map(([key, label]) => (
              <button key={key} type="button" className="filter" aria-pressed={filter === key} onClick={() => setFilter(key)}>
                {pick(label, lang)}
              </button>
            ))}
          </div>
        </div>
        {featured.length > 0 && (
          <div className="featured-grid">
            {featured.map((p) => <ProjectCard key={p.id} p={p} big />)}
          </div>
        )}
        <div className="compact-grid">
          {compact.map((p) => <ProjectCard key={p.id} p={p} big={false} />)}
        </div>
      </div>
    </section>
  );
}

/* ── Method ──────────────────────────────────────────────────────────── */
export function Method() {
  const { t, lang } = useLang();
  return (
    <section aria-labelledby="method-t" className="method">
      <div data-reveal className="wrap">
        <Kicker n="05">{t.methodK}</Kicker>
        <h2 id="method-t" className="h2">{t.methodT}</h2>
        <div className="method-body">
          <div aria-hidden="true" className="method-band h"><Band color={C.dim} /></div>
          <div aria-hidden="true" className="method-band v"><BandVertical color={C.dim} /></div>
          <ol className="steps">
            {STEPS.map(([ti, de], i) => (
              <li key={i} className="step">
                <span className="step-n"><span>0{i + 1}</span></span>
                <div className="step-text">
                  <h3>{pick(ti, lang)}</h3>
                  <p>{pick(de, lang)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── Journey: pattern column fills with red as you scroll ────────────── */
export function Journey() {
  const { t, lang } = useLang();
  const tlRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const tl = tlRef.current, f = fillRef.current;
      if (!tl || !f) return;
      const r = tl.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.62 - r.top) / r.height));
      f.style.clipPath = `inset(0 0 ${(100 - p * 100).toFixed(2)}% 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="journey" className="journey">
      <div className="wrap">
        <div data-reveal>
          <Kicker n="06">{t.nav[4]}</Kicker>
          <h2 className="h2">{t.journeyT}</h2>
        </div>
        <div className="journey-grid">
          <div ref={tlRef} className="timeline">
            <div aria-hidden="true" className="tl-col">
              <div><ColumnBase /></div>
              <div ref={fillRef} className="tl-fill"><ColumnRed /></div>
            </div>
            <ol>
              {TIMELINE.map((j, i) => (
                <li key={i} className="tl-item">
                  <span aria-hidden="true" className="tl-tick" />
                  <div className="tl-period">{j.current ? `${pick(j.period, lang)} – ${t.now}` : pick(j.period, lang)}</div>
                  <h3>{pick(j.role, lang)}</h3>
                  <div className="tl-org"><b>{j.org}</b><span> · {pick(j.place, lang)}</span></div>
                </li>
              ))}
            </ol>
          </div>
          <div data-reveal className="side">
            <div className="card">
              <Corners which="tl" />
              <h3>{t.certT}</h3>
              <ul>
                {CERTS.map(([n, y]) => (
                  <li key={n} className="cert"><span>{n}</span><span className="y">{y}</span></li>
                ))}
              </ul>
            </div>
            <div className="card">
              <Corners which="tl" />
              <h3>{t.eduT}</h3>
              <ul>
                {EDU.map(([n, s], i) => (
                  <li key={i}><div className="edu-n">{pick(n, lang)}</div><div className="edu-s">{s}</div></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ─────────────────────────────────────────────────────────── */
export function Contact() {
  const { t } = useLang();
  const [reqType, setReqType] = useState(0);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    await submitContact({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      type: t.types[reqType],
      message: String(fd.get("message") ?? ""),
    });
    setBusy(false);
    setSent(true);
  };

  return (
    <section id="contact" className="contact">
      <div data-reveal className="wrap contact-grid">
        <div className="contact-text">
          <Kicker n="07">Contact</Kicker>
          <h2>{t.contactT}</h2>
          <p className="contact-p">{t.contactP}</p>
          <a href={`mailto:${EMAIL}`} className="contact-mail">{EMAIL}</a>
          <div className="contact-list">
            <div><span className="k">{t.infoLoc}</span><span>Nairobi, Kenya</span></div>
            <a href={GITHUB} target="_blank" rel="noopener"><span className="k">GitHub</span><span>@jokristo ↗</span></a>
            <a href={LINKEDIN}><span className="k">LinkedIn</span><span>Josué Kristo ↗</span></a>
          </div>
          <span className="based">{t.refs}</span>
        </div>
        <div className="card form-card">
          <Corners />
          {sent ? (
            <div role="status" className="sent">
              <span className="d" />
              <h3>{t.sentT}</h3>
              <p>{t.sentP}</p>
              <button type="button" onClick={() => setSent(false)}>{t.again}</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="form">
              <div className="form-2">
                <label className="field">{t.fName}<input required name="name" autoComplete="name" /></label>
                <label className="field">Email<input required type="email" name="email" autoComplete="email" /></label>
              </div>
              <fieldset className="fs">
                <legend>{t.fType}</legend>
                <div className="row" style={{ gap: 8 }}>
                  {t.types.map((label, i) => (
                    <button key={label} type="button" className="req" aria-pressed={reqType === i} onClick={() => setReqType(i)}>{label}</button>
                  ))}
                </div>
              </fieldset>
              <label className="field">Message<textarea required name="message" rows={6} placeholder={t.fMsgPh} /></label>
              <button type="submit" className="btn btn-primary" disabled={busy}>
                {t.send}
                <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────── */
export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer-in">
        <a href="#top" aria-label="Josué Kristo" className="brand">
          <Logo />
          <span className="brand-name">Josué Kristo</span>
        </a>
        <nav aria-label={t.quickLinks}>
          {t.nav.map((label, i) => <a key={NAV_IDS[i]} href={`#${NAV_IDS[i]}`}>{label}</a>)}
        </nav>
        <div className="footer-social">
          <a href={GITHUB} target="_blank" rel="noopener">GitHub</a>
          <a href={LINKEDIN}>LinkedIn</a>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <span>© 2026 Josué Kristo</span>
        </div>
      </div>
      <div aria-hidden="true" className="footer-band"><Band color={C.ochre} rupture /></div>
    </footer>
  );
}
