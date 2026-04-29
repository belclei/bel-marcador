const LIVRE_META = {
  name: "Livre (ex: Canastra)",
  description: "Adicione manualmente o placar de seus jogos."
};
function createLivreMatch(setup) {
  return {
    id: crypto.randomUUID(),
    gameType: "livre",
    teamA: { name: setup.teamAName || "Nós", members: [], score: 0 },
    teamB: { name: setup.teamBName || "Eles", members: [], score: 0 },
    maxScore: setup.maxScore,
    rounds: [],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function addLivreRound(match, teamAPoints, teamBPoints) {
  const scoreA = Math.min(match.teamA.score + teamAPoints, match.maxScore);
  const scoreB = Math.min(match.teamB.score + teamBPoints, match.maxScore);
  const teamA = { ...match.teamA, score: scoreA };
  const teamB = { ...match.teamB, score: scoreB };
  const round = { teamAScore: scoreA, teamBScore: scoreB, undone: false };
  return { ...match, teamA, teamB, rounds: [...match.rounds, round] };
}
export {
  LIVRE_META as L,
  addLivreRound as a,
  createLivreMatch as c
};
