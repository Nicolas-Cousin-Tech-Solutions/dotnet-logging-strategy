# Template : Comparaisons Techniques

## 🎯 Objectif

Créer des comparaisons techniques pragmatiques et factuelles entre .NET Framework 4.8 et .NET 8, adaptées à un public de développeurs intermédiaires.

## 📋 Structure de Comparaison

### Format Standard

```markdown
## [Concept/Feature comparé]

### .NET Framework 4.8 : État actuel

**Contexte :**
[Description de la situation avec Framework]

**Code typique :**
```csharp
[Exemple réaliste Framework]
```

**Caractéristiques :**
- Point 1
- Point 2
- Point 3

**Limitations/Contraintes :**
- Limitation 1 : [impact concret]
- Limitation 2 : [impact concret]

---

### .NET 8 : Évolution

**Nouveautés :**
[Ce qui change fondamentalement]

**Code équivalent :**
```csharp
[Même exemple en .NET 8]
```

**Améliorations :**
- Amélioration 1 : [mesure si possible]
- Amélioration 2 : [mesure si possible]

---

### Comparaison Directe

| Aspect | .NET Framework 4.8 | .NET 8 | Impact |
|--------|-------------------|--------|---------|
| [Critère 1] | [Valeur] | [Valeur] | [+/-/=] |
| [Critère 2] | [Valeur] | [Valeur] | [+/-/=] |

### Points d'attention pour migration

- ⚠️ Point 1
- ⚠️ Point 2

### Recommandation

[Conseil pragmatique basé sur le contexte]
```

## 🎯 Exemples de Comparaisons

### Exemple 1 : Performance HTTP Client

```markdown
## HTTP Client : Connection Pooling

### .NET Framework 4.8 : HttpClient Mal Compris

**Problème courant :**
HttpClient dispose après chaque requête

```csharp
// ❌ Anti-pattern fréquent (Framework 4.8)
public async Task<string> GetData(string url)
{
    using (var client = new HttpClient())
    {
        return await client.GetStringAsync(url);
    }
}
```

**Limitations :**
- Socket exhaustion possible
- Pas de réutilisation de connexions
- Performance dégradée sous charge
- TIME_WAIT sockets accumulation

**Mesure :**
- ~100 req/sec avant socket exhaustion
- Latence moyenne : 150ms

---

### .NET 8 : HttpClient avec IHttpClientFactory

**Solution native :**
IHttpClientFactory gère le lifecycle correctement

```csharp
// ✅ Pattern recommandé (.NET 8)
public class DataService
{
    private readonly IHttpClientFactory _clientFactory;
    
    public DataService(IHttpClientFactory clientFactory)
    {
        _clientFactory = clientFactory;
    }
    
    public async Task<string> GetData(string url)
    {
        var client = _clientFactory.CreateClient();
        return await client.GetStringAsync(url);
    }
}

// Startup.cs
services.AddHttpClient();
```

**Améliorations :**
- Connection pooling automatique
- Gestion DNS refresh
- Resilience policies (Polly integration)
- Pas de socket exhaustion

**Mesure :**
- ~2000 req/sec soutenus
- Latence moyenne : 45ms

---

### Comparaison Directe

| Aspect | Framework 4.8 (mauvais usage) | .NET 8 (IHttpClientFactory) | Gain |
|--------|-------------------------------|----------------------------|------|
| Requêtes/sec | ~100 | ~2000 | +1900% |
| Latence moyenne | 150ms | 45ms | -70% |
| Socket exhaustion | Fréquent | Jamais | ✅ |
| Code boilerplate | Dispose manuel | DI natif | ✅ |
| Resilience | Manuel | Polly intégré | ✅ |

### Points d'attention pour migration

- ⚠️ Vérifier tous les usages de HttpClient dans le code existant
- ⚠️ Migrer progressivement vers IHttpClientFactory
- ⚠️ Attention au singleton HttpClient (DNS stale)
- ⚠️ Configurer les timeouts appropriés

### Recommandation

**Migration recommandée** : OUI, impact direct sur scalabilité.

**Effort** : Faible (refactor simple)
**ROI** : Élevé (surtout si high traffic)
**Priorité** : Haute si APIs externes appelées fréquemment
```

### Exemple 2 : Configuration System

```markdown
## Configuration : Web.config vs appsettings.json

### .NET Framework 4.8 : Web.config XML

**Approche traditionnelle :**

```xml
<!-- Web.config -->
<configuration>
  <appSettings>
    <add key="ConnectionString" value="..." />
    <add key="ApiKey" value="..." />
    <add key="MaxRetries" value="3" />
  </appSettings>
