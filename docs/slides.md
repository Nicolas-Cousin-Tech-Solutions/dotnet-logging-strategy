# Stratégie de logs en C#/.NET
## Stop aux `Error` pour du fonctionnel

<small>Ressources & version officielle : [nicolas-cousin.com](https://nicolas-cousin.com/)</small>

Note:
- Contexte : trop de `Error` pour des cas métier → alerting inutilisable.
- Objectif : requalifier pour retrouver des alertes fiables.
- Sigle : .NET = runtime + bibliothèques Microsoft.
- Durée cible : 5–10 min, rester haut niveau, exemples courts.

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

```csharp
logger.LogWarning("Payment refused: insufficient funds. OrderId={OrderId} CustomerId={CustomerId}",
    orderId, customerId);

logger.LogInformation("Order already processed (idempotent). OrderId={OrderId}", orderId);
```

Note:
- Idempotence = répéter produit le même résultat, donc pas d’alerte.
- Message à passer : enrichir le log métier (OrderId/CustomerId) pour support.

--
### Exemples — Technique

```csharp
catch (SqlException ex)
{
    logger.LogError(ex, "Database failure while confirming order. OrderId={OrderId}", orderId);
    throw;
}
```

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

```csharp
// ❌ Mauvais : concaténation de strings
logger.LogWarning("Payment refused for order " + orderId + 
    " and customer " + customerId + " due to insufficient funds");

logger.LogError("Database connection failed while processing order " + 
    orderId + " at " + DateTime.Now);
```

Note:
- Tous les détails sont noyés dans le message.
- Impossible de filtrer par OrderId ou CustomerId facilement.
- Format peut varier selon les développeurs.
- Parsing complexe pour les outils de monitoring.
- Bonus anti-pattern : DateTime.Now au lieu de UtcNow (problèmes timezone).

--
### ✅ Exemple — Log structuré

```csharp
// ✅ Bon : propriétés structurées
logger.LogWarning("Payment refused: insufficient funds. OrderId={OrderId} CustomerId={CustomerId}",
    orderId, customerId);

logger.LogError(ex, "Database connection failed. OrderId={OrderId}",
    orderId);
```

Note:
- Propriétés typées et indexables.
- Filtrage facile : "tous les logs pour OrderId=12345".
- Dashboards précis : taux d'erreur par CustomerId.
- Format standardisé, lisible par humains ET machines.

--
### Vue dans un système de logs centralisé

**❌ Log non structuré (Datadog/Elasticsearch/Seq)**
```json
{
  "timestamp": "2026-02-04T10:15:23.456Z",
  "level": "Warning",
  "message": "Payment refused for order 12345 and customer C-789 due to insufficient funds"
}
```
**Problème** : Impossible de filtrer par `OrderId=12345` ou `CustomerId=C-789`

Note:
- Dans un système centralisé, le log non structuré arrive comme une simple chaîne.
- Pour filtrer par OrderId, il faut faire une recherche texte approximative.
- Pas de possibilité de créer des facettes ou des agrégations précises.

--
### Vue dans un système de logs centralisé

**✅ Log structuré (Datadog/Elasticsearch/Seq)**
```json
{
  "timestamp": "2026-02-04T10:15:23.456Z",
  "level": "Warning",
  "message": "Payment refused: insufficient funds",
  "OrderId": 12345,
  "CustomerId": "C-789"
}
```
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

--
### Exemple `EventId`

```csharp
private static readonly EventId PaymentRefused = new(12010, nameof(PaymentRefused));
private static readonly EventId DbFailure      = new(50010, nameof(DbFailure));

logger.LogWarning(PaymentRefused,
    "Payment refused. Reason={Reason} OrderId={OrderId}", reason, orderId);

logger.LogError(DbFailure, ex,
    "Database failure. OrderId={OrderId}", orderId);
```

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