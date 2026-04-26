import { z } from "zod";
const RoundSchema = z.object({
  teamAScore: z.number(),
  teamBScore: z.number(),
  undone: z.boolean().default(false)
});
const TeamSchema = z.object({
  name: z.string(),
  members: z.array(z.string()),
  score: z.number().default(0)
});
const TrucoMatchSchema = z.object({
  id: z.string(),
  gameType: z.literal("truco"),
  teamA: TeamSchema,
  teamB: TeamSchema,
  maxScore: z.number(),
  rounds: z.array(RoundSchema),
  createdAt: z.string(),
  finishedAt: z.string().optional()
});
const GameStorageSchema = z.object({
  matches: z.array(TrucoMatchSchema)
});
const STORAGE_KEY = "bel-marcador";
const MAX_MATCHES = 30;
function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = GameStorageSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data.matches : [];
  } catch {
    return [];
  }
}
function writeStorage(matches) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ matches }));
}
function loadMatches() {
  return readStorage();
}
function getMatch(id) {
  return readStorage().find((m) => m.id === id);
}
function saveMatch(match) {
  const matches = readStorage();
  const pruned = matches.length >= MAX_MATCHES ? matches.slice(-29) : matches;
  writeStorage([...pruned, match]);
}
function updateMatch(updated) {
  const matches = readStorage().map((m) => m.id === updated.id ? updated : m);
  writeStorage(matches);
}
export {
  getMatch as g,
  loadMatches as l,
  saveMatch as s,
  updateMatch as u
};
