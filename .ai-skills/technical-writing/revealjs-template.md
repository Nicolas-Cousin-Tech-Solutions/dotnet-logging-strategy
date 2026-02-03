# Template : Slides Reveal.js pour Développeurs

## 🎯 Objectif

Créer des slides techniques Reveal.js de haute qualité pour présenter l'évolution .NET Framework → .NET 8 à des développeurs intermédiaires.

## 📋 Structure d'une Présentation

### Anatomie d'une Slide

```markdown
## [Titre - Max 8 mots]

[Phrase d'accroche - contexte en 1-2 lignes]

**Contenu principal**

Note:
[Speaker notes - insights, détails, expérience terrain]
```

## 🎨 Types de Slides

### 1. Slide Titre de Section

```markdown
# [Titre de Section]

--

## [Sous-titre ou Question Clé]

Note:
Transition vers nouveau chapitre.
Prendre le temps d'annoncer le changement de thème.
```

**Usage :** Marquer les transitions entre grandes sections

### 2. Slide Concept Technique

```markdown
## [Concept : Nom Précis]

### Contexte .NET Framework 4.8

[Description de l'approche actuelle]

**Problème :**
- Point 1
- Point 2

### Évolution .NET 8

[Description de la nouvelle approche]

**Bénéfice :**
- Point 1
- Point 2

Note:
Expérience terrain : [insight concret]
Points d'attention : [pièges courants]
```

**Usage :** Présenter une évolution technique

### 3. Slide Code Comparison

```markdown
## [Feature] : Avant / Après

### .NET Framework 4.8

```csharp
// Contexte : [cas d'usage]
[Code Framework - réaliste, 5-15 lignes]
```

**Limitation :** [1-2 points clés]

--

### .NET 8 + C# 12

```csharp
// Même contexte
[Code moderne - équivalent]
```

**Amélioration :** [Mesure ou fait]

Note:
En production : [retour d'expérience]
Migration : [conseil pratique]
```

**Usage :** Comparaison directe de code

### 4. Slide Impact / Mesures

```markdown
## Impact Performance

| Métrique | Framework 4.8 | .NET 8 | Gain |
|----------|---------------|--------|------|
| [Métrique 1] | [Valeur] | [Valeur] | [%] |
| [Métrique 2] | [Valeur] | [Valeur] | [%] |

**Contexte benchmark :**
- Environnement : [specs]
- Charge : [description]
- Source : [lien]

Note:
Benchmarks reproductibles.
Conditions réelles de production.
```

**Usage :** Montrer des mesures concrètes

### 5. Slide FAQ

```markdown
## FAQ — [Thème]

**Q: [Question fréquente] ?**

R: [Réponse courte et factuelle]

**Q: [Question fréquente] ?**

R: [Réponse courte et factuelle]

Note:
Questions réelles d'équipes en migration.
Réponses basées sur retours terrain.
```

**Usage :** Anticiper les questions

### 6. Slide Points d'Attention

```markdown
## Points d'Attention : [Thème]

### ⚠️ [Point 1]

[Explication courte - impact]

### ⚠️ [Point 2]

[Explication courte - impact]

### ✅ Recommandation

[Conseil actionnable]

Note:
Pièges rencontrés en projet réel.
Solutions validées terrain.
```

**Usage :** Warnings et bonnes pratiques

## 🎯 Exemple Complet

### Slide Set sur Async/Await

