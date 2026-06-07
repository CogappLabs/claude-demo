#!/usr/bin/env node
/**
 * `artwork` — a tiny read-only CLI over the running artwork API.
 *
 *   artwork search <query>   GET /search?q=<query>
 *   artwork show <id>        GET /artwork/<id>
 *
 * It talks to the dev server over HTTP, so the server must be running
 * (`npm run dev`). If it cannot reach the server it prints a clear,
 * actionable error rather than a stack trace.
 */

const PORT = process.env.PORT || "3000";
const BASE = `http://localhost:${PORT}`;

function usage(): never {
  console.error("usage: artwork search <query>");
  console.error("       artwork show <id>");
  process.exit(2);
}

async function call(path: string): Promise<unknown> {
  try {
    const res = await fetch(BASE + path);
    if (!res.ok && res.status !== 404) {
      console.error(`API returned ${res.status} for ${path}`);
      process.exit(1);
    }
    return await res.json();
  } catch {
    console.error(`Could not reach the artwork API on ${BASE}.`);
    console.error("Is the server running? Start it with: npm run dev");
    process.exit(1);
  }
}

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);

  if (command === "search") {
    const query = rest.join(" ");
    if (!query) usage();
    const data = await call(`/search?q=${encodeURIComponent(query)}`);
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (command === "show") {
    const id = rest[0];
    if (!id) usage();
    const data = await call(`/artwork/${encodeURIComponent(id)}`);
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  usage();
}

main();
