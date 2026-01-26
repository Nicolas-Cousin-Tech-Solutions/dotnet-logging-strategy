# .NET Platform Evolution

| Github pages | PDF | .Net |
| ------------ | --- | ---- |
| [![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen?style=flat-square&logo=github)](https://nicolas-cousin-tech-solutions.github.io/dotnet-modernization-overview) | [![PDF](https://img.shields.io/badge/PDF-Auto--generated-blue?style=flat-square&logo=githubactions)](https://nicolas-cousin-tech-solutions.github.io/dotnet-modernization-overview/exports/dotnet-modernization-overview.pdf) | [![.NET 8 LTS](https://img.shields.io/badge/.NET-10%20LTS-purple?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/) |

Présentation technique sur l’évolution de l’écosystème **.NET** :

- .NET Framework 4.8 → .NET moderne
- Évolution du langage C# (C# 7.3 → C# 12)
- ASP.NET Web API → ASP.NET Core API
- Cadence de releases et stratégie **LTS**
- Continuité technique et points d’attention (sans migration forcée)

Cette présentation est destinée à des équipes **.NET Framework historiques**
souhaitant comprendre les enjeux et les apports des versions récentes de .NET.

---

## 📺 Présentation en ligne (GitHub Pages)

👉 **Slides Reveal.js**  
[Slides](https://nicolas-cousin-tech-solutions.github.io/dotnet-modernization-overview/)

---

## 📄 Export PDF

👉 **Version PDF (générée automatiquement)**  
[PDF](https://nicolas-cousin-tech-solutions.github.io/dotnet-modernization-overview/exports/dotnet-modernization-overview.pdf)

Le PDF est généré via GitHub Actions à partir de la version Reveal.js,
afin de garantir la cohérence entre les supports.

---

## 🧭 Contenu de la présentation

- Positionnement .NET Framework vs .NET moderne
- Différences runtime, outillage et performances
- Évolution du langage C# (syntaxe, expressivité, sécurité)
- ASP.NET Web API vs ASP.NET Core API
- Cycle de vie et support (LTS / non-LTS)
- Points à étudier avant toute démarche de migration
- Questions fréquentes (FAQ) par thème

> ⚠️ La migration n’est **pas** l’objectif immédiat de cette présentation.
> Elle s’inscrit dans une continuité pédagogique.

---

## 🛠️ Stack technique

- Reveal.js (présentation)
- Markdown
- GitHub Pages (hébergement)
- Playwright (export PDF automatisé)
- GitHub Actions

---

## 🔁 Mise à jour du PDF

Le PDF est automatiquement régénéré :
- à chaque modification des slides
- ou manuellement via GitHub Actions (*workflow_dispatch*)

Aucune action manuelle n’est requise.

---

## 📅 Contexte

- État de l’écosystème : **janvier 2026**
- .NET 8 validé (LTS)
- .NET 10 identifié comme futur LTS (non encore validé côté architecture)

---

## 📂 Structure du repository

~~~text
docs/
 ├─ index.html
 ├─ slides.md
 ├─ reveal/
 └─ exports/
    └─ dotnet-modernization-overview.pdf

scripts/
 ├─ copy-reveal.js
 └─ export-pdf.js
~~~

---

## 📜 Licence

Contenu pédagogique – usage interne / formation.

© 2026 — Support pédagogique.
Usage formation et sensibilisation.
Réutilisation ou diffusion externe à valider.