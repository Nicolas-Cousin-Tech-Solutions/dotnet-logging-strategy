# .NET Logging Strategy (Levels & Noise Reduction)

| GitHub Pages | PDF | .NET |
| ------------ | --- | ---- |
| [![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen?style=flat-square&logo=github)](https://nicolas-cousin-tech-solutions.github.io/dotnet-logging-strategy) | [![PDF](https://img.shields.io/badge/PDF-Auto--generated-blue?style=flat-square&logo=githubactions)](https://nicolas-cousin-tech-solutions.github.io/dotnet-logging-strategy/exports/dotnet-logging-strategy.pdf) | [![.NET 8 LTS](https://img.shields.io/badge/.NET-8%20LTS-purple?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/) |

Présentation technique (format **5 minutes**) sur la **stratégie de logs** dans l’écosystème **.NET** :

- Niveaux de logs : `Information` / `Warning` / `Error` / `Critical`
- Problème courant : **trop de `Error` sur du fonctionnel** (bruit + alerting inefficace)
- Différenciation **fonctionnel vs technique**
- Logs structurés (propriétés), `EventId`, corrélation (`CorrelationId` / `TraceId`)
- Checklist d’équipe : requalification des top erreurs + alignement alerting

Cette présentation est destinée à des équipes **backend .NET** (ASP.NET MVC / ASP.NET Core)
souhaitant améliorer la **qualité opérationnelle** des logs et la pertinence des alertes.

---

## 📺 Présentation en ligne (GitHub Pages)

👉 **Slides Reveal.js**  
[Slides](https://nicolas-cousin-tech-solutions.github.io/dotnet-logging-strategy/)

---

## 📄 Export PDF

👉 **Version PDF (générée automatiquement)**  
[PDF](https://nicolas-cousin-tech-solutions.github.io/dotnet-logging-strategy/exports/dotnet-logging-strategy.pdf)

Le PDF est généré via GitHub Actions à partir de la version Reveal.js,
afin de garantir la cohérence entre les supports.

---

## 🧭 Contenu de la présentation

- Symptôme : alerting pollué par des faux positifs (fonctionnel loggé en `Error`)
- Règle d’or : **niveau = action attendue** (impact opérationnel)
- Fonctionnel vs technique : critères et exemples
- Exemples : requalifier `Error` → `Warning` lorsque récupérable/attendu
- Logs structurés : propriétés systématiques (OrderId, CustomerId, etc.)
- `EventId` : standardisation, filtrage, dashboards
- Corrélation : `CorrelationId` / `TraceId` pour diagnostiquer vite
- Checklist : “Top 20 logs `Error`” → downgrade si fonctionnel + règles d’alerting

> ⚠️ L’objectif est de restaurer la **confiance** dans le monitoring :
> moins de bruit, des alertes exploitables, et un diagnostic plus rapide.

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
- Pratiques applicables à :
  - ASP.NET MVC (.NET Framework 4.8) via frameworks de logs existants
  - ASP.NET Core (.NET 6/7/8) via `Microsoft.Extensions.Logging`

Sigles utilisés dans les notes des slides :
- SLO (Service Level Objective) : objectif de qualité de service mesurable (disponibilité, latence, taux d’erreur).
- TraceId / CorrelationId : identifiants de traçage pour relier les événements d’une même requête.
- DB : base de données (Database).

---

## 📂 Structure du repository

~~~text
docs/
 ├─ index.html
 ├─ slides.md
 ├─ reveal/
 └─ exports/
    └─ dotnet-logging-strategy.pdf

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
