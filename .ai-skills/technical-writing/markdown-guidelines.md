# Guidelines Markdown - Standards de Qualité

## 🎯 Objectif

Définir les standards de formatage et de qualité Markdown pour la documentation technique .NET.

## 📋 Formatage Markdown

### Titres

```markdown
# Titre Principal (H1) - 1 seul par document

## Section Principale (H2)

### Sous-section (H3)

#### Détail (H4) - rarement nécessaire
```

**Règles :**
- 1 seul H1 par document
- Hiérarchie respectée (pas de saut de niveau)
- Espace avant et après chaque titre
- Pas de ponctuation finale

### Emphases

```markdown
**Texte important** : gras pour mots-clés
*Texte à accentuer* : italique pour nuances
`Code inline` : pour types, méthodes, variables
```

### Listes

```markdown
**Liste à puces :**
- Point 1
- Point 2
  - Sous-point 2.1
  - Sous-point 2.2

**Liste numérotée :**
1. Étape 1
2. Étape 2
3. Étape 3

**Checklist :**
- [x] Tâche complétée
- [ ] Tâche en cours
```

### Code Blocks

```markdown
**Inline :**
La méthode `GetOrderById()` retourne un `Order`.

**Block avec syntaxe :**
```csharp
// Code C#
public class Order
{
    public int Id { get; set; }
}
```

**Block avec titre :**
```csharp
// Fichier: OrderService.cs
public class OrderService
{
    // Implementation
}
```
```

### Tableaux

```markdown
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Valeur 1  | Valeur 2  | Valeur 3  |
| Valeur 4  | Valeur 5  | Valeur 6  |

**Alignement :**
| Gauche | Centre | Droite |
|:-------|:------:|-------:|
| A      |   B    |      C |
```

### Liens et Références

```markdown
**Lien externe :**
[Microsoft Docs](https://docs.microsoft.com/dotnet/)

**Lien interne :**
[Voir section Migration](#migration)

**Référence image :**
![Alt text](path/to/image.png)
```

### Citations et Notes

```markdown
**Citation :**
> Async/await améliore la scalabilité des APIs I/O-bound.
> — Microsoft Docs

**Note importante :**
> ⚠️ **Attention** : Toute la stack doit être async.

**Tip :**
> 💡 **Astuce** : Utiliser BenchmarkDotNet pour mesurer.
```

## 🎨 Conventions Spécifiques .NET

### Nommage Code

```markdown
**Types et Classes :**
- `Order` : Type C#
- `IOrderRepository` : Interface
- `OrderDto` : DTO class

**Méthodes :**
- `GetOrderById()` : Méthode sync
- `GetOrderByIdAsync()` : Méthode async
- `ProcessAsync()` : Toujours suffix Async

**Namespaces :**
- `System.Threading.Tasks`
- `Microsoft.AspNetCore.Mvc`

**Packages :**
- **BenchmarkDotNet** (nom package gras)
- **Entity Framework Core**
```

### Versions

```markdown
**Spécifier précisément :**
- .NET Framework 4.8 (pas juste "Framework")
- .NET 8 (pas ".NET Core 8")
- C# 12 (version du langage)
- ASP.NET Core 8.0 (version framework)

**Éviter :**
- ".NET Core" (ambigu)
- "Modern .NET" (imprécis)
- "Latest" (devient obsolète)
```

### Comparaisons

```markdown
**Format standard :**

### .NET Framework 4.8

[Code Framework]

**Limitations :**
- Point 1
- Point 2

---

### .NET 8

[Code .NET moderne]

**Améliorations :**
- Point 1
- Point 2
```

## ✅ Checklist Qualité Document

### Structure
- [ ] Titre H1 unique et descriptif
- [ ] Table des matières si > 1000 mots
- [ ] Sections logiques avec H2
- [ ] Progression cohérente

### Contenu
- [ ] Objectif clairement défini
- [ ] Prérequis mentionnés
- [ ] Code examples testés
- [ ] Pas de marketing speak
- [ ] Sources citées

### Formatage
- [ ] Markdown valide (linter)
- [ ] Code blocks avec langage
- [ ] Liens fonctionnels
- [ ] Images avec alt text
- [ ] Tableaux bien formés

