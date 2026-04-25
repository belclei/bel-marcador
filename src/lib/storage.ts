import { GameStorageSchema, type TrucoMatch } from "~/types";

const STORAGE_KEY = "bel-marcador";
const MAX_MATCHES = 30;

function readStorage(): TrucoMatch[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = GameStorageSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data.matches : [];
  } catch {
    return [];
  }
}

function writeStorage(matches: TrucoMatch[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ matches }));
}

export function loadMatches(): TrucoMatch[] {
  return readStorage();
}

export function getMatch(id: string): TrucoMatch | undefined {
  return readStorage().find((m) => m.id === id);
}

/** Insert a new match, pruning the oldest if over MAX_MATCHES. */
export function saveMatch(match: TrucoMatch): void {
  const matches = readStorage();
  const pruned = matches.length >= MAX_MATCHES ? matches.slice(-(MAX_MATCHES - 1)) : matches;
  writeStorage([...pruned, match]);
}

export function updateMatch(updated: TrucoMatch): void {
  const matches = readStorage().map((m) => (m.id === updated.id ? updated : m));
  writeStorage(matches);
}
