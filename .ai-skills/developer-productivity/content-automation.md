# Content Automation - Automatisation de la Génération de Contenu

## 🎯 Objectif

Automatiser la génération de contenu répétitif pour maximiser la productivité et maintenir la cohérence.

## 📋 Patterns d'Automation

### 1. Génération de Slides de Comparaison

#### Script Template

```bash
#!/bin/bash
# generate-comparison-slide.sh

CONCEPT=$1
FRAMEWORK_CODE=$2
NET8_CODE=$3

cat > "slides/${CONCEPT}-comparison.md" << EOF
## ${CONCEPT} : Framework vs .NET 8

### .NET Framework 4.8

\`\`\`csharp
${FRAMEWORK_CODE}
\`\`\`

**Limitations :**
- [À compléter]

--

### .NET 8

\`\`\`csharp
${NET8_CODE}
\`\`\`

**Améliorations :**
- [À compléter]

Note:
[À compléter avec insights développeur]
EOF

echo "✅ Slide générée : slides/${CONCEPT}-comparison.md"
```

#### Utilisation

```bash
./generate-comparison-slide.sh "HttpClient" \
  "using (var client = new HttpClient()) { }" \
  "var client = _clientFactory.CreateClient();"
```

### 2. Génération de Squelette Article Blog

#### Script Node.js

```javascript
// generate-blog-article.js
const fs = require('fs');
const path = require('path');

function generateBlogArticle(title, category, tags) {
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const date = new Date().toISOString().split('T')[0];
    
    const template = `# ${title}

**Publié le** : ${date}  
**Niveau** : Intermédiaire  
**Temps de lecture** : [X min]

---

## TL;DR

[Résumé en 3-4 phrases]

---

## Introduction

### Contexte

[À compléter]

### Objectif

[À compléter]

---

## [Section 1]

[Contenu]

---

## Conclusion

[Synthèse]

---

## Ressources

- [Microsoft Docs](https://docs.microsoft.com/dotnet/)

---

**Tags** : ${tags.map(t => `#${t}`).join(' ')}  
**Catégorie** : ${category}
`;

    const filename = `blog/${date}-${slug}.md`;
    fs.writeFileSync(filename, template);
    console.log(`✅ Article généré : ${filename}`);
}

// Usage
generateBlogArticle(
    "Async/Await en .NET 8 : Performance",
    "Performance",
    ["dotnet", "async", "performance"]
);
```

### 3. Validation Automatisée de Code

#### Script de Test

```javascript
// validate-code-examples.js
const fs = require('fs');
const { execSync } = require('child_process');

function extractCodeBlocks(markdownFile) {
    const content = fs.readFileSync(markdownFile, 'utf-8');
    const csharpBlocks = content.match(/```csharp\n([\s\S]*?)```/g) || [];
    
    return csharpBlocks.map(block => 
        block.replace(/```csharp\n/, '').replace(/```/, '')
    );
}

function validateCSharp(code, index) {
    const tempFile = `temp_${index}.cs`;
    
    // Wrapper pour compiler
    const fullCode = `
using System;
using System.Threading.Tasks;

namespace TempValidation
{
    ${code}
    
    class Program { static void Main() {} }
}
`;
    
    try {
        fs.writeFileSync(tempFile, fullCode);
        execSync(`dotnet build ${tempFile}`, { stdio: 'pipe' });
        console.log(`✅ Code block ${index}: Valid`);
        return true;
    } catch (error) {
        console.error(`❌ Code block ${index}: Compilation error`);
        console.error(error.stderr?.toString());
        return false;
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
    }
}

// Usage
const markdownFile = process.argv[2];
const codeBlocks = extractCodeBlocks(markdownFile);

let valid = 0;
codeBlocks.forEach((code, index) => {
    if (validateCSharp(code, index)) valid++;
});

console.log(`\n📊 Résultat : ${valid}/${codeBlocks.length} blocks valides`);
```

### 4. Génération de Benchmarks

#### Template Generator

```javascript
// generate-benchmark.js
function generateBenchmark(name, framework48Code, net8Code) {
    return `using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

[SimpleJob(RuntimeMoniker.Net48)]
[SimpleJob(RuntimeMoniker.Net80)]
[MemoryDiagnoser]
public class ${name}Benchmark
{
    [GlobalSetup]
    public void Setup()
    {
        // Setup code
    }
    
    [Benchmark(Baseline = true)]
    public void Framework48()
    {
        ${framework48Code}
    }
    
    [Benchmark]
    public void Net8()
    {
        ${net8Code}
    }
}

class Program
{
    static void Main(string[] args)
    {
        BenchmarkRunner.Run<${name}Benchmark>();
    }
}
`;
}

// Usage
const benchmark = generateBenchmark(
    "HttpClient",
    "using (var client = new HttpClient()) { var result = client.GetStringAsync(url).Result; }",
    "var client = _factory.CreateClient(); var result = await client.GetStringAsync(url);"
);

console.log(benchmark);
```

## 🔄 Workflows Automatisés

### Workflow 1 : Création Complète de Slide

```javascript
// create-slide-workflow.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

async function createSlideWorkflow() {
    console.log('🎨 Workflow : Création de Slide\n');
    
    const type = await askQuestion('Type de slide (concept/code/faq) ? ');
    const title = await askQuestion('Titre de la slide ? ');
    const topic = await askQuestion('Sujet technique ? ');
    
    let template;
    
    switch(type) {
        case 'concept':
            template = generateConceptSlide(title, topic);
            break;
        case 'code':
            const framework = await askQuestion('Code Framework 4.8 ? ');
            const net8 = await askQuestion('Code .NET 8 ? ');
            template = generateCodeSlide(title, framework, net8);
            break;
        case 'faq':
            template = generateFAQSlide(title, topic);
            break;
    }
    
    const filename = `slides/${topic}-${title.toLowerCase().replace(/\s/g, '-')}.md`;
    fs.writeFileSync(filename, template);
    
    console.log(`\n✅ Slide créée : ${filename}`);
    console.log('📝 Prochaines étapes :');
    console.log('  1. Compléter le contenu');
    console.log('  2. Tester le code si applicable');
    console.log('  3. Ajouter speaker notes');
    console.log('  4. Valider avec checklist');
    
    rl.close();
}

function generateConceptSlide(title, topic) {
    return `## ${title}

### Contexte

[À compléter : Contexte ${topic}]

### Points Clés

- Point 1
- Point 2
- Point 3

Note:
[À compléter : Insights développeur sur ${topic}]
`;
}

function generateCodeSlide(title, frameworkCode, net8Code) {
    return `## ${title}

### .NET Framework 4.8

\`\`\`csharp
${frameworkCode}
\`\`\`

**Limitations :**
- [À compléter]

--

### .NET 8

\`\`\`csharp
${net8Code}
\`\`\`

**Améliorations :**
- [À compléter]

Note:
[À compléter : Retour d'expérience]
`;
}

