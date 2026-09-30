# Refonte Talent Pro HR

_Started 2026-09-29 13:02 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Conçois le portfolio personnel de Josué KRISTO, Senior Product Engineer & Techni"
The project currently has no files except possibly dotfiles — a `list_files` on the project root would return nothing else.
Current date is now September 29, 2026
</system-info>

<default aesthetic_system_instructions>
The user has not attached a design system. If they have ALSO not attached references or art direction, and the project is empty (the auto-managed _ds/ folder doesn't count), ask your opening questions with the ask_user tool. Whenever you ask opening questions in this project, include a design-system question in the form: the user's pick there sets the visual direction, so do NOT also ask about the visual aesthetic (no questions about vibe, colors or palette directions (including color-swatch svg-options questions), typography, mood, or art direction). Spend your other questions on everything else: audience, purpose, content, structure, scope, interactions, tone of copy. Exception: if the request already states the visual direction as a brand or concrete art direction, leave the design-system question out of your own questions (the app may still add one — it's skippable, and a skip doesn't change the stated direction) — but if they name a design system that isn't attached, keep the question: their pick there is what attaches it.

If the design-system question comes back unanswered — skipped without a pick (a "Not sure" / decide-for-me answer counts as a pick: it applies the effective default) — and no references or other art direction arrived either, THEN ask the visual-aesthetic questions before designing: a follow-up round (or one focused question) about vibe, colors, type, and mood is the right move once the design-system ask went unanswered. Do NOT just pick your own. Once you have a direction, use this guidance when creating designs:
- Choose a type pairing from web-safe set or Google Fonts. Helvetica is a good choice. Avoid hard-to-read or overly stylized fonts. Use 1-3 fonts only.
- Foreground and background: choose a color tone (warm, cool, neutral, something in-between). Use subtly-toned whites and blacks; avoid saturations above 0.02 for whites.
- Accents: choose 0-2 additional accent colors using oklch. All accents should share same chroma and lightness; vary hue.
- NEVER write out an SVG yourself that's more complicated than a square, circle, diamond, etc.
- For imagery, never hand-draw SVGs; use subtly-striped SVG placeholders instead with monospace explainers for what should be dropped there (e.g. “product shot”)

CRITICAL: ignore default aesthetic entirely if given other aesthetic instructions like reference images, design systems or guidance, or if there are user-authored files in the project already (the auto-managed _ds/ folder is not user-authored).
</default aesthetic_system_instructions>

<pasted_text name="Pasted text (140 lines)">
Conçois le portfolio personnel de Josué KRISTO, Senior Product Engineer &amp; Technical Project Manager, basé à Nairobi, d'origine congolaise (RDC). Site bilingue FR / EN (français par défaut, sélecteur de langue dans l'en-tête). Page d'accueil longue, desktop 1440px d'abord. Le site doit paraître très professionnel ET vivant : fond sombre animé, éléments qui réagissent, sensation de produit haut de gamme.

## Objectif et publics
Deux publics à parts égales :
1. Recruteurs et entreprises : prouver un profil senior qui conçoit des architectures, pilote des livraisons et intègre l'IA.
2. PME francophones (RDC, Afrique francophone) : donner envie de lui confier la conception sur mesure d'assistants WhatsApp IA et d'automatisations IA.

## Direction artistique : « Le tissage Kuba, en noir et rouge »
Inspiration : les textiles Kuba du Kasaï (RDC), des motifs géométriques construits sur des règles strictes, avec des ruptures volontaires. Métaphore : un système rigoureux conçu par quelqu'un qui sait où dévier, c'est le métier de product engineer.
Résultat attendu : un site sombre, technique et haut de gamme, où l'identité africaine passe par la géométrie, les matières et les couleurs. Pas de folklore : pas de masques, pas de carte de l'Afrique, pas de clichés.

