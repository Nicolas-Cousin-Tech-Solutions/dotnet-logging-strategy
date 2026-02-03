# Technical Writing - Skill IA

## 🎯 Objectif

Produire du contenu technique de haute qualité pour développeurs expérimentés, structuré en Markdown et Reveal.js.

## ✅ Statut : ACTIF

Ce skill est **opérationnel** et prêt à être utilisé.

## 📋 Capacités

### 1. Génération de Contenu Reveal.js
- Slides techniques structurés
- Speaker notes pertinentes
- Transitions pédagogiques
- Code highlighting optimisé

### 2. Articles de Blog Techniques
- Structure longue forme
- Exemples de code approfondis
- SEO pour développeurs
- Références techniques

### 3. Documentation Markdown
- Guidelines de formatage
- Standards de qualité
- Conventions de nommage
- Structure documentaire

## 🛠️ Templates Disponibles

### Template 1: Slides Reveal.js
Voir : `revealjs-template.md`

### Template 2: Articles de blog
Voir : `blog-article-template.md`

### Template 3: Guidelines Markdown
Voir : `markdown-guidelines.md`

## 🎨 Principes de Rédaction Technique

### Pour Développeurs .NET Intermédiaires

✅ **À PRIVILÉGIER**
- Code fonctionnel et testé
- Exemples tirés de cas réels
- Explications du "pourquoi" technique
- Références aux docs officielles
- Mesures et benchmarks
- Trade-offs explicites

❌ **À ÉVITER**
- Marketing speak ("game-changer", "revolutionary")
- Code "Hello World" sans contexte
- Simplifications excessives
- Jargon non expliqué
- Affirmations non sourcées
- Buzzwords sans substance

### Standards de Qualité

| Critère | Requis |
|---------|--------|
| Code compilable | ✅ Oui |
| Contexte métier | ✅ Oui |
| Sources citées | ✅ Si affirmations |
| Comparaisons | ✅ Framework vs Moderne |
| Mesures | ✅ Si applicable |
| Points d'attention | ✅ Oui |

## 📝 Format Reveal.js

### Structure d'un Slide Technique

```markdown
## [Titre Clair et Spécifique]

[Phrase d'introduction - contexte]

**Code :**
```csharp
[Exemple réaliste avec contexte]
```

**Points clés :**
- Point 1
- Point 2

Note:
[Speaker notes - insights développeur, retours terrain]
```

### Conventions Reveal.js

- `---` : Nouvelle slide
- `--` : Slide verticale (sous-thème)
- `Note:` : Speaker notes
- Triple backticks pour code avec langage
- Listes à puces courtes (3-5 items max)

## 📝 Format Blog Article

### Structure Standard

```markdown
# [Titre SEO-friendly]

**TL;DR** : [Résumé en 2-3 phrases]

## Introduction

[Contexte, problème, objectif de l'article]

## [Section 1]

[Contenu avec exemples de code]

### Code Exemple

```csharp
[Code annoté]
```

**Explication :**
[Détails techniques]

## Points Clés

- Point 1
- Point 2

## Conclusion

[Synthèse, next steps, références]

## Références

- [Microsoft Docs](url)
- [Blog technique](url)
```

## 🔍 Guidelines Spécifiques .NET

### Exemples de Code

**Format standard :**
```csharp
// Contexte : [Description du cas d'usage]
// Framework : .NET 8 / C# 12

public class OrderService
{
    // Code avec commentaires pertinents
    public async Task<Result> ProcessOrderAsync(Order order)
    {
        // Implémentation
    }
}
```

### Comparaisons Framework vs Moderne

**Toujours montrer :**
1. Code Framework 4.8 (réaliste)
2. Code .NET 8 (équivalent)
3. Différences expliquées
4. Impact mesurable

### Terminologie

**Préférer :**
- .NET moderne (plutôt que ".NET Core")
- .NET Framework 4.8 (version complète)
- C# 12 (version précise)
- ASP.NET Core (pas juste "Core")

## 📊 Checklist de Relecture

Avant publication, vérifier :

- [ ] Le code compile et fonctionne
- [ ] Les exemples sont réalistes
- [ ] Le contexte est clair
- [ ] Les affirmations sont sourcées
- [ ] Pas de marketing speak
- [ ] Les comparaisons sont équilibrées
- [ ] Les points d'attention sont mentionnés
- [ ] La structure est cohérente
- [ ] Les références sont valides
- [ ] Le niveau est intermédiaire

## 🎯 Validation de Qualité

### Score de Qualité (/10)

| Critère | Poids | Points |
|---------|-------|--------|
| Précision technique | 30% | /3 |
| Applicabilité | 25% | /2.5 |
| Clarté | 20% | /2 |
| Structure | 15% | /1.5 |
| Références | 10% | /1 |

**Score cible** : 7+/10 pour publication

## 🚀 Workflow de Production

1. **Recherche** : Docs officielles, benchmarks, retours terrain
2. **Rédaction** : Suivre templates appropriés
3. **Code** : Tester tous les exemples
4. **Relecture** : Checklist complète
5. **Validation** : Score qualité
6. **Publication** : Markdown optimisé

## 📚 Ressources de Référence

### Documentation Officielle
- [Microsoft .NET Docs](https://docs.microsoft.com/dotnet/)
- [C# Language Reference](https://docs.microsoft.com/dotnet/csharp/)
- [ASP.NET Core Docs](https://docs.microsoft.com/aspnet/core/)

### Benchmarks
- [BenchmarkDotNet](https://benchmarkdotnet.org/)
- [.NET Performance](https://devblogs.microsoft.com/dotnet/category/performance/)

### Style Guides
- [Microsoft Writing Style Guide](https://docs.microsoft.com/style-guide/)
- [Google Developer Documentation Style Guide](https://developers.google.com/style)

---

**Version** : 1.0  
**Dernière mise à jour** : 2026-02-03  
**Priorité** : SECONDAIRE
