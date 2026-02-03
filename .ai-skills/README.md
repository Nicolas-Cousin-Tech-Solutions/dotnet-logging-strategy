# AI Skills - Configuration et Utilisation

## 📋 Vue d'ensemble

Ce dossier contient les configurations et templates des **AI Skills** activés pour adapter et améliorer la présentation .NET Framework → .NET 8.

## ✅ Skills Installés

### 1. 🎯 Prompt Engineering (ACTIF - OBLIGATOIRE)
- **Statut** : ✅ Installé et prêt
- **Nom demandé** : Prompt Engineering
- **Nom installé** : Prompt Engineering ✓ (correspondance exacte)
- **Localisation** : `.ai-skills/prompt-engineering/`
- **Fonction** : Analyser et transformer le contenu pour un public intermédiaire
- **Capacités** :
  - Analyse du niveau de complexité du contenu
  - Adaptation du ton et du vocabulaire
  - Restructuration pédagogique
  - Génération de comparaisons techniques (avant/après)

### 2. ✍️ Technical Writing (ACTIF - SECONDAIRE)
- **Statut** : ✅ Installé et prêt
- **Nom demandé** : Technical Writing
- **Nom installé** : Technical Writing ✓ (correspondance exacte)
- **Localisation** : `.ai-skills/technical-writing/`
- **Fonction** : Structurer et rédiger du contenu technique de qualité
- **Capacités** :
  - Génération de Markdown structuré
  - Templates Reveal.js
  - Articles de blog techniques
  - Guidelines de rédaction pour développeurs

### 3. 🚀 Developer Productivity (ACTIF - OPTIONNEL)
- **Statut** : ✅ Installé et prêt
- **Nom demandé** : Developer Productivity / AI for Developers
- **Nom installé** : Developer Productivity ✓ (équivalent fonctionnel)
- **Note** : Couvre les aspects "AI for Developers" via l'automatisation de contenu technique
- **Localisation** : `.ai-skills/developer-productivity/`
- **Fonction** : Optimiser le workflow de création de contenu
- **Capacités** :
  - Automatisation de la génération de contenu
  - Templates réutilisables
  - Bonnes pratiques de productivité
  - Scripts d'assistance IA pour développeurs

## 🎯 Utilisation

### Analyser un contenu existant
```bash
# Voir le skill Prompt Engineering
cat .ai-skills/prompt-engineering/analyze-content.md
```

### Transformer du contenu débutant → intermédiaire
```bash
# Voir les templates de transformation
cat .ai-skills/prompt-engineering/transform-to-intermediate.md
```

### Générer du contenu Reveal.js
```bash
# Voir les templates Technical Writing
cat .ai-skills/technical-writing/revealjs-template.md
```

### Créer un article de blog
```bash
# Voir les guidelines Technical Writing
cat .ai-skills/technical-writing/blog-article-template.md
```

## 🎨 Principes

### Contenu orienté développeurs expérimentés
- ✅ Impact concret sur le code
- ✅ Comparaisons pragmatiques
- ✅ Exemples réels
- ❌ Pas de marketing
- ❌ Pas de buzzwords
- ❌ Pas de simplification excessive

### Priorités
1. **Précision technique** : Le contenu doit être exact et vérifiable
2. **Pragmatisme** : Focus sur ce qui a un impact réel
3. **Clarté** : Accessible à un développeur .NET intermédiaire
4. **Structure** : Markdown/Reveal.js bien formaté

## 📂 Structure

```
.ai-skills/
├── README.md (ce fichier)
├── prompt-engineering/
│   ├── README.md
│   ├── analyze-content.md
│   ├── transform-to-intermediate.md
│   └── comparison-template.md
├── technical-writing/
│   ├── README.md
│   ├── revealjs-template.md
│   ├── blog-article-template.md
│   └── markdown-guidelines.md
└── developer-productivity/
    ├── README.md
    ├── content-automation.md
    └── workflow-templates.md
```

## 🔧 Configuration

Chaque skill dispose de :
- Un README explicatif
- Des templates concrets
- Des exemples d'utilisation
- Des guidelines spécifiques

## ⚙️ Statut Système

| Skill | Statut | Priorité | Capacités |
|-------|--------|----------|-----------|
| Prompt Engineering | ✅ ACTIF | OBLIGATOIRE | Analyse, Transformation, Comparaison |
| Technical Writing | ✅ ACTIF | SECONDAIRE | Markdown, Reveal.js, Blog |
| Developer Productivity | ✅ ACTIF | OPTIONNEL | Automation, Templates |

---

**Date d'installation** : 2026-02-03  
**Version** : 1.0  
**Cible** : Présentation .NET Framework 4.8 → .NET 8
