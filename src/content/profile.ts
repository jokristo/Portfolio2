// Public profile links. Leave a value empty ("") to hide every link that uses it.
export const EMAIL: string = "josuekristo5@gmail.com";
export const GITHUB_URL: string = "https://github.com/jokristo";
export const GITHUB_HANDLE: string = "@jokristo";
export const LINKEDIN_URL: string = "https://www.linkedin.com/in/josue-kristo/";
// The download button is shown only while this file exists in public/ (checked at build time).
export const CV_PATH: string = "/cv/Josue-Kristo-CV.pdf";

export type SocialLink = { id: "github" | "linkedin" | "email"; label: string; handle: string; href: string; external: boolean };

/** Social links in display order; entries with an empty URL are left out everywhere. */
export const SOCIAL_LINKS: SocialLink[] = (
  [
    { id: "github", label: "GitHub", handle: GITHUB_HANDLE, href: GITHUB_URL, external: true },
    { id: "linkedin", label: "LinkedIn", handle: "Josué Kristo", href: LINKEDIN_URL, external: true },
    { id: "email", label: "Email", handle: EMAIL, href: EMAIL && `mailto:${EMAIL}`, external: false },
  ] satisfies SocialLink[]
).filter((l) => l.href.trim() !== "");
