# Josué Kristo — Portfolio

Personal portfolio for Josué Kristo, Senior Product Engineer & Technical Project Manager. Bilingual (FR by default, EN via the header toggle or `?lang=en`). Built with Next.js (App Router, static export) and implemented from the Claude Design handoff in `project/` (see `project/HANDOFF.md` and `chats/`).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm run lint     # type-check
```

## Structure

- `src/lib/content.ts`: all copy (FR/EN), projects, skills, timeline. Edit content here.
- `src/components/kuba.tsx`: the Kuba motif (background field, woven portrait frame, bands, corners, logo).
- `src/components/sections.tsx`: page sections. `Portfolio.tsx` holds the shell (background, header, mobile menu).
- `src/app/globals.css`: design tokens, layout, hover/focus states, breakpoints and animations. Everything is disabled under `prefers-reduced-motion`.
- `src/lib/icons.ts`: technology logos, inlined from `simple-icons` (CC0), so the page loads nothing from a CDN.
- `public/portrait.webp`: the portrait, taken from the design's image slot.

## Still to wire up

- `LINKEDIN` and `CV_URL` in `src/lib/content.ts` are placeholders (`#`).
- The "Voir l'étude de cas" buttons link to `#` until the case-study pages (`project/Etude de cas.dc.html`) are built.
- The CV-extraction project's "Code source" button points to the GitHub profile; set the exact repository in `PROJECTS`.
- Contact form: set `NEXT_PUBLIC_CONTACT_ENDPOINT` (e.g. a Formspree URL accepting JSON) to receive messages. Without it, the form opens the visitor's mail client with the message pre-filled.
