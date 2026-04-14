# Analyse API — État des lieux & Todo

## Bugs critiques

### `sites_controller.ts:10` — Recherche par mauvais champ
`Site.find(payload.domain)` recherche par clé primaire (id), pas par domaine. Les doublons ne sont jamais détectés.
```ts
// Remplacer par :
await Site.findBy('domain', payload.domain)
```

### `site.ts:28` — Mauvaise relation ORM
`@hasOne(() => User)` est incorrect. Un site *appartient à* un user.
```ts
// Remplacer par :
@belongsTo(() => User)
declare user: BelongsTo<typeof User>
```

### `pages_view.ts:34` — Mauvaise relation ORM
Même erreur : `@hasOne(() => Site)` → doit être `@belongsTo(() => Site)`.

---

## Ce qui manque par phase

### Phase 2 — Auth & Sites (incomplet)

| Manquant | Détail |
|---|---|
| `POST /login` | Pas d'endpoint d'authentification |
| `GET /me` | Pas de route pour le profil utilisateur |
| `GET /api/sites` | Lister les sites de l'utilisateur connecté |
| `DELETE /api/sites/:id` | Supprimer un site |
| Auth middleware sur les routes protégées | `/api/sites` est actuellement public |
| Champ `site_key` unique | Prévu en doc, absent du modèle et de la migration |
| Champ `name` pour Site | Idem |

### Phase 5 — Dashboard Stats (non démarré)

- `GET /stats/overview` — visiteurs, pages vues, trafic 7/30 jours
- `GET /stats/top-pages` — top des pages visitées
- `GET /stats/sources` — sources de trafic (referrer)

Ces endpoints nécessitent un `StatsController` avec des requêtes Lucid groupées (`groupBy`, `count`, filtrage par `site_id`).

---

## Problèmes de bonnes pratiques AdonisJS / TypeScript

### Nommage incohérent dans les modèles
`fullName` est en camelCase (correct pour Lucid) mais `user_id` et `site_id` sont en snake_case.
Lucid attend du camelCase. Si le nom de colonne DB diffère, utiliser le décorateur :
```ts
@column({ columnName: 'user_id' })
declare userId: string
```

### Types faibles dans `pages_view.ts`
`device: Object`, `os: Object`, `browser: Object` sont trop génériques. À typer correctement :
```ts
declare device: { type: string; vendor?: string; model?: string }
declare os: { name: string; version: string }
declare browser: { name: string; version: string }
```

### Validators à renforcer
- `validators/user.ts` : pas de `minLength` ni `maxLength` sur `password`
- `validators/site.ts` : `domain` devrait être validé comme URL/hostname, `user_id` comme UUID
```ts
user_id: vine.string().uuid(),
domain: vine.string().url()
```

### `users_controller.ts:8` — Debug à supprimer
```ts
console.log(request.response) // à retirer
```

### Routes non groupées ni protégées
Adonis recommande de grouper les routes avec préfixe et middleware :
```ts
router.group(() => {
  router.post('/sites', [SitesController, 'store'])
  router.get('/sites', [SitesController, 'index'])
  router.delete('/sites/:id', [SitesController, 'destroy'])
  router.get('/me', [UsersController, 'me'])
}).prefix('/api').use(middleware.auth())
```

### Pas de rate limiting sur `/collect`
L'endpoint est ouvert sans protection contre le spam/flood.
Adonis dispose du package `@adonisjs/limiter` pour ça :
```ts
router.post('/collect', [CollectsController, 'store'])
  .use(throttle.allowRequests(60).every('1 minute'))
```

---

## Priorités recommandées

| Priorité | Tâche |
|---|---|
| 1 | Corriger les 3 bugs critiques (find domaine, relations belongsTo) |
| 2 | Implémenter `POST /login` + auth middleware sur les routes protégées |
| 3 | Compléter les endpoints sites (`index`, `destroy`) |
| 4 | Supprimer le `console.log`, renforcer les validators |
| 5 | Implémenter les endpoints stats (Phase 5) |
| 6 | Ajouter le rate limiting sur `/collect` |
