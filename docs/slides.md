# Stratégie de logs en C#/.NET
## Stop aux `Error` pour du fonctionnel

<small>Ressources & version officielle : [nicolas-cousin.com](https://nicolas-cousin.com/)</small>

Note:
- Contexte : trop de `Error` pour des cas métier → alerting inutilisable.
- Objectif : requalifier pour retrouver des alertes fiables.
- Sigle : .NET = runtime + bibliothèques Microsoft.
- Durée cible : 5–10 min, rester haut niveau, exemples courts.
- SLO = Service Level Objective (objectif de qualité de service mesurable).

---

## Symptôme
- Des règles métier génèrent des `Error`
- Conséquence : alertes polluées, équipes désensibilisées, enquêtes plus lentes

Note:
- “Si tout est en erreur, plus rien n’est une erreur.”
- Ancrer sur l’impact : perte de confiance, réveils inutiles, temps d’enquête.

---

## Règle d’or (niveau = action attendue)
- `Information` : événement normal
- `Warning` : anomalie attendue / récupérable
- `Error` : échec non récupérable ou impact SLO
- `Critical` : indisponibilité, sécurité, corruption

Note:
- Le niveau reflète l’impact opérationnel, pas la “gravité métier”.
- Relier à l’action attendue : qui doit réagir, en combien de temps.

---

## Fonctionnel vs Technique
**Fonctionnel → souvent `Warning`/`Information`**
- Règle métier non satisfaite, doublon, idempotence

**Technique → `Error`/`Critical`**
- Exception non gérée, DB down, timeout, corruption

Note:
- Par défaut, un échec métier ne déclenche pas d’astreinte infra.
- Demander aux équipes : “Qui est réveillé par ce log ?” pour choisir le niveau.

--
### Exemples — Fonctionnel

*-*
logger.LogWarning("Payment refused: insufficient funds. OrderId={OrderId} CustomerId={CustomerId}",
    orderId, customerId);

logger.LogInformation("Order already processed (idempotent). OrderId={OrderId}", orderId);
*-*

Note:
- Idempotence = répéter produit le même résultat, donc pas d’alerte.
- Message à passer : enrichir le log métier (OrderId/CustomerId) pour support.

--
### Exemples — Technique

*-*
catch (SqlException ex)
{
    logger.LogError(ex, "Database failure while confirming order. OrderId={OrderId}", orderId);
    throw;
}
*-*

Note:
- `Error` quand l’opération échoue pour cause technique et nécessite investigation.
- Soulever : garder l’exception pour conserver la stacktrace.

---

## Logs non structurés vs structurés
**Problème avec les logs non structurés**
- Concaténation de strings → difficile à parser/filtrer
- Impossible de requêter efficacement sur des valeurs spécifiques
- Perte de typage et de contexte

Note:
- Les logs non structurés = simple texte, difficile à exploiter par des outils.
- Exemple typique : tout est dans une seule chaîne de caractères.
- Conséquence : recherches approximatives, dashboards limités.

--
### ❌ Exemple — Log non structuré

*-*
// ❌ Mauvais : concaténation de strings
logger.LogWarning("Payment refused for order " + orderId + 
    " and customer " + customerId + " due to insufficient funds");

logger.LogError("Database connection failed while processing order " + 
    orderId + " at " + DateTime.Now);
*-*

Note:
- Tous les détails sont noyés dans le message.
- Impossible de filtrer par OrderId ou CustomerId facilement.
- Format peut varier selon les développeurs.
- Parsing complexe pour les outils de monitoring.
- Bonus anti-pattern : DateTime.Now au lieu de UtcNow (problèmes timezone).

--
### ✅ Exemple — Log structuré

*-*
// ✅ Bon : propriétés structurées
logger.LogWarning("Payment refused: insufficient funds. OrderId={OrderId} CustomerId={CustomerId}",
    orderId, customerId);

logger.LogError(ex, "Database connection failed. OrderId={OrderId}",
    orderId);
*-*

Note:
- Propriétés typées et indexables.
- Filtrage facile : "tous les logs pour OrderId=12345".
- Dashboards précis : taux d'erreur par CustomerId.
- Format standardisé, lisible par humains ET machines.

--
### Vue dans un système de logs centralisé

**❌ Log non structuré (Datadog/Elasticsearch/Seq)**
*-*
{
  "timestamp": "2026-02-04T10:15:23.456Z",
  "level": "Warning",
  "message": "Payment refused for order 12345 and customer C-789 due to insufficient funds"
}
*-*
**Problème** : Impossible de filtrer par `OrderId=12345` ou `CustomerId=C-789`

Note:
- Dans un système centralisé, le log non structuré arrive comme une simple chaîne.
- Pour filtrer par OrderId, il faut faire une recherche texte approximative.
- Pas de possibilité de créer des facettes ou des agrégations précises.

--
### Vue dans un système de logs centralisé

**✅ Log structuré (Datadog/Elasticsearch/Seq)**
*-*
{
  "timestamp": "2026-02-04T10:15:23.456Z",
  "level": "Warning",
  "message": "Payment refused: insufficient funds",
  "OrderId": 12345,
  "CustomerId": "C-789"
}
*-*
**Filtres possibles** : `OrderId:12345`, `CustomerId:"C-789"`, dashboards par client

Note:
- Chaque propriété devient un champ indexable et filtrable.
- Possibilité de créer des facettes, graphiques et alertes ciblées.
- Query: `level:Warning AND CustomerId:C-789` → tous les warnings de ce client.

---

## Logs structurés + `EventId`
- Propriétés obligatoires : OrderId, CustomerId, CorrelationId/TraceId
- `EventId` pour classer, filtrer, dashboarder
- Pas de concaténation de strings

Note:
- TraceId / CorrelationId = identifiants pour relier les logs d'une même requête.
- Permet de suivre une transaction de bout en bout dans les logs.

--
### Exemple `EventId`

*-*
private static readonly EventId PaymentRefused = new(12010, nameof(PaymentRefused));
private static readonly EventId DbFailure      = new(50010, nameof(DbFailure));

logger.LogWarning(PaymentRefused,
    "Payment refused. Reason={Reason} OrderId={OrderId}", reason, orderId);

logger.LogError(DbFailure, ex,
    "Database failure. OrderId={OrderId}", orderId);
*-*

Note:
- Convention EventId : 12xxx = business (Warning/Info), 50xxx = technique (Error).
- Permet des requêtes ciblées et des dashboards par type d'événement.

---

## Exceptions & niveaux de log

Exception ≠ toujours une "erreur"
- C'est un mécanisme technique de signalement
- Le niveau de log reflète l'impact et l'action attendue

Note:
- Une exception technique peut signaler un cas attendu (validation, règle métier).
- Le choix du niveau de log doit refléter l'impact opérationnel, pas le mot "exception".

--
### Niveaux de log : action attendue

**`Warning`** = situation métier à surveiller / analyser
- Règle métier non satisfaite, refus, validation
- Action : suivi, analyse, amélioration fonctionnelle

**`Error`** = incident technique / dysfonctionnement
- DB indisponible, bug, timeout non récupérable
- Action : investigation technique immédiate, escalade si nécessaire

Note:
- Warning : pilotage métier, amélioration continue, pas d'alerte technique systématique.
- Error : signal d'incident nécessitant intervention infra/dev pour restaurer le service.

--
### Pourquoi éviter Error pour le fonctionnel

**Trop d'Error = perte de confiance**
- Alertes noyées dans le bruit fonctionnel
- Équipes désensibilisées → réactions plus lentes
- Difficulté à distinguer vrais incidents des cas métier

**Conséquence opérationnelle**
- Les vraies pannes techniques passent inaperçues
- Temps de détection et de résolution allongé
- Impact sur SLO et disponibilité

Note:
- "Si tout est en erreur, plus rien n'est une erreur" : syndrome du loup.
- Objectif : garder Error comme signal fiable d'incident technique.
- SLO = Service Level Objective (objectif de qualité de service mesurable).

---

## Compromis MOA/MOE (gagnant-gagnant)

**Objectif MOA : visibilité + pilotage**
- Suivre les irritants fonctionnels (refus, rejets, validations)
- Piloter l'amélioration continue du métier

**Objectif MOE/OPS : signal fiable**
- Détecter rapidement les incidents techniques
- Minimiser les fausses alertes et le bruit

Note:
- MOA = Maîtrise d'Ouvrage (métier, product).
- MOE = Maîtrise d'Œuvre (dev, tech).
- OPS = Opérations (infra, run, astreinte).

--
### Proposition de compromis

**Fonctionnel attendu/récupérable**
- `Warning` ou `Information` + `EventId` + propriétés structurées
- Dashboards dédiés pour le suivi métier
- Alertes possibles sur Warning ciblés (volume, seuil, tendance)

**Technique/non récupérable**
- `Error` ou `Critical` + alerte immédiate
- Escalade automatique vers l'équipe technique

Note:
- La visibilité MOA passe aussi par : métriques (compteurs), taux de refus, tableaux de bord.
- Pas uniquement par Error : Warning bien exploité = meilleure visibilité sans pollution.

--
### Exemple concret

**Visibilité métier sans Error**
- Dashboard "Taux de refus de paiement" (Warning)
- Dashboard "Validations échouées par règle" (EventId)
- Alerte si taux > seuil pendant X minutes

**Alertes techniques fiables**
- Error = DB down, API timeout, bug → astreinte immédiate
- Pas de bruit fonctionnel → temps de réaction amélioré

Note:
- Exemple : Warning "Insufficient funds" agrégé par heure → dashboard MOA.
- Alerte si > 10% de refus → investigation métier (pas technique).
- Error "SqlException" → alerte immédiate équipe OPS.

---

## Best practices : exceptions & logging

**Éviter les exceptions pour le flux métier normal**
- Préférer validation explicite, pattern Result/Try
- Exception = cas exceptionnel, pas règle métier

Note:
- Les exceptions ont un coût (stacktrace, performance).
- Si c'est attendu (validation), ce n'est pas exceptionnel → pas d'exception.

--
### Best practices (suite)

**Catch ciblé**
- Attraper des exceptions spécifiques (`SqlException`, `HttpRequestException`)
- Éviter `catch(Exception)` hors "frontière" (middleware global)

**Logging unique**
- Éviter le double log (local + global)
- Décider où l'exception est loggée (une seule fois)

Note:
- Catch ciblé = on sait ce qu'on gère, on peut adapter la réponse.
- Double log = pollution, difficulté à corréler, incohérence possible.

--
### Best practices (suite)

**Rethrow correct**
- Utiliser `throw;` (pas `throw ex;`) pour garder la stacktrace

**Logs structurés**
- Toujours inclure les identifiants métier (OrderId, CustomerId)
- Inclure CorrelationId/TraceId pour traçabilité

**EventId standardisé**
- Permet le suivi (KPI, requêtes, dashboards)
- Convention : 12xxx = business, 50xxx = technique

Note:
- `throw ex;` réinitialise la stacktrace → perte d'information.
- TraceId / CorrelationId = identifiants pour relier les logs d'une même requête.

--
### Best practices (suite)

**Données sensibles**
- Éviter PII dans les logs
- Masquer ou anonymiser les données personnelles

Note:
- PII = Personally Identifiable Information (données personnelles identifiantes).
- Exemples PII : email, numéro de carte bancaire, adresse, numéro de sécu.
- Risque : conformité RGPD, sécurité, fuites de données.

---

## Exemples de code

Illustration du passage "MOA-intent" vers "Best practice"

--
### ❌ Avant : exception métier → Error

*-*
public async Task<OrderResult> ProcessOrder(int orderId)
{
    try
    {
        var order = await _orderRepository.GetById(orderId);
        if (order.Amount > customer.Balance)
        {
            throw new InsufficientFundsException("Customer has insufficient funds");
        }
        // ...
    }
    catch (InsufficientFundsException ex)
    {
        _logger.LogError(ex, "Order processing failed. OrderId={OrderId}", orderId);
        return OrderResult.Failed("Insufficient funds");
    }
}
*-*

Note:
- Problème : exception pour cas métier attendu (validation de solde).
- LogError pour un cas fonctionnel → pollution des alertes techniques.

--
### ✅ Après : validation explicite → Warning

*-*
public async Task<OrderResult> ProcessOrder(int orderId)
{
    var order = await _orderRepository.GetById(orderId);
    var customer = await _customerRepository.GetById(order.CustomerId);
    
    if (order.Amount > customer.Balance)
    {
        _logger.LogWarning(InsufficientFunds, 
            "Payment refused: insufficient funds. OrderId={OrderId} CustomerId={CustomerId} Amount={Amount} Balance={Balance}",
            orderId, customer.Id, order.Amount, customer.Balance);
        return OrderResult.Failed("Insufficient funds");
    }
    
    // Process order...
    return OrderResult.Success();
}

private static readonly EventId InsufficientFunds = new(12001, nameof(InsufficientFunds));
*-*

Note:
- Pas d'exception : validation explicite du cas métier.
- LogWarning + EventId : signal métier sans polluer Error.
- Propriétés structurées : filtrage facile, dashboards précis.

--
### Mapping simple : Business → Warning

*-*
// Cas métier attendus → Warning/Information
if (!IsValidInput(input))
{
    _logger.LogWarning(ValidationFailed,
        "Input validation failed. OrderId={OrderId} Reason={Reason}",
        orderId, validationResult.Reason);
    return Result.Invalid();
}

if (await _orderRepository.Exists(orderId))
{
    _logger.LogInformation(OrderAlreadyProcessed,
        "Order already processed (idempotent). OrderId={OrderId}",
        orderId);
    return Result.AlreadyProcessed();
}

private static readonly EventId ValidationFailed = new(12002, nameof(ValidationFailed));
private static readonly EventId OrderAlreadyProcessed = new(12003, nameof(OrderAlreadyProcessed));
*-*

Note:
- Validation échouée : Warning (à surveiller, à améliorer).
- Idempotence : Information (comportement normal, pas d'alerte).
- EventId 12xxx : convention business.

--
### Mapping simple : Technique → Error

*-*
// Cas technique/infrastructure → Error
catch (SqlException ex)
{
    _logger.LogError(DatabaseFailure, ex,
        "Database connection failed. OrderId={OrderId}",
        orderId);
    throw; // Rethrow pour préserver stacktrace
}

catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.RequestTimeout)
{
    _logger.LogError(ExternalApiTimeout, ex,
        "External API timeout. OrderId={OrderId} Endpoint={Endpoint}",
        orderId, apiEndpoint);
    throw;
}

private static readonly EventId DatabaseFailure = new(50001, nameof(DatabaseFailure));
private static readonly EventId ExternalApiTimeout = new(50002, nameof(ExternalApiTimeout));
*-*

Note:
- Exceptions techniques : Error (incident nécessitant investigation).
- Rethrow avec `throw;` : préserve la stacktrace complète.
- EventId 50xxx : convention technique.

--
### Middleware global : boundary ASP.NET Core

*-*
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(UnhandledException, ex,
                "Unhandled exception. Path={Path} Method={Method} TraceId={TraceId}",
                context.Request.Path, context.Request.Method, context.TraceIdentifier);
            
            context.Response.StatusCode = 500;
            await context.Response.WriteAsJsonAsync(new { error = "Internal server error" });
        }
    }

    private static readonly EventId UnhandledException = new(50000, nameof(UnhandledException));
}
*-*

