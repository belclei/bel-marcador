import type { Round, Team } from "~/types";

type MatchWithRounds = {
  teamA: Team;
  teamB: Team;
  maxScore: number;
  rounds: Round[];
  finishedAt?: string;
};

export function undoLastRound<T extends MatchWithRounds>(match: T): T {
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

export function checkWinner<T extends MatchWithRounds>(match: T): "A" | "B" | null {
  if (match.teamA.score >= match.maxScore) return "A";
  if (match.teamB.score >= match.maxScore) return "B";
  return null;
}