### Palette
- Noir charbon #0F0C0A : fond principal (noir légèrement chaud, pas #000)
- Charbon #1A1512 : surfaces, cartes
- Trait #2E2520 : bordures, séparateurs
- Rouge Tukula #C2412D : accent principal (boutons, liens, éléments actifs, lueurs)
- Rouge braise #E0573F : survol et états actifs
- Raphia #EADFC8 : texte principal
- Raphia atténué #A89A86 : texte secondaire
- Ocre #B98534 : détails du motif uniquement, jamais de texte
Le rouge reste un accent : environ 10 % de la surface, pas plus. Contraste AA partout.

### Typographie
- Titres : Bricolage Grotesque, graisses fortes. Le nom « Josué Kristo » en très grand dans le hero.
- Texte : Inter ou Source Sans 3, confortable, lignes de 70 caractères maximum.

### Le motif Kuba (élément signature)
Crée un motif géométrique original inspiré des tissages Kuba (losanges imbriqués, lignes brisées, entrelacs à angles droits), en SVG, avec une rupture volontaire dans la règle. Déclinaisons :
- un grand motif de fond très discret (opacité 4 à 6 %) sur tout le site ;
- un cadre en losange autour du portrait ;
- des coins de cartes et des repères de section ;
- la colonne de la timeline du parcours.

### Animations (le site doit être vivant, mais jamais agité)
1. Fond : le motif Kuba de fond dérive très lentement et respire, avec un grain léger de texture raphia. Une lueur rouge douce suit le curseur et révèle le motif plus nettement autour de lui.
2. Hero : au chargement, le cadre en losange du portrait se tisse ligne par ligne, puis des badges de technologies flottent doucement autour du portrait (Next.js, Python, FastAPI, Flutter, IA générative).
3. Bande de chiffres : les chiffres s'incrémentent une seule fois quand ils entrent dans l'écran.
4. Défilement continu (marquee) des logos de technologies entre deux sections, qui ralentit au survol.
5. Parcours : la colonne-motif de la timeline se remplit de rouge au fil du scroll.
6. Cartes de services et de projets : au survol, bordure qui s'allume en rouge, léger zoom sur le visuel, flèche qui glisse.
7. Transitions douces à l'apparition des sections (fondu et léger déplacement, courts et discrets).
Tout est désactivé si prefers-reduced-motion. Animations fluides, légères et performantes (transform et opacity).

## Structure et contenu (contenu réel : n'invente aucun chiffre, client, témoignage ou logo d'entreprise)

### 1. En-tête (fixe, fond flouté)
Logo « JK » dessiné avec le motif | À propos, Services, Compétences, Réalisations, Parcours, Contact | FR / EN | bouton « Parlons-en »

### 2. Hero (texte à gauche, portrait à droite)
- Petite pastille : point vert animé + « Disponible pour missions et collaborations »
- Nom : Josué Kristo
- Titre : Senior Product Engineer &amp; Technical Project Manager (effet machine à écrire alternant avec « AI Engineer » et « Full-Stack Developer »)
- Phrase : « Je conçois des architectures logicielles robustes, je pilote leur livraison et j'y intègre l'IA, là où elle résout un vrai problème. »
- Boutons : « Voir mes réalisations » (rouge, principal) et « Télécharger mon CV » (contour)
- Icônes : GitHub, LinkedIn, Email
- Portrait (placeholder, le portrait sera fourni) dans un cadre en losange tissé, avec les badges de technologies flottants

### 3. Bande de chiffres (uniquement ces chiffres réels)
- 5 mois : pour reconstruire Talent Pro HR (contre 3 ans pour la version précédente)
- 6 organisations : entreprises et plateformes où j'ai travaillé
- 5 certifications : Google AI, IBM, Google PM, Google UX, Prompt Engineering
- Depuis 2021 : dans le logiciel

### 4. À propos
Texte à gauche : Product engineer et chef de projet IT certifié Google AI. Je conçois des architectures complexes, je mène des refontes complètes de produits numériques et j'intègre l'IA dans des applications métier, avec une obsession : livrer vite sans sacrifier la solidité. Mon parcours va du web à l'IA, jusqu'à l'IoT appliqué à la santé.
Carte d'informations à droite : Nom, Email (josuekristo5@gmail.com), Localisation (Nairobi, Kenya · travail à distance), Langues (français, lingala, anglais), Disponibilité (missions et collaborations). AUCUN téléphone, AUCUNE situation familiale.

