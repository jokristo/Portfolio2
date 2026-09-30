import type { IconSlug } from "@/lib/icons";
import { b, type Bi, type Text } from "./copy";
import { GITHUB_URL } from "./profile";


export const NAV_IDS = ["about", "services", "skills", "work", "journey", "contact"];

export const TITLE = "Senior Product Engineer & Technical Project Manager";

export const SERVICES = [
  { t: b("Product engineering", "Product engineering"), d: b("Architectures robustes, droits d'accès complexes, performance.", "Robust architectures, complex access rights, performance.") },
  { t: b("Pilotage de projets IT", "IT project leadership"), d: b("Agile, Scrum, micro-sprints, chemin critique.", "Agile, Scrum, micro-sprints, critical path.") },
  { t: b("Intégration IA", "AI integration"), d: b("Modèles et API d'IA intégrés dans des applications métier.", "AI models and APIs built into business applications.") },
  { t: b("Architecture sécurisée", "Secure architecture"), d: b("Sécurité applicative et des systèmes d'information.", "Application and information-systems security.") },
];

export const SME = [
  { t: b("Assistant WhatsApp IA sur mesure", "Custom AI WhatsApp assistant"), d: b("Réponses aux questions fréquentes, prise de commandes et de rendez-vous.", "Answers common questions, takes orders and books appointments.") },
  { t: b("Automatisation IA", "AI automation"), d: b("Traitement de documents, extraction de données, transcription.", "Document processing, data extraction, transcription.") },
];

type Skill = { n: Text; s?: IconSlug };
const SK = (n: Text, s?: IconSlug): Skill => ({ n, s });

export const SKILLS: { c: Bi; i: Skill[] }[] = [
  { c: b("Programmation", "Programming"), i: [SK("Python", "python"), SK("JavaScript", "javascript"), SK("TypeScript", "typescript"), SK("Dart", "dart"), SK("SQL"), SK("HTML", "html5"), SK("CSS", "css")] },
  { c: b("Backend", "Backend"), i: [SK("Django", "django"), SK("FastAPI", "fastapi"), SK("REST APIs"), SK("PostgreSQL", "postgresql"), SK(b("Authentification & autorisation", "Authentication & authorization"))] },
  { c: b("Frontend", "Frontend"), i: [SK("Next.js", "nextdotjs"), SK("React", "react"), SK("HTML5", "html5"), SK("CSS3", "css"), SK("JavaScript", "javascript"), SK("TypeScript", "typescript")] },
  { c: b("Mobile", "Mobile"), i: [SK("Flutter", "flutter"), SK("Dart", "dart"), SK("React Native", "react")] },
  { c: b("IoT & systèmes embarqués", "IoT & embedded systems"), i: [SK("Arduino", "arduino"), SK(b("Capteurs", "Sensors")), SK("ThingsBoard"), SK("Wokwi"), SK("Proteus")] },
  {
    c: b("IA & automatisation", "AI & automation"),
    i: [SK(b("Intelligence artificielle", "Artificial intelligence")), SK(b("IA générative", "Generative AI")), SK("Machine Learning"), SK("NLP"), SK("NER"), SK("Whisper / WhisperX"), SK(b("Intégration d'API d'IA", "AI API integration")), SK("Prompt Engineering")],
  },
  { c: b("Cloud & DevOps", "Cloud & DevOps"), i: [SK("Git", "git"), SK("GitHub", "github"), SK("Render", "render"), SK("CI/CD", "githubactions"), SK(b("Déploiement cloud", "Cloud deployment"))] },
  {
    c: b("Sécurité", "Security"),
    i: [SK(b("Sécurité des systèmes d'information", "Information-systems security")), SK(b("Sécurité applicative", "Application security")), SK(b("Architecture sécurisée", "Secure architecture")), SK("Cyber Threat Intelligence"), SK("ISO 27001")],
  },
  {
    c: b("Produit & gestion de projet", "Product & project management"),
    i: [SK("Agile"), SK("Scrum"), SK(b("Développement produit", "Product development")), SK(b("Gestion de projet technique", "Technical project management")), SK(b("Architecture logicielle", "Software architecture")), SK(b("Analyse des besoins", "Requirements analysis"))],
  },
  {
    c: b("Outils", "Tools"),
    i: [SK("VS Code"), SK("Postman", "postman"), SK("Microsoft 365"), SK("Google Workspace"), SK("Figma", "figma"), SK("Adobe Photoshop"), SK("Adobe Lightroom"), SK("Adobe Premiere Pro"), SK("OBS Studio", "obsstudio")],
  },
];

