import type { LivreMatch, LivreSetup, Round } from "~/types";
export { undoLastRound, checkWinner } from "~/lib/match";

export const LIVRE_META = {
  name: "Livre (ex: Canastra)",
  description: "Adicione manualmente o placar de seus jogos.",
} as const;

export function createLivreMatch(setup: LivreSetup): LivreMatch {
  return {
    id: crypto.randomUUID(),
    gameType: "livre",
    teamA: { name: setup.teamAName || "Nós", members: [], score: 0 },
    teamB: { name: setup.teamBName || "Eles", members: [], score: 0 },
    maxScore: setup.maxScore,
    rounds: [],
    createdAt: new Date().toISOString(),
  };
}

export function addLivreRound(
  match: LivreMatch,
  teamAPoints: number,
  teamBPoints: number,
): LivreMatch {
  const scoreA = Math.min(match.teamA.score + teamAPoints, match.maxScore);
  const scoreB = Math.min(match.teamB.score + teamBPoints, match.maxScore);
  const teamA = { ...match.teamA, score: scoreA };
  const teamB = { ...match.teamB, score: scoreB };
  const round: Round = { teamAScore: scoreA, teamBScore: scoreB, undone: false };
  return { ...match, teamA, teamB, rounds: [...match.rounds, round] };
}
