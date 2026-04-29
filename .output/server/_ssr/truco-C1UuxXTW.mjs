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
export {
  SCORE_BUTTONS as S,
  TRUCO_META as T,
  addScore as a,
  createTrucoMatch as c
};
