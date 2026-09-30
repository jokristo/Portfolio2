"use client";

import { SiteShell } from "./SiteShell";
import { About, Contact, Hero, Journey, Method, Services, Skills, Work } from "./sections";

export default function Portfolio({ cvAvailable }: { cvAvailable: boolean }) {
  return (
    <SiteShell home>
      <main>
        <Hero cvAvailable={cvAvailable} />
        <About />
        <Services />
        <Skills />
        <Work />
        <Method />
        <Journey />
        <Contact />
      </main>
    </SiteShell>
  );
}