Note:
- Middleware global : attrape uniquement les exceptions non gérées (techniques).
- Error justifié : exception inattendue = incident technique.
- TraceId : permet de corréler avec les autres logs de la requête.
- À enregistrer dans Startup : `app.UseMiddleware<GlobalExceptionMiddleware>();`.

---

## Exceptions : simple règle

- Cas métier gérés **sans** exception
- Exceptions réservées à l’imprévu technique

Note:
- Les exceptions métier génèrent du bruit (stacktrace) et coûtent cher.
- Question de triage : “est-ce attendu ?” → pas d’exception, donc pas d’alerting.

---

## Mini-checklist (actionnable en équipe)

1) Table “niveau par scénario” (fonctionnel vs technique)
2) Catalogue `EventId` + propriétés standardisées
3) Alerter surtout sur `Error/Critical` (Warnings ciblés au besoin)
4) Revue Top 20 `Error` → downgrade si fonctionnel

Note:
- Ciblé pour un run 1 sprint : on nettoie les 20 `Error` les plus fréquents.
- Proposer un owner par `EventId` et un seuil d’alerte par catégorie.

---

## Message final

- `Warning` = incident **fonctionnel** maîtrisé / récupérable
- `Error` = incident **technique** ou échec non récupérable
- Moins de bruit → meilleures alertes → moins de temps perdu

Note:
- Objectif : regagner la confiance dans le monitoring.
- Call to action : lancer l’audit Top 20 dès la fin de la session.