"use client";

import { C, CardFill, Ecg } from "./kuba";
import { useLang } from "./lang";

/* Illustrative project visuals (never screenshots): drawn with the palette and the Kuba tile. */
export function HrVisual() {
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

export function MedVisual() {
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

export function CvVisual() {
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

export function ProjectVisual({ kind }: { kind: "hr" | "med" | "cv" }) {
  return (
    <div className="proj-visual" aria-hidden="true">
      <CardFill />
      {kind === "hr" && <HrVisual />}
      {kind === "med" && <MedVisual />}
      {kind === "cv" && <CvVisual />}
    </div>
  );
}
