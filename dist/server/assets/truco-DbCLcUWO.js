const SCORE_BUTTONS = [1, 3, 6, 9, 12];
const TRUCO_META = {
  name: "Truco",
  description: "Jogo de cartas em equipes. Marque pontos e vença a rodada."
};
function createTrucoMatch(setup) {
  return {
    id: crypto.randomUUID(),
    gameType: "truco",
    teamA: { name: setup.teamAName || "Nós", members: setup.teamAMembers, score: 0 },
    teamB: { name: setup.teamBName || "Eles", members: setup.teamBMembers, score: 0 },
    maxScore: setup.maxScore,
    rounds: [],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function addScore(match, team, points) {
  const cap = (score) => Math.min(score + points, match.maxScore);
  const teamA = team === "A" ? { ...match.teamA, score: cap(match.teamA.score) } : match.teamA;
  const teamB = team === "B" ? { ...match.teamB, score: cap(match.teamB.score) } : match.teamB;
  const round = { teamAScore: teamA.score, teamBScore: teamB.score, undone: false };
  return { ...match, teamA, teamB, rounds: [...match.rounds, round] };
}
function undoLastRound(match) {
  if (match.rounds.length === 0) return match;
  const lastActiveIndex = [...match.rounds].reverse().findIndex((r) => !r.undone);
  if (lastActiveIndex === -1) return match;
  const realIndex = match.rounds.length - 1 - lastActiveIndex;
  const rounds = match.rounds.map((r, i) => i === realIndex ? { ...r, undone: true } : r);
  const activeRounds = rounds.filter((r) => !r.undone);
  const last = activeRounds[activeRounds.length - 1];
  const teamA = { ...match.teamA, score: last?.teamAScore ?? 0 };
  const teamB = { ...match.teamB, score: last?.teamBScore ?? 0 };
  return { ...match, teamA, teamB, rounds };
}
function checkWinner(match) {
  if (match.teamA.score >= match.maxScore) return "A";
  if (match.teamB.score >= match.maxScore) return "B";
  return null;
}
export {
  SCORE_BUTTONS as S,
  TRUCO_META as T,
  checkWinner as a,
  addScore as b,
  createTrucoMatch as c,
  undoLastRound as u
};