### Technique
- [ ] Précision technique vérifiée
- [ ] Versions spécifiées
- [ ] Trade-offs mentionnés
- [ ] Points d'attention présents

## 🛠️ Outils de Validation

### Markdown Linting

```bash
# markdownlint
npm install -g markdownlint-cli
markdownlint *.md

# Configuration .markdownlint.json
{
  "default": true,
  "MD013": { "line_length": 120 },
  "MD033": false,
  "MD041": true
}
```

### Link Checking

```bash
# markdown-link-check
npm install -g markdown-link-check
markdown-link-check README.md
```

### Spell Checking

```bash
# cspell
npm install -g cspell
cspell "**/*.md"
```

## 🎯 Templates Réutilisables

### README.md Standard

```markdown
# [Nom du Projet]

**Description courte**

## 📋 Prérequis

- .NET 8 SDK
- Visual Studio 2022 / VS Code

## 🚀 Démarrage Rapide

```bash
git clone [repo]
cd [project]
dotnet restore
dotnet run
```

## 📖 Documentation

- [Guide d'utilisation](docs/guide.md)
- [API Reference](docs/api.md)

## 🤝 Contribution

[Guidelines de contribution]

## 📜 Licence

[Type de licence]
```

### Documentation Technique

```markdown
# [Titre de la Fonctionnalité]

## Vue d'ensemble

[Description courte]

## Utilisation

### Exemple Basique

```csharp
[Code simple]
```

### Exemple Avancé

```csharp
[Code avancé avec contexte]
```

## Configuration

[Options de configuration]

## Points d'Attention

- ⚠️ Point 1
- ⚠️ Point 2

## Références

- [Doc officielle](url)
```

## 📊 Métriques de Qualité

### Lisibilité

- **Longueur ligne** : Max 120 caractères
- **Longueur paragraphe** : 3-5 phrases
- **Longueur section** : 200-500 mots
- **Niveau lecture** : Développeur intermédiaire

### Code Examples

- **Ratio code/texte** : 30-40%
- **Lignes max/block** : 30 lignes
- **Contexte** : Toujours présent
- **Commentaires** : Sur points complexes

### Structure

- **Sections** : 5-10 sections H2
- **Sous-sections** : 2-4 H3 par H2
- **Profondeur max** : H4 (rarement H5)
- **Table of contents** : Si > 8 sections

## 🚀 Workflow de Rédaction

### 1. Planning
- [ ] Définir objectif
- [ ] Identifier audience
- [ ] Structurer plan
- [ ] Lister exemples code

### 2. Rédaction
- [ ] Draft complet
- [ ] Code examples
- [ ] Captures d'écran si nécessaire
- [ ] Références

### 3. Révision
- [ ] Relecture contenu
- [ ] Test code examples
- [ ] Validation liens
- [ ] Lint Markdown

### 4. Publication
- [ ] Checklist qualité
- [ ] Peer review
- [ ] Commit & push
- [ ] Announce

## 🎨 Style Guide

### Ton

✅ **Recommandé :**
- Professionnel mais accessible
- Précis et factuel
- Exemples concrets
- Direct et clair

❌ **À éviter :**
- Marketing ("révolutionnaire")
- Jargon non expliqué
- Ambiguïté
- Familiarité excessive

### Vocabulaire

**Préférer :**
- "Utiliser" vs "se servir de"
- "Améliorer" vs "booster"
- "Optimiser" vs "turbocharger"
- "Efficace" vs "game-changer"

**Termes techniques OK :**
- Dependency Injection
- Middleware
- Repository Pattern
- LINQ

## 📚 Ressources

### Style Guides de Référence

- [Microsoft Writing Style Guide](https://docs.microsoft.com/style-guide/)
- [Google Developer Style Guide](https://developers.google.com/style)
- [Write the Docs Guide](https://www.writethedocs.org/guide/)

### Markdown

- [CommonMark Spec](https://commonmark.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [Markdown Guide](https://www.markdownguide.org/)

### Outils

- [markdownlint](https://github.com/DavidAnson/markdownlint)
- [Vale](https://vale.sh/) (prose linter)
- [Grammarly](https://www.grammarly.com/) (EN)

---

**Version** : 1.0  
**Dernière mise à jour** : 2026-02-03  
**Skill** : Technical Writing
