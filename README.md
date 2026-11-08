# portfolio_EM

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Qualité & CI/CD

| Commande               | Rôle                                   |
| ---------------------- | -------------------------------------- |
| `npm run lint`         | ESLint (Vue + JS)                      |
| `npm run format`       | Formate le code avec Prettier          |
| `npm run format:check` | Vérifie le formatage (utilisé en CI)   |
| `npm test`             | Vitest : test de build + test de rendu |

**Sur chaque pull request** (`.github/workflows/ci.yml`) :

1. Lint ESLint + vérification Prettier, tests Vitest, build Vite
2. Audit Lighthouse sur le build (`lighthouserc.json`) : échec si performance < 0.80 ou accessibilité < 0.90
3. `npm audit` des dépendances de production (échec à partir de `high`)
4. Déploiement de **preview** Vercel automatique (URL commentée sur la PR)

**Au merge sur `main`** : Vercel déploie automatiquement en **production**.

**Dépendances** : Dependabot ouvre chaque semaine des PR groupées (`.github/dependabot.yml`).

**Rollback en un clic** :

- Dashboard Vercel → _Deployments_ → déploiement précédent → **Instant Rollback**, ou
- GitHub → _Actions_ → **Rollback production** → _Run workflow_ (vide = version précédente,
  ou coller l'URL/ID d'un déploiement). Nécessite le secret `VERCEL_TOKEN`.
