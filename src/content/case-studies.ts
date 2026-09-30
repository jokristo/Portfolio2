import { b, type Bi } from "./copy";
import type { CaseProject } from "./data";

/**
 * Case-study pages. Only facts Josué has provided are written here.
 * Anything missing is a `todo`: it is listed in the code and shown as a
 * dashed note in development (`npm run dev`), never on the live site.
 */
export type CaseSection = {
  title: Bi;
  paragraphs?: Bi[];
  steps?: { title: Bi; text?: Bi }[];
  todo?: string;
};

export type CaseStudy = {
  slug: CaseProject["slug"];
  duration?: Bi;
  illustrativeNote?: boolean;
  sections: CaseSection[];
  outcome?: { value: string; unit: Bi; label: Bi; before?: { value: string; unit: Bi; label: Bi }; ratio?: number };
  todo?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "talent-pro-hr",
    duration: b("5 mois", "5 months"),
    illustrativeNote: true,
    sections: [
      {
        title: b("Contexte", "Context"),
        paragraphs: [
          b(
            "Talent Pro HR est une application RH développée chez Walumo. La version précédente avait demandé 3 ans de développement.",
            "Talent Pro HR is an HR application built at Walumo. The previous version had taken 3 years of development.",
          ),
        ],
        todo: "What the application does, who uses it (HR teams, candidates, managers?), and why the rebuild was decided.",
      },
      {
        title: b("Le problème de départ", "The starting problem"),
        paragraphs: [
          b(
            "Il fallait reconstruire l'architecture de zéro, avec 5 niveaux de droits d'accès et des utilisateurs dans plusieurs pays.",
            "The architecture had to be rebuilt from scratch, with 5 levels of access rights and users in several countries.",
          ),
        ],
        todo: "What was wrong with the previous architecture, and what the 5 access levels are (roles and what each can do).",
      },
      {
        title: b("Approche", "Approach"),
        steps: [
          { title: b("Conception de l'architecture", "Architecture design"), text: b("Une architecture conçue de zéro autour des 5 niveaux de droits d'accès.", "An architecture designed from scratch around the 5 levels of access rights.") },
          { title: b("Analyse du chemin critique", "Critical path analysis"), text: b("Pour identifier les dépendances qui fixaient le délai et garantir la date de livraison.", "To identify the dependencies that set the deadline and secure the delivery date.") },
          { title: b("Micro-sprints Agile", "Agile micro-sprints"), text: b("Des cycles courts pour livrer et valider par petits incréments.", "Short cycles to ship and validate in small increments.") },
          { title: b("Collaboration avec le Senior Product Manager", "Working with the Senior Product Manager"), text: b("Une collaboration étroite sur les priorités tout au long du projet.", "Close collaboration on priorities throughout the project.") },
        ],
        todo: "Team size, sprint length, and one concrete example of a decision made with the Senior PM.",
      },
      {
        title: b("Choix techniques", "Technical choices"),
        paragraphs: [b("Frontend en Next.js.", "Next.js frontend.")],
        todo: "Backend, database, authentication and permission model, hosting, and why each was chosen.",
      },
      {
        title: b("Un problème résolu", "A problem solved"),
        paragraphs: [
          b(
            "J'ai corrigé le flux d'hydratation de l'ATS (le module de suivi des candidatures) pour les utilisateurs internationaux.",
            "I fixed the hydration flow of the ATS (the applicant tracking module) for international users.",
          ),
        ],
        todo: "The symptom users saw, the root cause, and the fix.",
      },
    ],
    outcome: {
      value: "5", unit: b("mois", "months"), label: b("pour livrer la nouvelle version", "to ship the new version"),
      before: { value: "3", unit: b("ans", "years"), label: b("pour la version précédente", "for the previous version") },
      ratio: 5 / 36,
    },
    todo: "Other results after launch (adoption, performance, support tickets), if you can share them.",
  },
  {
    slug: "medguard",
    sections: [
      {
        title: b("Contexte", "Context"),
        paragraphs: [
          b(
            "MedGuard est un projet académique réalisé pendant mon master en conception des systèmes d'information à l'UPN Kinshasa, en 2025.",
            "MedGuard is an academic project from my master's in Information Systems Design at UPN Kinshasa, in 2025.",
          ),
        ],
        todo: "The medical need behind it and who the bracelet is for (patients at home, elderly people, hospital?).",
      },
      {
        title: b("Objectif", "Goal"),
        paragraphs: [
          b(
            "Surveiller des paramètres médicaux avec un bracelet intelligent et rendre les données lisibles sur un tableau de bord.",
            "Monitor medical parameters with a smart bracelet and make the data readable on a dashboard.",
          ),
        ],
        todo: "Which parameters exactly (heart rate, SpO₂, temperature?) and any alert thresholds.",
      },
      {
        title: b("Architecture", "Architecture"),
        steps: [
          { title: b("Bracelet", "Bracelet"), text: b("Porté par la personne suivie.", "Worn by the person being monitored.") },
          { title: b("Capteurs", "Sensors"), text: b("Mesurent les paramètres médicaux.", "Measure the medical parameters.") },
          { title: b("Arduino", "Arduino"), text: b("Lit les capteurs et transmet les données.", "Reads the sensors and sends the data.") },
          { title: b("ThingsBoard", "ThingsBoard"), text: b("Tableau de bord qui visualise les données.", "Dashboard that displays the data.") },
        ],
        todo: "Sensor models, the Arduino board, and how data reaches ThingsBoard (Wi-Fi module, MQTT, HTTP?).",
      },
      {
        title: b("Prototypage", "Prototyping"),
        paragraphs: [
          b(
            "Le circuit a été prototypé avec Wokwi et Proteus avant l'assemblage.",
            "The circuit was prototyped in Wokwi and Proteus before assembly.",
          ),
        ],
        todo: "What each tool was used for, and whether a physical prototype was built.",
      },
      {
        title: b("Résultats du prototype", "Prototype results"),
        todo: "What worked, what the tests showed, the grade or feedback, and the limits you would address next.",
      },
    ],
  },
  {
    slug: "extraction-cv",
    sections: [
      {
        title: b("Contexte", "Context"),
        todo: "Why this project exists (personal, academic, for a company?), the year, and the kind of CVs it handles (PDF, Word, languages).",
      },
      {
        title: b("Ce que fait l'outil", "What the tool does"),
        paragraphs: [
          b(
            "Il analyse des CV et en extrait des informations structurées : identité, expériences, compétences et formation.",
            "It analyses CVs and extracts structured information: identity, experience, skills and education.",
          ),
        ],
      },
      {
        title: b("Choix techniques", "Technical choices"),
        todo: "Libraries and models used (spaCy, transformers, an LLM API?), how documents are parsed, and the output format.",
      },
      {
        title: b("Résultats", "Results"),
        todo: "Accuracy or evaluation method, dataset size, and known limits.",
      },
    ],
  },
];

export const caseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);

export const CASE_UI = {
  fr: {
    back: "Réalisations",
    role: "Rôle",
    context: "Contexte",
    org: "Organisation",
    year: "Année",
    duration: "Durée",
    tech: "Technologies",
    illustrative: "Les visuels sont illustratifs.",
    next: "Projet suivant",
    outcome: "Résultat",
    todo: "À compléter",
  },
  en: {
    back: "Work",
    role: "Role",
    context: "Context",
    org: "Organisation",
    year: "Year",
    duration: "Duration",
    tech: "Technologies",
    illustrative: "Visuals are illustrative.",
    next: "Next project",
    outcome: "Outcome",
    todo: "To complete",
  },
};

