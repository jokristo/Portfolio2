"use client";

import { CASE_PROJECTS, CATS } from "@/content/data";
import { CASE_UI, caseStudy, type CaseSection } from "@/content/case-studies";
import { pick } from "@/content/copy";
import { BandVertical, BrandIcon, C, Lock } from "./kuba";
import { useHref, useLang } from "./lang";
import { SiteShell } from "./SiteShell";
import { ProjectVisual } from "./visuals";

const DEV = process.env.NODE_ENV === "development";

/** Missing information: visible while developing, never on the live site. */
function Todo({ text }: { text?: string }) {
  if (!DEV || !text) return null;
  return <p className="todo"><strong>TODO</strong> {text}</p>;
}

export default function CaseStudyPage({ slug }: { slug: string }) {
  return (
    <SiteShell>
      <CaseStudy slug={slug} />
    </SiteShell>
  );
}

function CaseStudy({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const href = useHref();
  const ui = CASE_UI[lang];
  const idx = CASE_PROJECTS.findIndex((p) => p.slug === slug);
  const p = CASE_PROJECTS[idx];
  const cs = caseStudy(slug);
  if (!p || !cs) return null;
  const next = CASE_PROJECTS[(idx + 1) % CASE_PROJECTS.length];

  const facts: [string, string][] = [];
  if (p.meta.role) facts.push([ui.role, pick(p.meta.role, lang)]);
  if (p.meta.context) facts.push([ui.context, pick(p.meta.context, lang)]);
  if (p.meta.org) facts.push([ui.org, p.meta.org]);
  if (p.meta.year) facts.push([ui.year, p.meta.year]);
  if (cs.duration) facts.push([ui.duration, pick(cs.duration, lang)]);
  facts.push([ui.tech, p.tags.map((x) => pick(x, lang)).join(", ")]);

  return (
    <main className="cs">
      <div className="wrap">
        <a href={`${href("/")}#work`} className="cs-back">{ui.back}</a>

        <header className="cs-head">
          <span className="eyebrow">{pick(CATS[p.cat], lang)}</span>
          <h1>{pick(p.title, lang)}</h1>
          <p className="cs-summary">{pick(p.summary, lang)}</p>
          <div className="cs-badges">
            {p.confidential && <span className="conf-pill static"><Lock />{t.conf}</span>}
            {cs.illustrativeNote && <span className="small">{ui.illustrative}</span>}
            {p.repoUrl && (
              <a href={p.repoUrl} target="_blank" rel="noopener" className="btn-sm quiet">
                <BrandIcon slug="github" size={16} color={C.raph} />
                {t.codeBtn}
              </a>
            )}
          </div>
        </header>

        <dl className="cs-facts">
          {facts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>

        <figure className="cs-visual">
          <ProjectVisual kind={p.visual} />
        </figure>

        <div className="cs-body">
          {cs.sections.map((sec, i) => <Section key={i} sec={sec} />)}

          {cs.outcome && (
            <section className="cs-section">
              <h2>{ui.outcome}</h2>
              <div>
                <div className="outcome">
                  <div className="outcome-row">
                    <span className="outcome-n">{cs.outcome.value}<span>{pick(cs.outcome.unit, lang)}</span></span>
                    <span className="outcome-bar"><span style={{ width: `${(cs.outcome.ratio ?? 1) * 100}%` }} className="now" /></span>
                    <span className="outcome-l">{pick(cs.outcome.label, lang)}</span>
                  </div>
                  {cs.outcome.before && (
                    <div className="outcome-row before">
                      <span className="outcome-n">{cs.outcome.before.value}<span>{pick(cs.outcome.before.unit, lang)}</span></span>
                      <span className="outcome-bar"><span style={{ width: "100%" }} /></span>
                      <span className="outcome-l">{pick(cs.outcome.before.label, lang)}</span>
                    </div>
                  )}
                </div>
                <Todo text={cs.todo} />
              </div>
            </section>
          )}
          {!cs.outcome && <Todo text={cs.todo} />}
        </div>

        <nav className="cs-next" aria-label={ui.next}>
          <span className="small">{ui.next}</span>
          <a href={href(`/realisations/${next.slug}`)}>{pick(next.title, lang)}</a>
        </nav>
      </div>
    </main>
  );
}

function Section({ sec }: { sec: CaseSection }) {
  const { lang } = useLang();
  if (!sec.paragraphs && !sec.steps && !DEV) return null;
  return (
    <section className="cs-section">
      <h2>{pick(sec.title, lang)}</h2>
      <div>
        {sec.paragraphs?.map((para, i) => <p key={i}>{pick(para, lang)}</p>)}
        {sec.steps && (
          <div className="cs-steps-wrap">
            <div aria-hidden="true" className="cs-steps-band"><BandVertical color={C.dim} /></div>
            <ol className="cs-steps">
              {sec.steps.map((st, i) => (
                <li key={i}>
                  <span className="step-node" aria-hidden="true" />
                  <div>
                    <h3>{pick(st.title, lang)}</h3>
                    {st.text && <p>{pick(st.text, lang)}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
        <Todo text={sec.todo} />
      </div>
    </section>
  );
}

