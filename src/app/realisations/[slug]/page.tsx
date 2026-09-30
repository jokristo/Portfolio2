import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/CaseStudyPage";
import { CASE_PROJECTS } from "@/content/data";
import { pick } from "@/content/copy";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = CASE_PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${pick(p.title, "fr")}, étude de cas | Josué Kristo`,
    description: pick(p.summary, "fr"),
    alternates: { languages: { fr: `/realisations/${slug}`, en: `/realisations/${slug}?lang=en` } },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!CASE_PROJECTS.some((p) => p.slug === slug)) notFound();
  return <CaseStudyPage slug={slug} />;
}