export type Cat = "ent" | "ai" | "iot" | "perso";
export const CATS: Record<Cat, Bi> = {
  ent: b("En entreprise", "Company work"),
  ai: b("IA & Machine Learning", "AI & Machine Learning"),
  iot: b("IoT & HealthTech", "IoT & HealthTech"),
  perso: b("Produits personnels", "Personal products"),
};
export const FILTERS: [Cat | "all", Bi][] = [["all", b("Tout", "All")], ["ent", CATS.ent], ["ai", CATS.ai], ["iot", CATS.iot], ["perso", CATS.perso]];

export type Project = {
  id: string;
  featured?: boolean;
  cat: Cat;
  visual?: "hr" | "med" | "cv";
  conf?: boolean;
  code?: string;
  title: Text;
  meta: { role?: Text; context?: Text; org?: string; year?: string };
  desc: Text;
  tags: Text[];
  v?: Text[];
};

const PW = b("Plateforme web", "Web platform");

export const PROJECTS: Project[] = [
  {
    id: "hr", featured: true, cat: "ent", visual: "hr", conf: true,
    title: b("Refonte de Talent Pro HR", "Talent Pro HR rebuild"), meta: { role: "Lead Product Engineer", org: "Walumo", year: "2026" },
    desc: b("J'ai reconstruit l'architecture de zéro, avec 5 niveaux de droits d'accès. L'application a été livrée en 5 mois, contre 3 ans pour la version précédente.", "I rebuilt the architecture from scratch, with 5 levels of access rights. The application shipped in 5 months, against 3 years for the previous version."),
    tags: ["Architecture", "Next.js", "Agile"],
  },
  {
    id: "med", featured: true, cat: "iot", visual: "med", title: "MedGuard",
    meta: { context: b("Projet académique, Master en conception des systèmes d'information", "Academic project, Master's in Information Systems Design"), org: "UPN Kinshasa", year: "2025" },
    desc: b(
      "Prototype de bracelet intelligent : des capteurs reliés à un Arduino surveillent des paramètres médicaux, puis les données sont transmises et visualisées sur un tableau de bord ThingsBoard. Prototypé avec Wokwi et Proteus.",
      "A smart-bracelet prototype: sensors wired to an Arduino monitor medical parameters, then stream the data to a ThingsBoard dashboard. Prototyped in Wokwi and Proteus.",
    ),
    tags: ["Arduino", b("Capteurs", "Sensors"), "ThingsBoard", "Wokwi", "Proteus"],
  },
  {
    // TODO: point to the exact repository once confirmed.
    id: "cv", featured: true, cat: "ai", visual: "cv", code: GITHUB_URL,
    title: b("Extraction d'informations depuis des CV", "Information extraction from CVs"), meta: { context: b("Projet IA", "AI project") },
    desc: b("Analyse automatique de CV pour en extraire des informations structurées : identité, expériences, compétences, formation.", "Automatic CV analysis that extracts structured information: identity, experience, skills and education."),
    tags: ["NLP", "Machine Learning", b("Traitement de documents", "Document processing")],
  },
  {
    id: "ner", cat: "ai", title: b("Reconnaissance d'entités nommées", "Named-entity recognition"), meta: { context: b("Projet IA", "AI project") },
    desc: b("Extraction automatique d’entités (noms, organisations, lieux, dates, compétences) dans des textes, appliquée aux données de candidats et aux documents professionnels.", "Automatic extraction of entities (names, organisations, places, dates, skills) from candidate data and business documents."),
    tags: ["NER", "NLP"], v: [b("Personne", "Person"), b("Organisation", "Organisation"), b("Lieu", "Place")],
  },
  {
    id: "rec", cat: "ai", title: b("Système de recommandation de candidats", "Candidate recommendation system"), meta: { context: b("Projet IA", "AI project") },
    desc: b("Mise en correspondance de profils de candidats et d'opportunités grâce à des techniques d'IA et de NLP.", "Matches candidate profiles with opportunities using AI and NLP techniques."),
    tags: ["NLP", b("Systèmes de recommandation", "Recommender systems")], v: [b("Profil", "Profile"), "NLP", b("Opportunité", "Opportunity")],
  },
  {
    id: "stt", cat: "ai", title: b("Transcription automatique de la parole", "Automatic speech transcription"), meta: { context: b("Projet IA", "AI project") },
    desc: b("Transcription de fichiers audio en texte avec Whisper et WhisperX, puis génération de texte à partir des transcriptions.", "Transcribes audio files with Whisper and WhisperX, then generates text from the transcripts."),
    tags: ["Whisper", "WhisperX", "Speech-to-Text"], v: ["Audio", "Whisper", b("Texte", "Text")],
  },
  {
    id: "maxit", cat: "ent", conf: true, title: "Maxit", meta: { org: "Orange RDC", year: "2024" },
    desc: b("Contribution majeure à l'ingénierie frontend.", "Major contribution to frontend engineering."), tags: ["Frontend"], v: ["UI", b("Composants", "Components"), "Frontend"],
  },
  {
    id: "odc", cat: "ent", conf: true, title: b("Plateforme de gestion de l'Orange Digital Center", "Orange Digital Center management platform"), meta: { org: "Orange RDC", year: "2024" },
    desc: b("Plateforme de gestion de l'Orange Digital Center.", "Management platform for the Orange Digital Center."), tags: [PW], v: [b("Plateforme", "Platform"), b("Gestion", "Management")],
  },
  {
    id: "veh", cat: "ent", conf: true, title: b("Réquisition numérique de véhicules", "Digital vehicle requisition"), meta: { org: "Orange RDC", year: "2024" },
    desc: b("Système numérique de réquisition de véhicules.", "A digital system for requisitioning vehicles."), tags: [PW], v: [b("Demande", "Request"), b("Véhicule", "Vehicle")],
  },
  {
    id: "snel", cat: "ent", conf: true, title: b("Enregistrement clients & gestion des scellés", "Customer onboarding & seal management"), meta: { org: "SNEL", year: "2023" },
    desc: b("Logiciel d'enregistrement des nouveaux clients et système de gestion des scellés.", "New-customer registration software and a seal management system."),
    tags: [b("Logiciel métier", "Business software")], v: ["Client", b("Enregistrement", "Registration"), b("Scellés", "Seals")],
  },
  {
    id: "itm", cat: "ent", conf: true, title: b("Intégrations IA & automatisations Power Platform", "AI integrations & Power Platform automation"), meta: { org: "ITM Holding", year: "2025–2026" },
    desc: b("Intégrations IA et automatisations de processus avec Power Platform.", "AI integrations and process automation with Power Platform."), tags: ["Power Platform", b("IA", "AI")], v: ["Power Platform", b("IA", "AI")],
  },
  {
    id: "serm", cat: "perso", title: b("Brochures de sermons par IA", "AI sermon booklets"), meta: { context: b("En phase de test", "In testing") },
    desc: b("Transcrit une prédication, la résume et génère une brochure imprimable.", "Transcribes a sermon, summarises it and generates a print-ready booklet."),
    tags: [b("IA générative", "Generative AI"), "Transcription"], v: ["Audio", b("Résumé", "Summary"), "Brochure"],
  },
  {
    id: "school", cat: "perso", title: b("Logiciel de gestion scolaire", "School management software"), meta: { context: b("En conception", "In design") },
    desc: b("Pensé pour le marché congolais.", "Designed for the Congolese market."), tags: [b("Logiciel de gestion", "Management software")], v: [b("Élèves", "Students"), b("Classes", "Classes"), b("Gestion", "Admin")],
  },
  {
    id: "wmb", cat: "perso", title: b("Site du Tabernacle William Marrion Branham", "William Marrion Branham Tabernacle website"), meta: { context: "wmbranhamtabernacle.org" },
    desc: b("Site du tabernacle de Mont-Ngafula.", "Website for the Mont-Ngafula tabernacle."), tags: ["Web"], v: ["wmbranhamtabernacle.org"],
  },
  {
    id: "eaglet", cat: "perso", title: "Kristo Eaglet", meta: { context: b("Marque de vêtements", "Apparel brand") },
    desc: b("Marque de vêtements chrétiens en impression à la demande, boutique Shopify et contenus vidéo IA.", "A print-on-demand Christian apparel brand, with a Shopify store and AI video content."),
    tags: ["Shopify", b("Vidéo IA", "AI video")], v: ["Shopify", b("Impression", "Print"), b("Vidéo IA", "AI video")],
  },
];

