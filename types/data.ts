// app/data.ts
import { Code2, Smartphone, Palette, Video, Bot, Terminal } from "lucide-react";

export const profile = {
  name: "Josué Kristo",
  role: "Fullstack Dev & AI Engineer",
  bio: "Je crée des solutions digitales complètes : sites web, applications mobiles, visuels impactants et automatisation intelligente pour aider les entreprises et entrepreneurs à gagner du temps.",
  cta: "Chaque projet que je crée est pensé pour résoudre un problème concret.",
};

export const skills = [
  {
    title: "Développement Web",
    icon: Code2,
    desc: "Apps performantes & sécurisées",
    tags: ["Next.js", "React", "Django", "Laravel", "PostgreSQL"],
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Mobile Dev",
    icon: Smartphone,
    desc: "iOS & Android natif ou cross-platform",
    tags: ["Flutter", "React Native", "Kivy", "Clean Arch"],
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Intelligence Artificielle",
    icon: Bot,
    desc: "Automatisation & Prédiction",
    tags: ["Python", "OpenAI API", "Whisper", "Data Analysis"],
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    desc: "Interfaces centrées utilisateur",
    tags: ["Figma", "Adobe XD", "Photoshop", "Prototypage"],
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    title: "Vidéo & Contenu",
    icon: Video,
    desc: "Storytelling visuel",
    tags: ["Premiere Pro", "DaVinci", "After Effects"],
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    title: "DevOps & Outils",
    icon: Terminal,
    desc: "Infrastructure & Gestion",
    tags: ["Docker", "Git", "Scrum", "SEO"],
    color: "bg-slate-500/10 text-slate-500",
  },
];