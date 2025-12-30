"use client";

import React from "react";
import Image from "next/image"; // Import ajouté
import { motion } from "framer-motion";
import { profile, skills } from "@/types/data";
import { ArrowRight, Mail, Github, Linkedin, Sparkles, Zap, Cpu } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-gray-100 overflow-hidden">
      
      {/* --- ÉLÉMENTS DE DÉCOR D'ARRIÈRE-PLAN --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
      <div className="absolute inset-0 border-x border-white/[0.03] max-w-7xl mx-auto pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 backdrop-blur-sm">
            <Sparkles size={14} />
            <span>Disponible pour de nouveaux projets</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            JOSUE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400">
              KRISTO.
            </span>
          </h1>
          
          <p className="max-w-md text-xl text-gray-400 font-light leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all">
              <Mail size={18} />
              Travaillons ensemble
            </button>
          </div>
        </motion.div>

        {/* ÉLÉMENT VISUEL AVEC TON IMAGE INTÉGRÉE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden lg:flex justify-center items-center"
        >
          {/* Cercles décoratifs animés derrière l'image */}
          <div className="absolute w-[110%] h-[110%] border border-white/5 rounded-full animate-[spin_40s_linear_infinite]" />
          <div className="absolute w-[95%] h-[95%] border border-purple-500/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />

          {/* Conteneur principal de l'image */}
          <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-b from-gray-900 to-transparent shadow-2xl">
            <Image
              src="/josue.jpg" 
              alt="Josué Kristo - Dev & IA"
              fill
              className="object-cover object-top hover:scale-105 transition-transform duration-700"
              priority
            />
            
            {/* Dégradé pour fondre l'image dans le noir de la page */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          </div>

          {/* Badge flottant interactif */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-1/4 p-5 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Cpu className="text-purple-400" size={24} />
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Spécialité</p>
                    <p className="text-sm font-semibold text-white text-nowrap">Ingénierie IA</p>
                </div>
            </div>
          </motion.div>

          {/* Deuxième petit badge à gauche */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-8 bottom-1/4 p-5 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-20"
          >
             <Zap className="text-yellow-500" size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
      <section className="relative z-10 border-t border-white/5 bg-white/[0.01] py-24">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight">Expertises & Solutions</h2>
                    <p className="text-gray-500 mt-2">Du concept au déploiement, je gère l'intégralité de la chaîne.</p>
                </div>
                <div className="hidden md:block text-[10rem] font-black text-white/[0.02] absolute right-0 top-0 leading-none select-none">
                    SKILLS
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skills.map((skill, idx) => (
                    <motion.div
                        whileHover={{ y: -5 }}
                        key={idx}
                        className={`p-8 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md ${idx === 0 ? 'md:col-span-2' : ''}`}
                    >
                        <skill.icon className="mb-6 opacity-80" size={40} />
                        <h3 className="text-2xl font-bold mb-3">{skill.title}</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">{skill.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {skill.tags.slice(0, 4).map(tag => (
                                <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>
    </main>
  );
}