export const STEPS: [Bi, Bi][] = [
  [b("Comprendre le besoin", "Understand the need"), b("Entretiens, contraintes et objectifs mesurables, avant toute proposition technique.", "Interviews, constraints and measurable goals, before any technical proposal.")],
  [b("Concevoir l'architecture", "Design the architecture"), b("Modèle de données, droits d'accès et intégrations, définis avant la première ligne de code.", "Data model, access rights and integrations, settled before the first line of code.")],
  [b("Planifier le chemin critique", "Plan the critical path"), b("J'identifie les dépendances qui fixent le délai et je les traite en premier.", "I identify the dependencies that set the deadline and handle them first.")],
  [b("Livrer en micro-sprints", "Ship in micro-sprints"), b("Des incréments courts et testables, montrés régulièrement aux utilisateurs.", "Short, testable increments, shown to users regularly.")],
  [b("Mesurer et améliorer", "Measure and improve"), b("Les retours des utilisateurs et les indicateurs orientent l'itération suivante.", "User feedback and metrics shape the next iteration.")],
];

export const TIMELINE: { period: Bi; current: boolean; role: Text; org: string; place: Text }[] = [
  { period: b("Mars 2026", "Mar 2026"), current: true, role: "Lead Product Engineer & Senior Software Engineer", org: "Walumo", place: "Nairobi" },
  { period: b("Mars 2025", "Mar 2025"), current: true, role: "Full-Stack Developer & AI Engineer", org: "ITM Holding", place: "Kinshasa" },
  { period: b("Sept. 2024 – janv. 2025", "Sep 2024 – Jan 2025"), current: false, role: "Web & Mobile Developer / Web Designer", org: "Illumination Metaverse", place: "Kinshasa" },
  { period: b("Févr. 2024 – sept. 2024", "Feb 2024 – Sep 2024"), current: false, role: "Full-Stack Developer", org: "Orange RDC", place: "Kinshasa" },
  { period: b("Févr. 2023 – juil. 2023", "Feb 2023 – Jul 2023"), current: false, role: "Full-Stack Developer", org: "SNEL", place: "Kinshasa" },
  { period: b("Depuis mars 2021", "Since Mar 2021"), current: false, role: b("Software Tester (QA web et mobile)", "Software Tester (web & mobile QA)"), org: "uTest", place: b("En ligne", "Remote") },
];

export const CERTS: [string, string][] = [
  ["Google AI Professional Certificate", "2026"],
  ["IT Project Management (IBM)", "2026"],
  ["Google Project Management", "2026"],
  ["Prompt Engineering with Generative AI", "2025"],
  ["Google UX Design", "2023"],
];

export const EDU: [Bi, string, string][] = [
  [b("Master en conception des systèmes d'information", "Master's in Information Systems Design"), "UPN Kinshasa", "2024–2025"],
  [b("Licence en mathématiques et informatique", "Bachelor's in Mathematics & Computer Science"), "UPN Kinshasa", "2020–2023"],
];
