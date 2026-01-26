# Stratégie de logs en C#/.NET  
## Stop aux `Error` pour du fonctionnel

Note:
- Contexte : beaucoup de logs en erreur sur des cas fonctionnels.
- Objectif : remettre les niveaux au bon endroit pour avoir des alertes fiables.
- Sigles :
  - .NET : plateforme de développement Microsoft (runtime + bibliothèques).

---

## Symptôme
- Des règles métier génèrent des `Error`
- Résultat :
  - Alerting pollué
  - Équipes “désensibilisées”
  - Investigation plus lente (faux positifs)

Note:
- “Si tout est en erreur, plus rien n’est une erreur.”
- Sigles :
  - Alerting : système de notifications/alertes (Teams, mail, pager, etc.).

---

## Règle d’or : niveau = action attendue
- `Information` : événement normal, attendu
- `Warning` : anomalie **attendue / récupérable**, action possible
- `Error` : échec **non récupérable** pour l’opération (ou SLO impact)
- `Critical` : incident majeur (indisponibilité / sécurité / corruption)

Note:
- Le niveau n’est pas “gravité métier”, c’est “impact opérationnel + besoin d’alerte”.
- Sigles :
  - SLO (Service Level Objective) : objectif chiffré de qualité de service (ex. 99,9% de succès, latence < 300 ms).
  - Impact SLO : l’événement augmente le risque de ne pas tenir l’objectif.

---

## Fonctionnel vs Technique
**Fonctionnel (souvent Warning/Info)**
- validation KO, règle métier non satisfaite
- idempotence / doublon / “déjà traité”

**Technique (souvent Error/Critical)**
- exception non gérée, DB down, timeout
- bug, contrat cassé, corruption

Note:
- Le fonctionnel ne doit pas déclencher une alerte infra par défaut.
- Sigles :
  - DB : base de données (Database).
  - Timeout : dépassement de délai d’attente (souvent réseau/IO).

--
### Exemples concrets — Fonctionnel ⇒ `Warning` / `Information`

```csharp
logger.LogWarning("Payment refused: insufficient funds. OrderId={OrderId} CustomerId={CustomerId}",
    orderId, customerId);
```

```csharp
logger.LogInformation("Order already processed (idempotent). OrderId={OrderId}", orderId);
```

Note:
- “Refus” ou “règle métier” ≠ incident technique.
- Sigles :
  - Idempotence : répéter la même requête produit le même résultat (ex. “déjà traité” = OK).
  - OrderId/CustomerId : identifiants métier utiles au diagnostic.

--

### Exemples concrets — Technique ⇒ `Error`

```csharp
catch (SqlException ex)
{
    logger.LogError(ex, "Database failure while confirming order. OrderId={OrderId}", orderId);
    throw;
}
```

Note:
- `Error` quand l’opération échoue pour une raison technique et nécessite investigation.
- Sigles :
  - SQL : langage et écosystème de bases de données relationnelles.
  - SqlException : exception .NET levée par le provider SQL (incident côté DB/connexion/requête).

---

## Indispensable : structuré + `EventId`
- Toujours des propriétés (OrderId, CustomerId, CorrelationId)
- `EventId` pour classer, filtrer, dashboarder
- Pas de concaténation de strings

Note:
- Stabiliser le “contrat” de log.
- Sigles :
  - EventId : identifiant numérique + nom, standard .NET pour catégoriser un événement de log.
  - CorrelationId / TraceId : identifiants de traçage pour relier plusieurs logs d’une même requête.

--
### Exemple — `EventId` + propriétés

```csharp
private static readonly EventId PaymentRefused = new(12010, nameof(PaymentRefused));
private static readonly EventId DbFailure      = new(50010, nameof(DbFailure));

logger.LogWarning(PaymentRefused,
    "Payment refused. Reason={Reason} OrderId={OrderId}", reason, orderId);

logger.LogError(DbFailure, ex,
    "Database failure. OrderId={OrderId}", orderId);
```

Note:
- `EventId` = pivot pour requêtes et tableaux de bord.
- Sigles :
  - Seq : outil de centralisation/recherche de logs (log server).
  - Kibana : interface de recherche/visualisation (souvent avec Elasticsearch).
  - App Insights (Application Insights) : observabilité Azure (traces, logs, métriques).

--
### Rappel : Exceptions
- Éviter `LogWarning(ex, ...)` pour exceptions techniques
- Pattern recommandé :
  - gérer les cas métier **sans** exception
  - réserver l’exception à l’imprévu/technique

Note:
- Les exceptions “métier” créent du bruit et coûtent cher (stacktrace, volumétrie, faux positifs).
- Sigles :
  - Stacktrace : pile d’appels capturée par l’exception (utile mais verbeuse).

---

## Mini-checklist d’équipe
1) Définir une table “niveau par scénario”
2) Ajouter `EventId` (catalogue)
3) Standardiser `CorrelationId` / `TraceId`
4) Alerter surtout sur `Error/Critical` (Warnings ciblés si besoin)
5) Revue “Top 20 logs `Error`” → downgrade si fonctionnel

Note:
- Action immédiate : extraire les `Error` les plus fréquents, requalifier.
- Sigles :
  - Top 20 : classement par fréquence (ou volume) pour maximiser le ROI rapidement.
  - ROI (Return on Investment) : gain attendu vs effort.

--
### Mapping rapide (annexe)
- `Information` : flux nominal + audit léger
- `Warning` : anomalie attendue, pas d’astreinte par défaut
- `Error` : échec technique, déclenche investigation
- `Critical` : urgence, indisponibilité, sécurité

Note:
- “Astreinte” : personne/équipe mobilisée en dehors des heures ouvrées (on-call).

---

## Message final
- `Warning` = incident **fonctionnel** maîtrisé / récupérable
- `Error` = incident **technique** ou échec non récupérable
- Moins de bruit → meilleures alertes → moins de temps perdu

Note:
- Objectif : retrouver de la confiance dans le monitoring.
- Sigles :
  - Monitoring : supervision (métriques, logs, alertes) pour détecter et diagnostiquer.