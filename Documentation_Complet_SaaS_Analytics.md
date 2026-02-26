# 📊 SaaS Analytics Simplifié -- Documentation Complète

------------------------------------------------------------------------

# 🎯 Vision Produit

Créer un outil d'analytics web **ultra simple** permettant de comprendre
les performances d'un site en **60 secondes**.

## Positionnement

-   Alternative simplifiée à Google Analytics
-   Pas de jargon complexe
-   Pas de fonctionnalités inutiles
-   Installation en 30 secondes

## Cible

-   Freelances
-   Startups early-stage
-   Créateurs de landing pages
-   Agences

------------------------------------------------------------------------

# 🏗 Architecture Globale

    [ Site Client ]
            ↓
    [ tracker.js ]
            ↓
    [ API AdonisJS ]
            ↓
    [ PostgreSQL ]
            ↓
    [ Dashboard Next.js ]

------------------------------------------------------------------------

# 🧩 Stack Technique

## Frontend

-   Next.js
-   React
-   TypeScript
-   TailwindCSS
-   Recharts

## Backend

-   AdonisJS
-   JWT Authentication
-   REST API

## Base de données

-   PostgreSQL

## Optionnel (Scalabilité)

-   Redis (Queue ingestion)
-   ClickHouse (gros volume analytics)

------------------------------------------------------------------------

# 🔵 PHASE 0 -- Cadrage Stratégique

1.  Définir la promesse produit claire.
2.  Identifier une cible précise.
3.  Définir le périmètre MVP.
4.  Définir les fonctionnalités exclues.
5.  Définir le modèle économique.

------------------------------------------------------------------------

# 🟢 PHASE 1 -- Setup Technique

1.  Créer deux repositories :
    -   analytics-frontend
    -   analytics-api
2.  Installer PostgreSQL.
3.  Créer la base `analytics_saas`.
4.  Configurer connexion DB dans Adonis.
5.  Mettre en place déploiement :
    -   Front : Vercel
    -   API : Railway / Fly.io
6.  Tester communication Front → API.

------------------------------------------------------------------------

# 🟡 PHASE 2 -- Auth & Gestion des Sites

## Tables

### users

-   id
-   email
-   password_hash
-   created_at

### sites

-   id
-   user_id
-   name
-   domain
-   site_key (unique)
-   created_at

## Endpoints

-   POST /register
-   POST /login
-   GET /me
-   POST /sites
-   GET /sites
-   DELETE /sites/:id

------------------------------------------------------------------------

# 🟠 PHASE 3 -- Système de Tracking

## Script d'intégration

``` html
<script async src="https://tonapp.com/tracker.js" data-site-id="SITE_ID"></script>
```

## Données envoyées

-   URL
-   Referrer
-   Screen size
-   Timestamp
-   User Agent

## Endpoint

POST /collect

## Bonnes pratiques

-   Script léger (\<2kb idéalement)
-   Asynchrone
-   Rate limiting
-   Vérification domaine
-   Gestion SPA (history.pushState)

------------------------------------------------------------------------

# 🔵 PHASE 4 -- Stockage & Structuration

## Table page_views

-   id
-   site_id
-   path
-   referrer
-   device
-   country (optionnel)
-   created_at

## Index

-   site_id
-   created_at

## Traitements

-   Détection device via user-agent
-   Détection source trafic via referrer
-   Isolation multi-tenant obligatoire

------------------------------------------------------------------------

# 🟣 PHASE 5 -- Dashboard Analytics

## Fonctionnalités MVP

-   Nombre de visiteurs
-   Nombre de pages vues
-   Trafic 7 / 30 jours
-   Sources trafic
-   Top pages
-   Répartition mobile / desktop

## Endpoints statistiques

-   GET /stats/overview
-   GET /stats/top-pages
-   GET /stats/sources

## UX

-   Interface minimaliste
-   Pas de jargon marketing
-   Lecture en 60 secondes

------------------------------------------------------------------------

# 🔴 PHASE 6 -- Sécurité & Robustesse

-   Vérification correspondance domaine/site_id
-   Rate limiting sur /collect
-   Isolation multi-tenant
-   Limitation quota mensuel
-   Protection endpoints admin

------------------------------------------------------------------------

# ⚫ PHASE 7 -- Monétisation

## Plans

  Plan       Limite
  ---------- -------------------
  Free       5 000 vues/mois
  Pro        100 000 vues/mois
  Business   1M vues/mois

## Stripe

-   Création produits
-   Webhooks
-   Gestion quotas
-   Page billing

------------------------------------------------------------------------

# 🟤 PHASE 8 -- Scalabilité

## Niveau 1 (MVP)

Tracker → API → PostgreSQL

## Niveau 2 (Croissance)

Tracker → API → Redis Queue → Worker → PostgreSQL

## Niveau 3 (Gros volume)

Migration vers ClickHouse

------------------------------------------------------------------------

# 📅 Roadmap 3 Mois

## Mois 1

-   MVP fonctionnel
-   Tracking opérationnel
-   Dashboard simple

## Mois 2

-   UI améliorée
-   Sécurité renforcée
-   Optimisation DB

## Mois 3

-   Paiement Stripe
-   Landing page marketing
-   Acquisition clients

------------------------------------------------------------------------

# 🚀 Résultat Final

Un SaaS Analytics :

-   Simple
-   Rapide à intégrer
-   Dashboard clair
-   Architecture scalable
-   Modèle économique rentable
