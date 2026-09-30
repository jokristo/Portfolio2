import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import {
  SiArduino, SiCss, SiDart, SiDjango, SiFastapi, SiFigma, SiFlutter, SiGit, SiGithub, SiGithubactions, SiHtml5, SiJavascript,
  SiNextdotjs, SiObsstudio, SiPostgresql, SiPostman, SiPython, SiReact, SiRender, SiTypescript,
} from "react-icons/si";
import {
  Activity, Aperture, Bug, AudioLines, BadgeCheck, Braces, BrainCircuit, Briefcase, ChartScatter, CircuitBoard, Clapperboard,
  ClipboardList, CloudUpload, CodeXml, Cpu, Database, Image, IterationCw, KeyRound, Languages, LayoutDashboard, LayoutGrid,
  LockKeyhole, MessageSquareText, Network, Package, Plug, Radar, Repeat, ShieldCheck, ChartGantt, Sparkles, Tags,
  ChartLine, Layers, MessagesSquare, Route,
  type LucideIcon,
} from "lucide-react";

/** Every interface icon uses the same size and stroke. */
export const UI_ICON = { size: 20, strokeWidth: 1.5 } as const;

export function UiIcon({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return <Icon aria-hidden="true" focusable="false" className={className} {...UI_ICON} />;
}

/**
 * Technology logos (Simple Icons via react-icons). `hover` is the official
 * brand colour, or undefined when it would be unreadable on the dark
 * background (contrast below 3:1), in which case the logo stays light.
 */
export const BRANDS = {
  python: { icon: SiPython, hover: "#3776AB" },
  javascript: { icon: SiJavascript, hover: "#F7DF1E" },
  typescript: { icon: SiTypescript, hover: "#3178C6" },
  dart: { icon: SiDart, hover: "#0175C2" },
  html5: { icon: SiHtml5, hover: "#E34F26" },
  css: { icon: SiCss, hover: undefined },
  django: { icon: SiDjango, hover: undefined },
  fastapi: { icon: SiFastapi, hover: "#009688" },
  postgresql: { icon: SiPostgresql, hover: "#4169E1" },
  nextdotjs: { icon: SiNextdotjs, hover: undefined },
  react: { icon: SiReact, hover: "#61DAFB" },
  flutter: { icon: SiFlutter, hover: undefined },
  arduino: { icon: SiArduino, hover: "#00878F" },
  git: { icon: SiGit, hover: "#F03C2E" },
  github: { icon: SiGithub, hover: undefined },
  render: { icon: SiRender, hover: undefined },
  githubactions: { icon: SiGithubactions, hover: "#2088FF" },
  postman: { icon: SiPostman, hover: "#FF6C37" },
  figma: { icon: SiFigma, hover: "#F24E1E" },
  obsstudio: { icon: SiObsstudio, hover: undefined },
} satisfies Record<string, { icon: IconType; hover: string | undefined }>;

export type BrandKey = keyof typeof BRANDS;

/** Plain pictograms for skills that have no official logo (or whose logo was withdrawn from Simple Icons). */
export const CONCEPTS = {
  database: Database, api: Braces, auth: KeyRound, sensors: Activity, dashboard: LayoutDashboard, circuit: CircuitBoard, chip: Cpu,
  ai: BrainCircuit, genai: Sparkles, ml: ChartScatter, nlp: Languages, ner: Tags, audio: AudioLines, plug: Plug, prompt: MessageSquareText,
  cloud: CloudUpload, shield: ShieldCheck, bug: Bug, lock: LockKeyhole, radar: Radar, badge: BadgeCheck, agile: Repeat, scrum: IterationCw,
  product: Package, gantt: ChartGantt, architecture: Network, requirements: ClipboardList, editor: CodeXml, suite: LayoutGrid,
  workspace: Briefcase, photo: Image, lens: Aperture, video: Clapperboard,
} satisfies Record<string, LucideIcon>;

export type ConceptKey = keyof typeof CONCEPTS;
export type SkillIcon = { brand: BrandKey } | { concept: ConceptKey };

export function BrandLogo({ brand, size }: { brand: BrandKey; size: number }) {
  const { icon: Icon, hover } = BRANDS[brand];
  return (
    <span className="brand-logo" style={hover ? ({ "--brand": hover } as CSSProperties) : undefined}>
      <Icon aria-hidden="true" focusable="false" size={size} />
    </span>
  );
}

export function SkillGlyph({ icon }: { icon: SkillIcon }) {
  if ("brand" in icon) return <BrandLogo brand={icon.brand} size={26} />;
  const Icon = CONCEPTS[icon.concept];
  return <span className="concept-icon"><Icon aria-hidden="true" focusable="false" size={24} strokeWidth={UI_ICON.strokeWidth} /></span>;
}

/** Social networks (Font Awesome 6). */
export const SOCIAL_ICONS: Record<"github" | "linkedin" | "email", IconType> = { github: FaGithub, linkedin: FaLinkedin, email: FaEnvelope };

export function SocialIcon({ id, size = 18 }: { id: keyof typeof SOCIAL_ICONS; size?: number }) {
  const Icon = SOCIAL_ICONS[id];
  return <Icon aria-hidden="true" focusable="false" size={size} />;
}

/** Pictograms for the four company services and the five method steps, in order. */
export const SERVICE_ICONS: LucideIcon[] = [Layers, ChartGantt, BrainCircuit, ShieldCheck];
export const STEP_ICONS: LucideIcon[] = [MessagesSquare, Network, Route, Package, ChartLine];
