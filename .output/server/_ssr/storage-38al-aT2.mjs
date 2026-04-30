import { o as objectType, a as arrayType, d as discriminatedUnionType, s as stringType, n as numberType, l as literalType, b as booleanType } from "../_libs/zod.mjs";
const RoundSchema = objectType({
  teamAScore: numberType(),
  teamBScore: numberType(),
  undone: booleanType().default(false)
});
const TeamSchema = objectType({
  name: stringType(),
  members: arrayType(stringType()),
  score: numberType().default(0)
});
const TrucoMatchSchema = objectType({
  id: stringType(),
  gameType: literalType("truco"),
  teamA: TeamSchema,
  teamB: TeamSchema,
  maxScore: numberType(),
  rounds: arrayType(RoundSchema),
  createdAt: stringType(),
  finishedAt: stringType().optional()
});
const LivreMatchSchema = objectType({
  id: stringType(),
  gameType: literalType("livre"),
  teamA: TeamSchema,
  teamB: TeamSchema,
  maxScore: numberType(),
  rounds: arrayType(RoundSchema),
  createdAt: stringType(),
  finishedAt: stringType().optional()
});
const MatchSchema = discriminatedUnionType("gameType", [
  TrucoMatchSchema,
  LivreMatchSchema
]);
const GameStorageSchema = objectType({
  matches: arrayType(MatchSchema)
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