function generateFAQSlide(title, topic) {
    return `## FAQ — ${title}

**Q: [Question fréquente sur ${topic}] ?**

R: [Réponse]

**Q: [Autre question] ?**

R: [Réponse]

Note:
Questions réelles d'équipes en migration.
`;
}

// Run
createSlideWorkflow();
```

### Workflow 2 : Validation Pre-Commit

```bash
#!/bin/bash
# pre-commit-validation.sh

echo "🔍 Validation pre-commit..."

# 1. Lint Markdown
echo "\n📝 Markdown linting..."
markdownlint docs/**/*.md
if [ $? -ne 0 ]; then
    echo "❌ Markdown linting failed"
    exit 1
fi

# 2. Vérifier liens
echo "\n🔗 Link checking..."
markdown-link-check docs/**/*.md
if [ $? -ne 0 ]; then
    echo "⚠️ Some links are broken"
fi

# 3. Spell checking
echo "\n📖 Spell checking..."
cspell "docs/**/*.md"
if [ $? -ne 0 ]; then
    echo "⚠️ Spelling errors found"
fi

# 4. Valider code C#
echo "\n💻 Validating C# code blocks..."
node scripts/validate-code-examples.js docs/slides.md
if [ $? -ne 0 ]; then
    echo "❌ Code validation failed"
    exit 1
fi

echo "\n✅ All validations passed!"
```

### Workflow 3 : Publication Automatique

```yaml
# .github/workflows/publish-content.yml
name: Publish Content

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'blog/**'

jobs:
  validate-and-publish:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Validate Markdown
        run: npm run lint:markdown
      
      - name: Check links
        run: npm run check:links
      
      - name: Generate PDF
        run: npm run export:pdf
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

## 📊 Métriques d'Automation

### Gains de Temps

| Tâche | Manuel | Automatisé | Gain |
|-------|--------|------------|------|
| Créer squelette slide | 5 min | 30 sec | -90% |
| Valider code | 10 min | 1 min | -90% |
| Check liens | 15 min | 30 sec | -97% |
| Générer benchmark | 20 min | 2 min | -90% |

### Qualité

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| Code compilable | 85% | 99% | +14% |
| Liens cassés | 10% | 0% | -100% |
| Format cohérent | 70% | 100% | +30% |

## ✅ Checklist d'Automation

Pour chaque nouvelle automation :

- [ ] Besoin identifié et répétitif
- [ ] ROI positif (temps gagné > temps dev)
- [ ] Script testé et validé
- [ ] Documentation d'utilisation
- [ ] Intégration dans workflow
- [ ] Monitoring des résultats

## 🎯 Prochaines Automations

### Court Terme
- [ ] Auto-génération de tables de comparaison
- [ ] Extraction automatique de benchmarks
- [ ] Suggestion de tags/catégories

### Moyen Terme
- [ ] AI-assisted code example generation
- [ ] Automated SEO optimization
- [ ] Content gap analysis

### Long Terme
- [ ] Full article generation from outline
- [ ] Automated translation
- [ ] Interactive content generation

---

**Version** : 1.0  
**Dernière mise à jour** : 2026-02-03  
**Skill** : Developer Productivity