</configuration>
```

```csharp
// Code Framework 4.8
var connectionString = ConfigurationManager.AppSettings["ConnectionString"];
var maxRetries = int.Parse(ConfigurationManager.AppSettings["MaxRetries"]);
```

**Limitations :**
- Configuration statique (redémarrage requis)
- Pas de typage fort
- Secrets en clair dans fichier
- Pas de validation au démarrage
- Parsing manuel requis

---

### .NET 8 : appsettings.json + Options Pattern

**Approche moderne :**

```json
// appsettings.json
{
  "ApiSettings": {
    "ConnectionString": "...",
    "ApiKey": "...",
    "MaxRetries": 3
  }
}
```

```csharp
// Configuration typée
public class ApiSettings
{
    public string ConnectionString { get; set; }
    public string ApiKey { get; set; }
    public int MaxRetries { get; set; }
}

// Startup
services.Configure<ApiSettings>(Configuration.GetSection("ApiSettings"));

// Usage avec DI
public class ApiService
{
    private readonly ApiSettings _settings;
    
    public ApiService(IOptions<ApiSettings> options)
    {
        _settings = options.Value;
    }
    
    public void DoWork()
    {
        // Typage fort, IntelliSense
        var retries = _settings.MaxRetries;
    }
}
```

**Améliorations :**
- Configuration typée (compile-time check)
- IntelliSense complet
- Validation au démarrage
- Secrets externalisés (User Secrets, Azure Key Vault)
- Hot reload possible (IOptionsSnapshot)

---

### Comparaison Directe

| Aspect | Framework 4.8 (Web.config) | .NET 8 (Options) | Impact |
|--------|---------------------------|-----------------|---------|
| Type safety | ❌ String only | ✅ Typage fort | Bugs évités |
| Validation | ⚠️ Runtime | ✅ Startup | Détection précoce |
| Secrets | ❌ Fichier | ✅ Externalisés | Sécurité |
| Hot reload | ❌ Redémarrage | ✅ Possible | DevX |
| IntelliSense | ❌ Non | ✅ Oui | Productivité |

### Points d'attention pour migration

- ⚠️ Migrer tous les appSettings vers Options Pattern
- ⚠️ Externaliser les secrets (User Secrets en dev, Key Vault en prod)
- ⚠️ Ajouter validation avec Data Annotations
- ⚠️ Tester le fallback si config manquante

### Recommandation

**Migration recommandée** : OUI, fondamental pour sécurité et maintenabilité.

**Effort** : Moyen (refactor + tests)
**ROI** : Élevé (sécurité + productivité)
**Priorité** : Haute (surtout pour secrets)
```

## ✅ Checklist de Qualité

Une bonne comparaison technique doit :

- [ ] Montrer du code réaliste des deux côtés
- [ ] Inclure des mesures ou faits vérifiables
- [ ] Expliquer le "pourquoi" de l'évolution
- [ ] Lister les limitations de chaque approche
- [ ] Donner une recommandation pragmatique
- [ ] Mentionner l'effort de migration
- [ ] Inclure des points d'attention concrets
- [ ] Éviter le marketing ("révolutionnaire", etc.)
- [ ] Sourcer les benchmarks si possible
- [ ] Rester applicable en production

## 🎨 Principes pour Comparaisons

### 1. Équité
- Montrer les deux approches honnêtement
- Pas de caricature de l'ancien
- Reconnaître quand Framework est suffisant

### 2. Mesurabilité
- Préférer les chiffres aux adjectifs
- Benchmarks reproductibles
- Impact mesurable (perf, lignes code, bugs)

### 3. Contexte
- Cas d'usage réel
- Problème concret résolu
- Migration path si pertinent

### 4. Pragmatisme
- ROI de la migration
- Effort vs bénéfice
- Quand NE PAS migrer

## 📊 Thèmes de Comparaison Prioritaires

Pour .NET Framework 4.8 → .NET 8 :

1. **Performance**
   - HTTP Client
   - Async/Await
   - Span<T> et Memory<T>
   - JSON serialization

2. **Developer Experience**
   - Configuration (Web.config vs Options)
   - Dependency Injection
   - Logging (log4net vs ILogger)
   - Tooling (MSBuild vs dotnet CLI)

3. **Architecture**
   - ASP.NET Web API vs ASP.NET Core
   - Global.asax vs Middleware
   - Deployment (IIS vs Kestrel)

4. **Langage C#**
   - Nullable reference types
   - Pattern matching
   - Records
   - Init-only properties

5. **Écosystème**
   - NuGet package management
   - Cross-platform capability
   - Container support
   - Release cadence (LTS)

---

**Template Version** : 1.0  
**Dernière mise à jour** : 2026-02-03  
**Skill** : Prompt Engineering
