# Template : Analyse de Contenu Existant

## 🎯 Objectif

Analyser systématiquement un contenu existant pour identifier son niveau actuel et les opportunités d'adaptation vers un public intermédiaire.

## 📋 Checklist d'Analyse

### 1. Identification du Public Cible Actuel

**Questions à se poser :**
- [ ] Quel niveau de connaissance .NET est présupposé ?
- [ ] Quels concepts sont expliqués vs présumés connus ?
- [ ] Le vocabulaire est-il basique, intermédiaire ou expert ?
- [ ] Les exemples de code sont-ils simplifiés ou réalistes ?

**Niveaux identifiables :**
- 🟢 **Débutant** : Explications de base, syntaxe simple, peu de contexte
- 🟡 **Intermédiaire** : Concepts connus, focus sur l'application, contexte métier
- 🔴 **Expert** : Patterns avancés, optimisations, architecture système

### 2. Analyse du Contenu Technique

**Pour chaque section, identifier :**

#### Concepts .NET
- [ ] Quels concepts .NET sont abordés ?
- [ ] Sont-ils expliqués ou juste mentionnés ?
- [ ] Le niveau de détail est-il adapté ?

#### Exemples de Code
- [ ] Les exemples sont-ils "Hello World" ou réalistes ?
- [ ] Y a-t-il des cas d'usage concrets ?
- [ ] Les trade-offs sont-ils discutés ?

#### Comparaisons
- [ ] Y a-t-il des comparaisons Framework vs Moderne ?
- [ ] Les différences sont-elles bien expliquées ?
- [ ] L'impact pratique est-il mentionné ?

### 3. Structure Pédagogique

- [ ] La progression est-elle linéaire ou modulaire ?
- [ ] Les prérequis sont-ils explicites ?
- [ ] Y a-t-il des rappels de contexte ?
- [ ] Les transitions sont-elles claires ?

### 4. Ton et Style

- [ ] Le ton est-il marketing ou technique ?
- [ ] Y a-t-il des buzzwords ?
- [ ] Le style est-il adapté à des développeurs ?
- [ ] Les affirmations sont-elles sourcées ?

## 🔍 Grille d'Analyse Détaillée

### Section par Section

Pour chaque slide ou section :

```markdown
## [Titre de la section]

### Niveau actuel
- [ ] Débutant
- [ ] Intermédiaire
- [ ] Expert

### Public cible identifié
[Description du public visé]

### Concepts techniques présents
- Concept 1 : [niveau de traitement]
- Concept 2 : [niveau de traitement]
- ...

### Exemples de code
- Type : [Hello World / Réaliste / Complexe]
- Qualité : [Note /10]
- Pertinence : [Note /10]

### Points forts
- Point fort 1
- Point fort 2

### Opportunités d'amélioration
- Amélioration 1 : [justification]
- Amélioration 2 : [justification]

### Adaptation vers niveau intermédiaire
**Actions recommandées :**
- [ ] Enrichir avec contexte métier
- [ ] Ajouter comparaison technique
- [ ] Remplacer exemple simplifié
- [ ] Ajouter points d'attention production
- [ ] Développer les trade-offs
```

## 📊 Critères d'Évaluation

### Pour déterminer si le contenu est adapté à un niveau intermédiaire

| Critère | Poids | Débutant (0-3) | Intermédiaire (4-7) | Expert (8-10) |
|---------|-------|----------------|---------------------|---------------|
| Complexité technique | 30% | Concepts de base | Concepts appliqués | Patterns avancés |
| Profondeur code | 25% | Syntaxe simple | Cas réalistes | Architecture |
| Contexte métier | 20% | Minimal | Présent | Système complet |
| Autonomie lecture | 15% | Formateur requis | Auto-suffisant | Référence |
| Applicabilité | 10% | Théorique | Pratique | Production |

**Score total** : /10

- **0-3** : Niveau débutant
- **4-7** : Niveau intermédiaire ✅ (CIBLE)
- **8-10** : Niveau expert

## 🎯 Exemple d'Analyse

### Section analysée : "C# : évolution du langage"

```markdown
### Niveau actuel : Débutant (2/10)

### Analyse détaillée

**Concepts présents :**
- Pattern matching : Mentionné, non expliqué
- Expressions lambda : Syntaxe montrée
- Nullable reference types : Absent

**Exemples de code :**
- Type : Très simplifié (if/else basique)
- Contexte : Aucun
- Applicabilité : Faible

**Points forts :**
- Comparaison avant/après claire
- Syntaxe correcte

**À améliorer pour niveau intermédiaire :**
1. Ajouter contexte d'utilisation réel
2. Expliquer POURQUOI cette évolution
3. Montrer impact sur architecture
4. Ajouter cas d'usage métier
5. Discuter des trade-offs

**Actions recommandées :**
- [ ] Remplacer exemple par cas réel (ex: validation DTO)
- [ ] Ajouter explication pattern matching
- [ ] Montrer impact sur testabilité
- [ ] Ajouter note sur migration progressive
```

## 🛠️ Utilisation Pratique

### Commande pour analyser docs/slides.md

1. Lire le fichier `docs/slides.md`
2. Appliquer cette grille d'analyse section par section
3. Générer un rapport de synthèse
4. Identifier les sections à adapter en priorité
5. Proposer un plan d'enrichissement

### Output attendu

Un rapport structuré :
- Niveau global actuel
- Score par section
- Top 5 des améliorations prioritaires
- Plan d'action détaillé

---

**Template Version** : 1.0  
**Dernière mise à jour** : 2026-02-03  
**Skill** : Prompt Engineering