### 5. Services (deux groupes)
Pour les entreprises (4 cartes avec coins-motif et icônes) :
- Product engineering : architectures robustes, droits d'accès complexes, performance
- Pilotage de projets IT : Agile, Scrum, micro-sprints, chemin critique
- Intégration IA : modèles et API d'IA dans des applications métier
- Architecture sécurisée : sécurité applicative et des systèmes d'information
Pour les PME (bandeau distinct, fond Charbon avec lueur rouge) : « Des outils IA conçus pour votre entreprise », conception sur mesure (pas de produit tout fait), sans prix :
- Assistant WhatsApp IA sur mesure : réponses aux questions fréquentes, prise de commandes et de rendez-vous
- Automatisation IA : traitement de documents, extraction de données, transcription
Pour : cabinets, cliniques, agences immobilières et de voyage, écoles privées, PME et startups. Bouton : « Parlons de votre besoin »

### 6. Compétences et technologies
Onglets verticaux à gauche (une catégorie par onglet), grille de tuiles avec logo et nom à droite. Pas de barres ni de pourcentages de maîtrise.
- Programmation : Python, JavaScript, TypeScript, Dart, SQL, HTML, CSS
- Backend : Django, FastAPI, REST APIs, PostgreSQL, Authentification &amp; autorisation
- Frontend : Next.js, React, HTML5, CSS3, JavaScript, TypeScript
- Mobile : Flutter, Dart, React Native
- IoT &amp; systèmes embarqués : Arduino, capteurs, ThingsBoard, Wokwi, Proteus
- IA &amp; automatisation : Intelligence artificielle, IA générative, Machine Learning, NLP, NER, Whisper / WhisperX, intégration d'API d'IA, Prompt Engineering
- Cloud &amp; DevOps : Git, GitHub, Render, CI/CD, déploiement cloud
- Sécurité : Sécurité des systèmes d'information, sécurité applicative, architecture sécurisée, Cyber Threat Intelligence, ISO 27001
- Produit &amp; gestion de projet : Agile, Scrum, développement produit, gestion de projet technique, architecture logicielle, analyse des besoins
- Outils : VS Code, Postman, Microsoft 365, Google Workspace, Figma, Adobe Photoshop, Adobe Lightroom, Adobe Premiere Pro, OBS Studio
Sous la section : le marquee animé des logos.

