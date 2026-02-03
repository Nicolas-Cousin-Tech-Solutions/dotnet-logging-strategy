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