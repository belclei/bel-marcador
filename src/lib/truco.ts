import type { Round, TrucoMatch, TrucoSetup } from "~/types";
export { undoLastRound, checkWinner } from "~/lib/match";

export const SCORE_BUTTONS = [1, 3, 6, 9, 12] as const;

export const TRUCO_META = {
  name: "Truco",
  description: "Jogo de cartas em equipes. Marque pontos e vença a rodada.",
} as const;

export function createTrucoMatch(setup: TrucoSetup): TrucoMatch {
  return {
    id: crypto.randomUUID(),
    gameType: "truco",
    teamA: { name: setup.teamAName || "Nós", members: setup.teamAMembers, score: 0 },
    teamB: { name: setup.teamBName || "Eles", members: setup.teamBMembers, score: 0 },
    maxScore: setup.maxScore,
    rounds: [],
    createdAt: new Date().toISOString(),
  };
}

export function addScore(match: TrucoMatch, team: "A" | "B", points: number): TrucoMatch {
  const cap = (score: number) => Math.min(score + points, match.maxScore);
  const teamA = team === "A" ? { ...match.teamA, score: cap(match.teamA.score) } : match.teamA;
  const teamB = team === "B" ? { ...match.teamB, score: cap(match.teamB.score) } : match.teamB;
  const round: Round = { teamAScore: teamA.score, teamBScore: teamB.score, undone: false };
  return { ...match, teamA, teamB, rounds: [...match.rounds, round] };
}

export function resetMatch(match: TrucoMatch): TrucoMatch {
  return {
    ...match,
    teamA: { ...match.teamA, score: 0 },
    teamB: { ...match.teamB, score: 0 },
    rounds: [],
    finishedAt: undefined,
  };
}
