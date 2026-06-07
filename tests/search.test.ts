import { describe, expect, it } from "vitest";
import { app } from "../src/app";

describe("GET /search", () => {
  it("returns all artworks for an empty query", async () => {
    const res = await app.request("/search");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.total).toBeGreaterThan(0);
    expect(body.results).toHaveLength(body.total);
  });

  it("matches on artist name", async () => {
    const res = await app.request("/search?q=Monet");
    const body = await res.json();
    expect(body.total).toBeGreaterThan(0);
    for (const art of body.results) {
      expect(`${art.title} ${art.artist}`).toContain("Monet");
    }
  });

  it("matches on title", async () => {
    const res = await app.request("/search?q=Sunflowers");
    const body = await res.json();
    expect(body.total).toBe(1);
    expect(body.results[0].artist).toBe("Vincent van Gogh");
  });

  // DEBUG EXERCISE: un-skip this test. It fails on the shipped code because
  // the search filter is case-sensitive, so a lowercase query like "monet"
  // matches nothing. Ask Claude to find and fix the bug, then watch this go
  // green. (Hint: the filter lives in src/search.ts.)
  it.skip("matches case-insensitively", async () => {
    const res = await app.request("/search?q=monet");
    const body = await res.json();
    expect(body.total).toBeGreaterThan(0);
  });
});

describe("GET /artwork/:id", () => {
  it("returns an artwork by id", async () => {
    const res = await app.request("/artwork/1");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.title).toBe("Water Lilies");
  });

  it("404s for an unknown id", async () => {
    const res = await app.request("/artwork/999");
    expect(res.status).toBe(404);
  });
});
