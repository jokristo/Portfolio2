# Josué Kristo — Portfolio

Personal portfolio for Josué Kristo, Senior Product Engineer & Technical Project Manager. Live at https://kristo.vercel.app. Bilingual (FR by default, EN via the header toggle or `?lang=en`). Next.js App Router, exported as a static site. The original Claude Design handoff is in `project/` (see `project/HANDOFF.md` and `chats/`).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000 (case-study TODO notes are visible here)
npm run lint     # ESLint (next/core-web-vitals + TypeScript) and tsc
npm run build    # static site in out/, then the dead-link check
```

`npm run build` fails if any page links to `#`, an empty or `undefined` URL, an anchor with no matching id, or an internal path that is not in the export (`scripts/check-links.mjs`).

## Where things live

- `src/content/profile.ts`: email, GitHub, LinkedIn, CV path. An empty value hides every link that uses it.
- `public/cv/Josue-Kristo-CV.pdf`: the downloadable CV. Replace the file to update it; if it is removed, the download button disappears at the next build.
- `src/content/copy.ts`: interface text, FR and EN.
- `src/content/data.ts`: services, skills (with their icon), the three case-study projects, other projects, method, timeline, certifications.
- `src/content/case-studies.ts`: case-study pages. Missing facts are `todo` fields.
- `src/components/SiteShell.tsx`: background, header, mobile menu, footer (shared by every page).
- `src/components/sections.tsx`: home page sections. `CaseStudyPage.tsx`: `/realisations/[slug]`.
- `src/components/icons.tsx`: Simple Icons and Font Awesome 6 (react-icons), Lucide for interface icons.
- `src/components/kuba.tsx`: the Kuba motif (background field, woven portrait frame, bands, corners).
- `src/app/globals.css`: colour, spacing and type tokens, layout, states, breakpoints (700px and 1080px).

## To complete

- **Case studies:** fill the `todo` fields in `src/content/case-studies.ts`.
- **Repositories:** set `repoUrl` for MedGuard and the CV extraction project in `src/content/data.ts` if the code is public.
- **Other projects:** missing years (AI and personal projects) and technologies in `OTHER_PROJECTS`.
- **Contact form:** set `NEXT_PUBLIC_CONTACT_ENDPOINT` (a Formspree URL, or any endpoint accepting JSON) to receive messages directly. Without it, the form opens the visitor's email app with the message pre-filled.
