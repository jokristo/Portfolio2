"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CATS, CERTS, EDU, FILTERS, NAV_IDS, PROJECTS, SERVICES, SKILLS, SME, STEPS, TIMELINE, TITLE, type Cat, type Project } from "@/content/data";
import { pick } from "@/content/copy";
import { CV_PATH, EMAIL, GITHUB_HANDLE, GITHUB_URL, LINKEDIN_URL } from "@/content/profile";
import { Band, BandVertical, BrandIcon, C, CardFill, ColumnBase, ColumnRed, Corners, Ecg, LinkedInIcon, Lock, MailIcon, SERVICE_ICONS, WovenFrame } from "./kuba";
import { useIsMobile, useLang } from "./lang";
import { submitContact } from "@/lib/contact";

function SectionHead({ id, title, lede }: { id?: string; title: string; lede?: string }) {
  return (
    <header className="section-head">
      <h2 id={id} className="h2">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

/** Role or context in bold, then organisation and year on a secondary line. */
export function Meta({ meta }: { meta: Project["meta"] }) {
  const { lang } = useLang();
  const primary = meta.role ?? meta.context;
  const secondary = [meta.org, meta.year].filter(Boolean);
  return (
    <div className="meta">
      {primary && <strong>{pick(primary, lang)}</strong>}
      {secondary.length > 0 && (
        <span className="meta-sub">
          {secondary.map((s) => <span key={s}>{s}</span>)}
        </span>
      )}
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */
export function Hero() {
  const { t } = useLang();
  return (
    <section aria-label="Intro" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <h1>
            Josué
            <br />
            Kristo
          </h1>
          <p className="hero-title">{TITLE}</p>
          <p className="pitch">{t.pitch}</p>
          <div className="row">
            <a href="#work" className="btn btn-primary">{t.btnWork}</a>
            <a href={CV_PATH} className="btn btn-ghost">{t.btnCv}</a>
          </div>
          <div className="socials">
            <a href={GITHUB_URL} target="_blank" rel="noopener" aria-label="GitHub" className="icon-btn"><BrandIcon slug="github" size={18} color={C.raph} /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener" aria-label="LinkedIn" className="icon-btn"><LinkedInIcon /></a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="icon-btn"><MailIcon /></a>
          </div>
        </div>

        <div className="portrait">
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/portrait.webp" alt="Portrait de Josué Kristo" width={933} height={1120} />
          </div>
          <div className="portrait-frame" aria-hidden="true"><WovenFrame /></div>
        </div>
      </div>
    </section>
  );
}

/* ── About: prose on the left, a plain fact list on the right ────────── */
export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="about">
      <div data-reveal className="wrap about-grid">
        <div>
          <SectionHead title={t.aboutT} />
          <div className="about-p">
            {t.aboutP.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
        <dl className="facts">
          {t.infoK.map((k, i) => (
            <div key={k} className="fact">
              <dt>{k}</dt>
              <dd>{i === 1 ? <a href={`mailto:${EMAIL}`}>{t.infoV[i]}</a> : t.infoV[i]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── Services: a ruled 2×2 list, then the SME band ──────────────────── */
export function Services() {
  const { t, lang } = useLang();
  return (
    <section id="services" className="services">
      <div className="wrap">
        <div data-reveal>
          <SectionHead title={t.servT} />
        </div>
        <div data-reveal className="svc-block">
          <h3 className="svc-group">{t.forCompanies}</h3>
          <ul className="svc-list">
            {SERVICES.map((sv, i) => (
              <li key={i} className="svc">
                <span className="svc-icon" aria-hidden="true">{SERVICE_ICONS[i]}</span>
                <div>
                  <h4>{pick(sv.t, lang)}</h4>
                  <p>{pick(sv.d, lang)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="sme">
          <div className="sme-glow" aria-hidden="true" />
          <div className="sme-fill" aria-hidden="true"><CardFill /></div>
          <div className="sme-grid">
            <div className="sme-text">
              <span className="eyebrow">{t.smeK}</span>
              <h3>{t.smeT}</h3>
              <p className="sme-p">{t.smeP}</p>
              <ul className="sme-offers">
                {SME.map((o, i) => (
                  <li key={i} className="sme-offer">
                    <span aria-hidden="true" className="d" />
                    <div>
                      <div className="t">{pick(o.t, lang)}</div>
                      <div className="s">{pick(o.d, lang)}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="sme-for">{t.smeFor}</p>
              <a href="#contact" className="btn btn-primary">{t.smeCta}</a>
            </div>
            <figure className="chat">
              <div aria-hidden="true" className="chat-body">
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
              </div>
              <figcaption className="caption">{t.chatNote}</figcaption>
            </figure>
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
          <SectionHead title={t.skillsT} />
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
                <span className="tab-count">{c.i.length}</span>
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
        <span className="caption">{t.accessLevels}</span>
        {["100%", "84%", "66%", "50%", "34%"].map((w, i) => (
          <div key={i} className="vis-level">
            <span className="l">N{i + 1}</span>
            <span className="b" style={{ width: w, background: i === 1 ? C.red : C.surf }} />
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
        <div className="vis-node"><span className="vis-box">Arduino</span><span className="label">{t.sensors}</span></div>
        <div className="vis-wire"><span /></div>
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
      </div>
      <span className="vis-to" />
      <div className="vis-fields">
        {t.cvFields.map((k, i) => (
          <div key={k} className="vis-field">
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
        {p.conf && <span className="conf-pill"><Lock />{t.conf}</span>}
      </div>
      <div className="proj-body">
        <div className="proj-cat">{pick(CATS[p.cat], lang)}</div>
        <h3>{pick(p.title, lang)}</h3>
        <Meta meta={p.meta} />
        <p className="proj-desc">{pick(p.desc, lang)}</p>
        <div className="tags">
          {p.tags.map((tg, i) => <span key={i} className="tag">{pick(tg, lang)}</span>)}
        </div>
        {big ? (
          <div className="proj-actions">
            <a href="#" className="btn-sm">{t.caseBtn}</a>
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener" className="btn-sm quiet">
                <BrandIcon slug="github" size={16} color={C.raph} />
                {t.codeBtn}
              </a>
            )}
          </div>
        ) : (
          <a href="#" className="link-case">{t.caseBtn}</a>
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
          <SectionHead title={t.workT} />
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

/* ── Method: a sequence joined by the woven band ─────────────────────── */
export function Method() {
  const { t, lang } = useLang();
  return (
    <section aria-labelledby="method-t" className="method">
      <div data-reveal className="wrap">
        <SectionHead id="method-t" title={t.methodT} />
        <div className="method-body">
          <div aria-hidden="true" className="method-band h"><Band color={C.dim} /></div>
          <div aria-hidden="true" className="method-band v"><BandVertical color={C.dim} /></div>
          <ol className="steps">
            {STEPS.map(([ti, de], i) => (
              <li key={i} className="step">
                <span className="step-node" aria-hidden="true" />
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
          <SectionHead title={t.journeyT} />
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
                  <div className="meta-sub"><span>{j.org}</span><span>{pick(j.place, lang)}</span></div>
                </li>
              ))}
            </ol>
          </div>
          <div data-reveal className="side">
            <div>
              <h3>{t.certT}</h3>
              <ul>
                {CERTS.map(([n, y]) => (
                  <li key={n} className="cert"><span>{n}</span><span className="y">{y}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{t.eduT}</h3>
              <ul>
                {EDU.map(([n, org, years], i) => (
                  <li key={i}><div className="edu-n">{pick(n, lang)}</div><div className="meta-sub"><span>{org}</span><span>{years}</span></div></li>
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
          <h2>{t.contactT}</h2>
          <p className="contact-p">{t.contactP}</p>
          <a href={`mailto:${EMAIL}`} className="contact-mail">{EMAIL}</a>
          <dl className="contact-list">
            <div><dt>{t.infoLoc}</dt><dd>Nairobi, Kenya</dd></div>
            <div><dt>GitHub</dt><dd><a href={GITHUB_URL} target="_blank" rel="noopener">{GITHUB_HANDLE}</a></dd></div>
            <div><dt>LinkedIn</dt><dd><a href={LINKEDIN_URL} target="_blank" rel="noopener">Josué Kristo</a></dd></div>
          </dl>
          <p className="small">{t.refs}</p>
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
              <button type="submit" className="btn btn-primary" disabled={busy}>{t.send}</button>
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
        <a href="#top" className="brand"><span className="brand-name">Josué Kristo</span></a>
        <nav aria-label={t.quickLinks}>
          {t.nav.map((label, i) => <a key={NAV_IDS[i]} href={`#${NAV_IDS[i]}`}>{label}</a>)}
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