```markdown
---

# Performance et Scalabilité

--

## Async/Await : Impact Réel

Comprendre l'impact sur la scalabilité des API

Note:
Section cruciale pour migration Web API.
Impact direct sur capacité de production.

--

## Contexte : ASP.NET Web API

### Le Problème du Thread Blocking

```csharp
// ASP.NET Web API (Framework 4.8)
public IHttpActionResult GetCustomer(int id)
{
    // Thread IIS bloqué pendant DB I/O
    var customer = _repository.GetCustomer(id);
    return Ok(customer);
}
```

**Limitation :**
- Thread pool IIS limité (~200 threads)
- Thread bloqué pendant I/O
- Dégradation sous charge

Note:
Pattern classique en Framework 4.8.
Fonctionne bien à faible charge.
Devient bloquant à haute charge.

--

## Solution : Async/Await Natif

### ASP.NET Core (.NET 8)

```csharp
// ASP.NET Core API (.NET 8)
public async Task<IActionResult> GetCustomer(int id)
{
    // Thread libéré pendant DB I/O
    var customer = await _repository.GetCustomerAsync(id);
    return Ok(customer);
}
```

**Amélioration :**
- Thread retourné au pool
- Scalabilité X5-10 typique
- Meilleure réactivité

Note:
Changement fondamental de modèle.
Nécessite stack entièrement async.

--

## Mesures Réelles

| Métrique | Framework 4.8 | .NET 8 | Gain |
|----------|---------------|--------|------|
| Req/sec | ~200 | ~2000 | +900% |
| Latence P95 | 300ms | 80ms | -73% |
| Threads utilisés | 180/200 | 12/200 | 📉 |

**Conditions :**
- DB latency: 100ms
- Charge: 500 req/sec
- Hardware identique

**Source :** Benchmark interne, reproductible

Note:
Mesures sur workload I/O-bound typique.
Impact moindre sur workloads CPU-bound.

--

## Points d'Attention

### ⚠️ Stack entièrement async

Async doit être cohérent de bout en bout :
- Repository → Service → Controller

### ⚠️ Éviter "async over sync"

```csharp
// ❌ Anti-pattern
await Task.Run(() => SyncMethod());
```

### ✅ Migration progressive

1. Nouveaux endpoints : async
2. Endpoints critiques : migration
3. Reste : selon ROI

Note:
Async ≠ toujours plus rapide.
Utile pour I/O, pas pour CPU.
Mesurer l'impact réel avant migration complète.

--

## FAQ — Async/Await

**Q: Faut-il tout migrer en async ?**

R: Non. Prioriser les endpoints I/O-bound à fort traffic.

**Q: Quel impact sur les tests ?**

R: Tests async nécessitent adaptation. Investment à prévoir.

**Q: Performances CPU-bound ?**

R: Peu ou pas d'amélioration. Parfois dégradation légère.

Note:
Questions fréquentes lors de migration.
Réponses basées sur expérience projet.
```

## ✅ Checklist Qualité Slide

Pour chaque slide, valider :

### Contenu
- [ ] Titre clair et spécifique (max 8 mots)
- [ ] Contexte présent
- [ ] Code réaliste si applicable
- [ ] Pas de marketing speak
- [ ] Points clés identifiables en 3 secondes

### Code
- [ ] Syntaxe correcte
- [ ] Contexte d'usage clair
- [ ] 5-15 lignes max par bloc
- [ ] Commentaires pertinents
- [ ] Highlight du point important

### Structure
- [ ] 1 idée principale par slide
- [ ] Max 5 bullet points
- [ ] Speaker notes riches
- [ ] Transitions logiques
- [ ] Tempo adapté (2-3 min/slide)

### Technique
- [ ] Précision technique vérifiée
- [ ] Affirmations sourcées
- [ ] Mesures quand applicable
- [ ] Trade-offs mentionnés

## 🎨 Bonnes Pratiques

### Slide Density
- **Trop dense** : Plus de 7 bullet points
- **Optimal** : 3-5 bullet points
- **Trop léger** : 1 mot (sauf titre de section)

### Code Blocks
- **Max lignes** : 15 lignes (préférable : 8-12)
- **Highlight** : Utiliser commentaires pour focus
- **Contexte** : Toujours inclure le "pourquoi"

### Speaker Notes
- **Obligatoires** : Sur slides techniques
- **Contenu** : Insights, expérience, détails
- **Longueur** : 2-5 phrases

### Rythme
- **Titre section** : 30 sec
- **Concept** : 2-3 min
- **Code comparison** : 3-4 min
- **FAQ** : 1-2 min

## 🚀 Workflow de Création

1. **Structure** : Définir plan (sections → slides)
2. **Draft** : Rédiger contenu brut
3. **Code** : Tester tous les exemples
4. **Relecture** : Checklist complète
5. **Timing** : Vérifier tempo présentation
6. **Speaker Notes** : Enrichir avec insights

## 📚 Exemples de Thèmes

### Pour .NET Framework → .NET 8

**Sections types :**
1. Introduction (contexte, objectifs)
2. Plateforme (.NET Framework vs .NET)
3. Langage (C# 7.3 vs C# 12)
4. API (ASP.NET vs ASP.NET Core)
5. Performance (benchmarks)
6. Migration (stratégie, ROI)
7. Conclusion (next steps)

**Ratio slides :**
- 30% : Concepts et contexte
- 40% : Code et comparaisons
- 20% : Mesures et impact
- 10% : FAQ et warnings

---

**Template Version** : 1.0  
**Dernière mise à jour** : 2026-02-03  
**Skill** : Technical Writing
