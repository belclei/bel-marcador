import type { Round, TrucoMatch, TrucoSetup } from "~/types";

export const SCORE_BUTTONS = [1, 3, 6, 9, 12] as const;

export const TRUCO_META = {
  name: "Truco",
  description: "Jogo de cartas em equipes. Marque pontos e vença a rodada.",
} as const;

export function createTrucoMatch(setup: TrucoSetup): TrucoMatch {
  return {
    id: crypto.randomUUID(),
    gameType: "truco",
    status: "in_progress",
    teamA: { name: setup.teamAName || "Nós", members: setup.teamAMembers, score: 0 },
    teamB: { name: setup.teamBName || "Eles", members: setup.teamBMembers, score: 0 },
    maxScore: setup.maxScore,
    rounds: [],
    createdAt: new Date().toISOString(),
  };
}

export function addScore(match: TrucoMatch, team: "A" | "B", points: number): TrucoMatch {
  const teamA = team === "A" ? { ...match.teamA, score: match.teamA.score + points } : match.teamA;
  const teamB = team === "B" ? { ...match.teamB, score: match.teamB.score + points } : match.teamB;
  const round: Round = { teamAScore: teamA.score, teamBScore: teamB.score, undone: false };
  return { ...match, teamA, teamB, rounds: [...match.rounds, round] };
}

export function undoLastRound(match: TrucoMatch): TrucoMatch {
  if (match.rounds.length === 0) return match;

  const lastActiveIndex = [...match.rounds].reverse().findIndex((r) => !r.undone);
  if (lastActiveIndex === -1) return match;

  const realIndex = match.rounds.length - 1 - lastActiveIndex;
  const rounds = match.rounds.map((r, i) => (i === realIndex ? { ...r, undone: true } : r));

  // Recompute scores from non-undone rounds
  const activeRounds = rounds.filter((r) => !r.undone);
  const last = activeRounds[activeRounds.length - 1];
  const teamA = { ...match.teamA, score: last?.teamAScore ?? 0 };
  const teamB = { ...match.teamB, score: last?.teamBScore ?? 0 };

  return { ...match, teamA, teamB, rounds };
}

export function resetMatch(match: TrucoMatch): TrucoMatch {
  return {
    ...match,
    status: "in_progress",
    teamA: { ...match.teamA, score: 0 },
    teamB: { ...match.teamB, score: 0 },
    rounds: [],
    finishedAt: undefined,
  };
}

export function checkWinner(match: TrucoMatch): "A" | "B" | null {
  if (match.teamA.score >= match.maxScore) return "A";
  if (match.teamB.score >= match.maxScore) return "B";
  return null;
}
