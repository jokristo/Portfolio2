"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CASE_PROJECTS, CATS, CERTS, EDU, OTHER_GROUPS, OTHER_PROJECTS, SERVICES, SKILLS, SME, STEPS, TIMELINE, TITLE, type Meta as MetaT } from "@/content/data";
import { pick } from "@/content/copy";
import { CV_PATH, EMAIL, SOCIAL_LINKS } from "@/content/profile";
import { ArrowUpRight, Download, Lock } from "lucide-react";
import { Band, BandVertical, C, CardFill, ColumnBase, ColumnRed, Corners, WovenFrame } from "./kuba";
import { SERVICE_ICONS, STEP_ICONS, SkillGlyph, SocialIcon, UiIcon } from "./icons";
import { useHref, useIsMobile, useLang } from "./lang";
import { ProjectVisual } from "./visuals";
import { submitContact } from "@/lib/contact";

export function SectionHead({ id, title, lede }: { id?: string; title: string; lede?: string }) {
  return (
    <header className="section-head">
      <h2 id={id} className="h2">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

/** Role or context in bold, then organisation and year on a secondary line. */
export function Meta({ meta }: { meta: MetaT }) {
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
export function Hero({ cvAvailable }: { cvAvailable: boolean }) {
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
            {cvAvailable && <a href={CV_PATH} className="btn btn-ghost" download><UiIcon icon={Download} />{t.btnCv}</a>}
          </div>
          <div className="socials">
            {SOCIAL_LINKS.map((l) => (
              <a key={l.id} href={l.href} aria-label={l.label} className="icon-btn" {...(l.external ? { target: "_blank", rel: "noopener" } : {})}>
                <SocialIcon id={l.id} />
              </a>
            ))}
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
                <span className="svc-icon"><UiIcon icon={SERVICE_ICONS[i]} /></span>
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
                  <SkillGlyph icon={it.icon} />
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
export function Work() {
  const { t, lang } = useLang();
  const href = useHref();
  return (
    <section id="work" className="work">
      <div className="wrap">
        <div data-reveal>
          <SectionHead title={t.workT} />
        </div>
        <ol className="cases">
          {CASE_PROJECTS.map((p) => (
            <li key={p.slug} className="case-row">
              <a href={href(`/realisations/${p.slug}`)} className="case-media" tabIndex={-1} aria-hidden="true">
                <ProjectVisual kind={p.visual} />
                {p.confidential && <span className="conf-pill"><UiIcon icon={Lock} />{t.conf}</span>}
              </a>
              <div className="case-text">
                <span className="eyebrow">{pick(CATS[p.cat], lang)}</span>
                <h3><a href={href(`/realisations/${p.slug}`)}>{pick(p.title, lang)}</a></h3>
                <Meta meta={p.meta} />
                <p>{pick(p.summary, lang)}</p>
                <ul className="tags" aria-label={t.techLabel}>
                  {p.tags.map((tg, i) => <li key={i} className="tag">{pick(tg, lang)}</li>)}
                </ul>
                <div className="row">
                  <a href={href(`/realisations/${p.slug}`)} className="btn-sm">{t.caseBtn}</a>
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noopener" className="btn-sm quiet">
                      <SocialIcon id="github" />
                      {t.codeBtn}
                      <UiIcon icon={ArrowUpRight} className="ext" />
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal className="others">
          <h3 className="others-title">{t.othersT}</h3>
          <table className="others-table">
            <thead className="sr-only">
              <tr><th scope="col">{t.colProject}</th><th scope="col">{t.colContext}</th><th scope="col">{t.colYear}</th><th scope="col">{t.colTech}</th></tr>
            </thead>
            {OTHER_GROUPS.map((cat) => (
              <tbody key={cat}>
                <tr className="others-group"><th colSpan={4} scope="colgroup">{pick(CATS[cat], lang)}</th></tr>
                {OTHER_PROJECTS.filter((p) => p.cat === cat).map((p) => (
                  <tr key={p.id}>
                    <th scope="row">
                      <span className="o-title">{pick(p.title, lang)}</span>
                      {p.note && <span className="o-note">{pick(p.note, lang)}</span>}
                    </th>
                    <td className="o-context">{p.context && pick(p.context, lang)}</td>
                    <td className="o-year">{p.year}</td>
                    <td className="o-tech">{p.tech.map((x) => pick(x, lang)).join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
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
                <span className="step-node"><UiIcon icon={STEP_ICONS[i]} /></span>
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
            {SOCIAL_LINKS.filter((l) => l.id !== "email").map((l) => (
              <div key={l.id}><dt>{l.label}</dt><dd><a href={l.href} target="_blank" rel="noopener" className="ext-link"><SocialIcon id={l.id} size={16} />{l.handle}<UiIcon icon={ArrowUpRight} className="ext" /></a></dd></div>
            ))}
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