### 7. Réalisations
Filtre : Tout / En entreprise / IA &amp; Machine Learning / IoT &amp; HealthTech / Produits personnels.
Cartes : visuel illustratif en haut (composition graphique sombre avec le motif et des interfaces ou schémas stylisés, JAMAIS de fausse capture réaliste ni de logo d'entreprise), puis titre, catégorie, courte description et tags de technologies. Les 3 projets vedettes sont en grand, les autres en cartes compactes. Bouton « Voir l'étude de cas ».
Les projets dont le code est public affichent aussi un bouton « Code source » avec l'icône GitHub. Les projets confidentiels affichent à la place une petite pastille cadenas « Confidentiel ». Les deux états doivent apparaître dans la maquette.

Projets vedettes :
1. Refonte de Talent Pro HR (En entreprise, Walumo, 2026). Lead Product Engineer. Architecture reconstruite de zéro, 5 niveaux de droits d'accès, livrée en 5 mois contre 3 ans. Pastille « Confidentiel », visuels illustratifs. Tags : Architecture, Next.js, Agile.
2. MedGuard (IoT &amp; HealthTech, projet académique, Master en conception des systèmes d'information, UPN Kinshasa, 2025). Prototype de bracelet intelligent qui surveille des paramètres médicaux grâce à des capteurs reliés à un Arduino, puis transmet et visualise les données sur un tableau de bord ThingsBoard. Prototypé avec Wokwi et Proteus. Visuel : schéma stylisé bracelet → capteurs → tableau de bord, avec des courbes de signaux vitaux animées. Tags : Arduino, capteurs, ThingsBoard, Wokwi, Proteus.
3. Extraction d'informations depuis des CV (IA &amp; Machine Learning). Analyse automatique de CV pour en extraire des informations structurées (identité, expériences, compétences, formation). Visuel : un document dont les zones de texte se transforment en champs structurés. Bouton « Code source ». Tags : NLP, Machine Learning, traitement de documents.

Autres projets :
4. Reconnaissance d'entités nommées (IA &amp; Machine Learning). Extraction automatique d'entités (noms, organisations, lieux, dates, compétences) dans des textes, appliquée aux données de candidats et aux documents professionnels. Tags : NER, NLP.
5. Système de recommandation de candidats (IA &amp; Machine Learning). Mise en correspondance de profils de candidats et d'opportunités grâce à des techniques d'IA et de NLP. Tags : NLP, systèmes de recommandation.
6. Transcription automatique de la parole (IA &amp; Machine Learning). Transcription de fichiers audio en texte avec Whisper et WhisperX, puis génération de texte à partir des transcriptions. Tags : Whisper, WhisperX, Speech-to-Text.
7. Maxit (En entreprise, Orange RDC, 2024). Contribution majeure à l'ingénierie frontend.
8. Plateforme de gestion de l'Orange Digital Center (En entreprise, Orange RDC, 2024).
9. Système numérique de réquisition de véhicules (En entreprise, Orange RDC, 2024).
10. Logiciel d'enregistrement des nouveaux clients et système de gestion des scellés (En entreprise, SNEL, 2023).
11. Intégrations IA et automatisations Power Platform (En entreprise, ITM Holding, 2025–2026).
12. Brochures de sermons par IA (Produits personnels, en phase de test). Transcrit une prédication, la résume et génère une brochure imprimable.
13. Logiciel de gestion scolaire pour le marché congolais (Produits personnels, en conception).
14. Site du Tabernacle William Marrion Branham de Mont-Ngafula (Produits personnels, wmbranhamtabernacle.org).
15. Kristo Eaglet (Produits personnels). Marque de vêtements chrétiens en impression à la demande, boutique Shopify et contenus vidéo IA.

### 8. Ma méthode (5 étapes reliées par une ligne-motif)
Comprendre le besoin → Concevoir l'architecture → Planifier (chemin critique) → Livrer en micro-sprints → Mesurer et améliorer

### 9. Parcours (timeline verticale, colonne-motif qui se remplit au scroll)
- Mars 2026 à aujourd'hui : Lead Product Engineer &amp; Senior Software Engineer, Walumo, Nairobi
- Mars 2025 à aujourd'hui : Full-Stack Developer &amp; AI Engineer, ITM Holding, Kinshasa
- Sept. 2024 à janv. 2025 : Web &amp; Mobile Developer / Web Designer, Illumination Metaverse, Kinshasa
- Févr. 2024 à sept. 2024 : Full-Stack Developer, Orange RDC, Kinshasa
- Févr. 2023 à juil. 2023 : Full-Stack Developer, SNEL, Kinshasa
- Depuis mars 2021 : Software Tester (QA web et mobile), uTest, en ligne
À côté : Certifications (Google AI Professional Certificate 2026, IT Project Management IBM 2026, Google Project Management 2026, Prompt Engineering with Generative AI 2025, Google UX Design 2023) et Formation (Master en conception des systèmes d'information, UPN Kinshasa, 2024–2025 ; Licence en mathématiques et informatique, UPN, 2020–2023).

### 10. Contact
Gauche : titre « Construisons quelque chose de solide », email josuekristo5@gmail.com, localisation Nairobi, liens GitHub (@jokristo) et LinkedIn, mention « Références disponibles sur demande ». AUCUN téléphone.
Droite : formulaire (Nom, Email, Type de demande : Recrutement / Projet pour mon entreprise / Autre, Message), bouton rouge « Envoyer le message ».

### 11. Pied de page
Logo JK, liens rapides, réseaux, © 2026 Josué Kristo, bande fine du motif Kuba en bas.

## Version anglaise
Montre aussi le hero en anglais, avec une traduction naturelle et non mot à mot.

## Qualité
Responsive, focus clavier visible, contraste AA, reduced-motion respecté. Pas de témoignages inventés, pas de chiffres inventés, pas de pourcentages de maîtrise. Le rendu final doit évoquer un produit tech haut de gamme avec une identité africaine assumée, pas un template de portfolio.
</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Design Components">
This project uses Design Components: every design is a single streaming `Name.dc.html` file. The full authoring spec is in your system prompt under "Writing code — Design Components" — follow it. Author and edit `.dc.html` content with the `dc_write`, `dc_html_str_replace`, `dc_js_str_replace`, and `dc_set_props` tools (not `write_file`; `str_replace_edit` works but won't stream); template edits stream into the live preview as you type.
</attached-skill>


<system-reminder>Auto-injected reminder (ignore if not relevant): do not recreate copyrighted or branded UI unless the user's email domain matches that company. Create original designs instead.</system-reminder>

## User

Found issues — fixing…

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

J'ai corrigé les trois points relevés par la vérification. Un nouveau contrôle tourne en arrière-plan.

- **Titres de section :** les petites étiquettes au-dessus des titres étaient vides. Elles affichent maintenant le nom de la section, dans la langue choisie.
- **Logos :** les logos des technologies (tuiles et bandeau défilant) ne provoquent plus d'erreur. Si un logo manque, ses initiales s'affichent dans un losange.
- **Hero :** le texte et le portrait restent côte à côte sur des écrans plus étroits, jusqu'à environ 900 px de large. En dessous, le portrait passe sous le texte.

## User

Utilise le système de design validé : fond Noir charbon, accent Rouge Tukula, motif Kuba animé en fond et lueur rouge qui suit le curseur.

En gardant exactement ce système (palette, typographies, motif, animations), conçois le gabarit d'une page « étude de cas », illustré avec le projet Refonte de Talent Pro HR.

Structure :
1. En-tête du projet : nom, entreprise (Walumo), année (2026), mon rôle (Lead Product Engineer), durée (5 mois), technologies. Pastille « Confidentiel » et mention « Les visuels sont illustratifs. »
2. Le contexte : une application RH dont la version précédente avait demandé 3 ans de développement.
3. Le défi : reconstruire l'architecture de zéro, avec 5 niveaux de droits d'accès et des utilisateurs internationaux.
4. Mon approche : conception de l'architecture, micro-sprints Agile, analyse du chemin critique, collaboration étroite avec le Senior Product Manager.
5. Un problème résolu : correction du flux d'hydratation de l'ATS pour les utilisateurs internationaux.
6. Le résultat : livraison en 5 mois.
7. Navigation vers le projet suivant.

Le motif relie visuellement les étapes de l'approche, qui forment une vraie séquence. Visuel illustratif uniquement : un schéma d'architecture stylisé des 5 niveaux d'accès, dessiné dans la palette, qui s'anime à l'entrée dans l'écran. N'invente aucun chiffre en plus de ceux fournis.

Montre aussi une variante du même gabarit pour MedGuard (projet académique, avec bouton « Code source » au lieu de la pastille « Confidentiel ») : contexte, objectif, architecture bracelet → capteurs → Arduino → ThingsBoard, prototypage avec Wokwi et Proteus, résultats du prototype.

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

J'ai créé le gabarit d'étude de cas, **Etude de cas.dc.html**, avec le même fond, la même palette, les mêmes polices et le même motif Kuba que le portfolio. Un contrôle automatique tourne encore en arrière-plan.

- **Deux variantes dans un seul fichier :** Talent Pro HR et MedGuard. Vous passez de l'une à l'autre avec le sélecteur « Gabarit » en haut de page, ou avec le lien « Projet suivant » en bas.
- **Schéma animé :** il se dessine quand il arrive à l'écran. Pour Talent Pro HR, ce sont 5 losanges emboîtés pour les niveaux d'accès. Pour MedGuard, c'est la chaîne bracelet → capteurs → Arduino → ThingsBoard, avec une courbe de signal.
- **Étapes reliées par le motif :** la bande du motif se remplit de rouge d'une étape à l'autre à l'entrée à l'écran. J'ai mis l'approche dans l'ordre logique : architecture → chemin critique → micro-sprints → collaboration avec le Senior PM.
- **Chiffres :** seuls 5 mois et 3 ans apparaissent. Les deux barres de comparaison sont à l'échelle (5 mois sur 36).

Ce que vous devez savoir :
- **Français seulement :** cette page n'a pas encore de version anglaise.
- **MedGuard sans durée ni rôle :** le brief ne les donne pas. J'ai mis à la place « Formation » et « Livrable : Prototype ».
- **ATS :** je décris seulement l'avant et l'après, sans donner de cause technique que je ne connais pas.

Prochaine étape possible : relier les boutons « Voir l'étude de cas » du portfolio à cette page.

## User

Utilise le système de design validé : fond Noir charbon, accent Rouge Tukula, motif Kuba animé en fond et lueur rouge qui suit le curseur.

Adapte la page d'accueil et l'étude de cas en version mobile (390px) :
- le cadre en losange du portrait reste dans le hero, et les badges flottants sont réduits à deux ;
- la lueur qui suit le curseur est désactivée sur mobile, mais le motif de fond continue de respirer lentement ;
- les onglets de compétences deviennent une rangée horizontale défilante ;
- la timeline du parcours garde sa colonne-motif à gauche ;
- le menu devient un panneau plein écran sur fond Noir charbon, avec le sélecteur FR / EN bien visible.
Montre aussi les états de survol et de focus des boutons et des liens, l'état actif du filtre des réalisations, et les deux états de carte projet (« Code source » et « Confidentiel »).

## Assistant

_[tool: run_script]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

La page d'accueil et l'étude de cas s'adaptent maintenant au mobile, en gardant la même palette, le même motif et les mêmes animations. Une vérification automatique tourne encore en arrière-plan.

Le nouveau fichier **Mobile et etats.dc.html** montre six écrans réels à 390 px, qu'on peut faire défiler : le hero, le menu ouvert, les compétences, le parcours, et les deux études de cas. En dessous, il présente les états des éléments :
- **Boutons et liens :** états par défaut, survol et focus clavier, y compris pour les icônes et les champs du formulaire.
- **Filtre des réalisations :** états actif, survol et focus.
- **Cartes projet :** « Code source » et « Confidentiel », chacune au repos et au survol.

Ce qui change sur mobile :
- **Hero :** le cadre en losange du portrait reste dans le hero, sous le texte, avec seulement deux badges (Next.js et IA générative).
- **Fond :** la lueur qui suit le curseur est coupée sur mobile et sur les écrans tactiles, mais le motif de fond continue de respirer.
- **Compétences :** les onglets forment une rangée horizontale qu'on fait défiler, et les tuiles passent sur deux colonnes.
- **Parcours :** la colonne-motif reste à gauche.
- **Menu :** il s'ouvre en plein écran sur fond Noir charbon, avec le sélecteur FR / EN en haut et des zones tactiles d'au moins 44 px.
- **Méthode et approche :** les étapes s'empilent, reliées par une bande-motif verticale.
- **MedGuard :** la chaîne bracelet → capteurs → Arduino → ThingsBoard passe à la verticale.

**À savoir :** le menu de l'étude de cas n'a pas de sélecteur FR / EN, parce que cette page existe seulement en français. Il propose à la place le choix entre Talent Pro HR et MedGuard. Pour ajouter le sélecteur, il faudrait d'abord traduire la page.

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

L'écran « Compétences » (1c) restait bloqué en haut de la page au lieu de s'ouvrir sur la section Compétences. C'est corrigé : la page réessaie maintenant jusqu'à trouver la section, puis se recale une fois les polices chargées. Une nouvelle vérification tourne en arrière-plan.

