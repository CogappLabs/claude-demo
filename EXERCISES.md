# Workshop exercises — Claude at Cogapp

This repo is the shared playground for the hands-on workshop. It's a tiny
artwork-search API: a Hono server with a handful of fake artworks baked in as
fixtures. No database, no secrets, no cloud. `npm install && npm run dev` and
you have a running API.

Work in your **local clone**. Don't push to `main`. If you want to keep your
work, push to a branch named after yourself (e.g. `git push origin HEAD:lukew`).

> Notice there is **no `CLAUDE.md`** in this repo yet. That's deliberate —
> exercise 0 creates it.

---

## Setup (do this before the session)

```sh
git clone https://github.com/cogapplabs/claude-demo
cd claude-demo
npm install
npm run dev      # leave this running in one terminal; API on :3000
```

In a second terminal, check it's alive:

```sh
curl localhost:3000/search?q=Monet
```

You should see a couple of Monet paintings come back.

---

## 0. `/init` — let Claude learn the repo

Open Claude Code in this repo and run:

```
/init
```

Watch it read the codebase and write a starter `CLAUDE.md`. Skim what it
produced. This is generate-then-curate: the file is a starting point, not
gospel. Done.

## 1. Explore — map the code

Ask Claude:

> Map how a search request flows through this repo, from the route to the
> data. Give me a short diagram and file:line references.

You're learning to use Claude as a way *into* an unfamiliar codebase.

## 2. Debug — a search that returns nothing

Try this in your running API:

```sh
curl "localhost:3000/search?q=monet"     # lowercase — returns nothing
curl "localhost:3000/search?q=Monet"     # capitalised — works
```

There's a real bug here. Ask Claude:

> Searching for `monet` returns no results, but `Monet` works. Find the cause
> and fix it.

Then prove it's fixed. Un-skip the case-insensitivity test in
`tests/search.test.ts` (change `it.skip` to `it`) and run:

```sh
npm test
```

### Bonus bug (for fast finishers)

There's a second, subtler bug in `/artwork/:id`. The lookup matches the id
exactly, so anything slightly off 404s:

```sh
curl localhost:3000/artwork/1       # 200
curl "localhost:3000/artwork/1%20"  # 404 — trailing space
```

Ask Claude to make the lookup tolerant of surrounding whitespace, and add a
test. (This is a real class of bug: ids arriving from URLs, spreadsheets, or
copy-paste often carry stray whitespace.)

## 3. Write a skill — wrap the `artwork` CLI

This repo ships a small CLI (`bin/artwork.ts`, run via `npm run artwork`) that
talks to the running API:

```sh
npm run artwork search Monet
npm run artwork show 1
```

Ask Claude to wrap it in a skill so it triggers from plain English:

> Write a Claude Code skill that wraps the `artwork` CLI in this repo. It
> should trigger when I ask to search artworks. Put it in
> `~/.claude/skills/`.

Then test the trigger fires — in a fresh prompt, ask:

> search artworks for van gogh

Watch Claude reach for your new skill on its own.

## 4. Build from a ticket — add `/health`

There's a Linear ticket for this: **COG-128**. If you have the Linear MCP set
up, ask Claude:

> Read Linear ticket COG-128, plan the change with `/plan`, then implement it.

No Linear? The full ticket is reproduced below. Same exercise, read it from
here instead.

---

### COG-128 — Add a `/health` endpoint to the artwork API

**Goal.** The artwork API has no way to tell whether it is up. Add a
lightweight health-check endpoint so a load balancer or uptime monitor can
poll it.

**Acceptance criteria**

- `GET /health` returns `200` with JSON `{ "status": "ok" }`.
- The endpoint does no work beyond confirming the server is responding (no
  fixture loading, no search). It must stay fast and dependency-free.
- The response sets `Content-Type: application/json`.
- A vitest test covers the happy path (`200` + correct body).
- `npm run check` (biome) and `npm run typecheck` stay green.

**Out of scope.** Deep health checks, auth, rate limiting, metrics. Liveness
only.

**Hints.** Ask Claude where routes are registered first. Routes live in
`src/routes/`, wired up in `src/app.ts`. Verify with
`curl localhost:3000/health`, then run the tests.
