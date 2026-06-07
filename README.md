# claude-demo

A tiny artwork-search API used as the hands-on playground for the **Claude at
Cogapp** workshop. Plain Node + [Hono](https://hono.dev), with a dozen fake
artworks baked in as fixtures. No database, no secrets, no cloud.

If you're here for the workshop, go straight to **[EXERCISES.md](./EXERCISES.md)**.

## Run it

```sh
npm install
npm run dev      # API on http://localhost:3000
```

## Endpoints

| Method | Path            | Description                          |
| ------ | --------------- | ------------------------------------ |
| GET    | `/`             | API info                             |
| GET    | `/search?q=`    | Search artworks by title or artist   |
| GET    | `/artwork/:id`  | Fetch a single artwork by id         |

```sh
curl "localhost:3000/search?q=Monet"
curl localhost:3000/artwork/1
```

## The `artwork` CLI

A read-only CLI over the running API (the server must be up):

```sh
npm run artwork search Monet
npm run artwork show 1
```

## Scripts

```sh
npm run dev        # start the dev server (tsx watch)
npm start          # start the server (tsx)
npm test           # run the vitest suite
npm run typecheck  # tsc --noEmit
npm run check      # biome lint + format check
npm run format     # biome check --write
npm run artwork    # the artwork CLI (e.g. npm run artwork search Monet)
```

## Layout

```
src/
  app.ts            Hono app (routes wired here)
  server.ts         Node entrypoint
  search.ts         search + lookup logic over the fixtures
  data/artworks.ts  the fixtures (the whole "database")
  routes/           one file per endpoint group
bin/artwork.ts      the artwork CLI
tests/              vitest
```
