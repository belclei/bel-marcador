import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getMatch, loadMatches, saveMatch, updateMatch } from "./storage";
import { createTrucoMatch } from "./truco";
import type { TrucoSetup } from "~/types";

class FakeLocalStorage {
  private store: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

const baseSetup: TrucoSetup = {
  teamAName: "Nós",
  teamAMembers: [],
  teamBName: "Eles",
  teamBMembers: [],
  maxScore: 12,
};

beforeEach(() => {
  vi.stubGlobal("localStorage", new FakeLocalStorage());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("loadMatches", () => {
  it("returns an empty array when storage is empty", () => {
    expect(loadMatches()).toEqual([]);
  });

  it("returns matches that were previously saved", () => {
    const match = createTrucoMatch(baseSetup);
    saveMatch(match);
    const loaded = loadMatches();
    expect(loaded).toHaveLength(1);
    expect(loaded[0]?.id).toBe(match.id);
  });

  it("returns an empty array when storage contains malformed JSON", () => {
    localStorage.setItem("bel-marcador", "not-valid-json{{");
    expect(loadMatches()).toEqual([]);
  });

  it("returns an empty array when stored data fails Zod schema validation", () => {
    localStorage.setItem("bel-marcador", JSON.stringify({ matches: [{ invalid: true }] }));
    expect(loadMatches()).toEqual([]);
  });
});

describe("getMatch", () => {
  it("returns the match for a known id", () => {
    const match = createTrucoMatch(baseSetup);
    saveMatch(match);
    expect(getMatch(match.id)?.id).toBe(match.id);
  });

  it("returns undefined for an unknown id", () => {
    expect(getMatch("does-not-exist")).toBeUndefined();
  });
});

describe("saveMatch", () => {
  it("persists a match retrievable by loadMatches", () => {
    const match = createTrucoMatch(baseSetup);
    saveMatch(match);
    expect(loadMatches()[0]?.id).toBe(match.id);
  });

  it("preserves all match fields after save and load", () => {
    const match = createTrucoMatch({ ...baseSetup, teamAName: "Alpha", maxScore: 24 });
    saveMatch(match);
    const loaded = loadMatches()[0];
    expect(loaded?.teamA.name).toBe("Alpha");
    expect(loaded?.maxScore).toBe(24);
  });

  it("prunes the oldest match when the 30-match limit is exceeded", () => {
    const first = createTrucoMatch(baseSetup);
    saveMatch(first);
    // fill remaining 29 slots
    for (let i = 0; i < 29; i++) saveMatch(createTrucoMatch(baseSetup));

    const extra = createTrucoMatch(baseSetup);
    saveMatch(extra);

    const stored = loadMatches();
    expect(stored).toHaveLength(30);
    expect(stored.find((m) => m.id === first.id)).toBeUndefined();
    expect(stored[29]?.id).toBe(extra.id);
  });

  it("keeps all matches when count is exactly at the 30-match limit", () => {
    const matches = Array.from({ length: 30 }, () => createTrucoMatch(baseSetup));
    for (const m of matches) saveMatch(m);
    expect(loadMatches()).toHaveLength(30);
  });
});

describe("updateMatch", () => {
  it("replaces the stored match with the updated version", () => {
    const match = createTrucoMatch(baseSetup);
    saveMatch(match);
    const updated = { ...match, teamA: { ...match.teamA, score: 6 } };
    updateMatch(updated);
    expect(getMatch(match.id)?.teamA.score).toBe(6);
  });

  it("does not affect other matches in storage", () => {
    const match1 = createTrucoMatch(baseSetup);
    const match2 = createTrucoMatch(baseSetup);
    saveMatch(match1);
    saveMatch(match2);
    updateMatch({ ...match1, teamA: { ...match1.teamA, score: 9 } });
    expect(getMatch(match2.id)?.teamA.score).toBe(0);
  });
});
